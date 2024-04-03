const { collection, getDocs } = require("firebase/firestore");
const { database } = require("../config/firebase");

const getCareers = async() => {
    try {
        const careerCol = collection(database, "users");
        const data = await getDocs(careerCol);
        const careers = data.docs.map(doc => doc.data());
        return careers;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { getCareers }; 