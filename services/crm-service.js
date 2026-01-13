const { default: axios } = require("axios");
const Participant = require("../models/participant");
const Device = require("../models/device");

// Cache trên server
let cachedToken = null;
let tokenExpiresAt = 0;

const getAccessToken = async () => {
    if (cachedToken && Date.now() < tokenExpiresAt) {
        return cachedToken; // ✅ chỉ trả token
    }

    const response = await axios.get(
        "https://crm.viendong.edu.vn/api/OpenAPI/auth",
        {
            params: {
                username: "admin",
                access_key_md5: "37488f318b75565be18d3b5accb8d439"
            }
        }
    );

    cachedToken = response.data.access_token;
    tokenExpiresAt = Number(response.data.expire_time) * 1000;

    return cachedToken; // ✅
};

const postParticipant = async (data) => {
    const accessToken = await getAccessToken();

    if (!accessToken) {
        console.log("🚨 Lỗi: Không thể lấy Access Token");
        return null;
    }

    const headers = {
        "Access-Token": accessToken
    };

    try {
        const response = await axios.post(
            "https://crm.viendong.edu.vn/api/OpenAPI/create?module=CPTarget",
            { data },
            {
                headers,
                timeout: 100000
            }
        );

        return response.data;
    } catch (error) {
        console.log(error.response?.data || error.message);
    }
};


const putParticipant = async (data, record_id) => {
    // Hàm đệ quy để lấy access token
    const response = await getAccessToken();

    if (!response || !response.access_token) {
        console.log("🚨 Lỗi: Không thể lấy Access Token");
        return null;
    }

    const header = {
        "Access-Token": response.access_token
    };
    try {
        const response = await axios.post(`https://crm.viendong.edu.vn/api/OpenAPI/update?module=CPTarget&record=${record_id}`, {
            data: {
                winning_code: data.winning_code
            }
        }, {
            headers: header,
            timeout: 100000
        });

        // await Device.findOneAndUpdate({ deviceId: data.deviceId }, { isCompleted: true }, { new: true });

        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

const getLatestNames = async () => {
  const token = await getAccessToken();

  const listRes = await axios.get(
    "https://crm.viendong.edu.vn/api/OpenAPI/list",
    {
      headers: { "Access-Token": token },
      params: {
        module: "CPTarget",
        sort_column: "createdtime",
        sort_order: "DESC",
        max_rows: 100 // lấy dư để lọc
      }
    }
  );

  const entryList = listRes.data?.entry_list || [];
  if (!entryList.length) return [];

  const ids = entryList.map(i => i.id);

  const detailResults = await Promise.allSettled(
    ids.map(id =>
      axios.get(
        "https://crm.viendong.edu.vn/api/OpenAPI/retrieve",
        {
          headers: { "Access-Token": token },
          params: {
            module: "CPTarget",
            record: id
          }
        }
      )
    )
  );

  const names = detailResults
    .map(r => {
      const d = r.value?.data?.data;
      if (!d) return null;

      // 🔥 LỌC online_admission
      if (d.cptarget_source !== "online_admission") return null;

      // ghép firstname + lastname, trống thì kệ
      return `${d.lastname || ""} ${d.firstname || ""}`.trim() || null;
    })
    .filter(Boolean)
    .slice(0, 10); // chỉ lấy 10 cái cuối cùng

  return names;
};



module.exports = { getAccessToken, postParticipant, putParticipant, getLatestNames };