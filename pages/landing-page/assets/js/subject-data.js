const Subjects = [
  {
    name: "Điều Dưỡng",
    description: "Ngành Điều Dưỡng tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Được thực tập tại các bệnh viện lớn, cơ hội tiếp xúc trực tiếp với môi trường làm việc chuyên nghiệp.",
      "Sử dụng các mô hình và trang thiết bị hiện đại giúp tăng hiệu suất học tập của sinh viên.",
    ],
    url: "https://www.viendong.edu.vn/kydtm-cdvd/dieu-duong-vido",
    image: "./assets/images/subject/dieuduong.jpg",
  },
  {
    name: "Nhà Hàng - Khách Sạn",
    description: "Ngành Nhà Hàng Khách Sạn tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Các lớp học được trang bị đầy đủ các thiết bị cần thiết cho việc pha chế đồ uống...",
      "Có thể đảm nhận các công việc trong các bộ phận của một khách sạn – nhà hàng từ 3-5 sao.",
    ],
    url: "https://www.viendong.edu.vn/khoa-nha-hang-khach-san",
    image: "./assets/images/subject/nhahang.jpg",
  },
  {
    name: "Cơ Khí",
    description: "Ngành Cơ Khí tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Một trong những ngành học được ưa chuộng và có nhiều cơ hội việc làm hấp dẫn.",
      "Có tiềm năng phát triển ở các khu công nghiệp lớn trong và ngoài nước.",
    ],
    url: "https://www.viendong.edu.vn/khoa-co-khi",
    image: "./assets/images/subject/cokhi.jpg",
  },

  {
    name: "Kế Toán",
    description: "Ngành Kế Toán tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Gắn liền với hệ thống thực hành, giúp sinh viên áp dụng kiến thức vào thực tế.",
      "Sinh viên được tham gia kiến tập tại doanh nghiệp ở mỗi học kỳ.",
    ],
    url: "https://www.viendong.edu.vn/khoa-co-khi",
    image: "./assets/images/subject/ketoan.jpg",
  },
  {
    name: "Quản Trị Kinh Doanh",
    description: "Ngành Quản Trị Kinh Doanh tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Được học tập trong môi trường năng động, sáng tạo và hiện đại.",
      "Có cơ hội thực tập tại các doanh nghiệp lớn trong và ngoài nước.",
    ],
    url: "https://www.viendong.edu.vn/khoa-kinh-te",
    image: "./assets/images/subject/quantrikd.jpg",
  },
  {
    name: "Logistics",
    description: "Ngành Logistics tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Được học tập trong môi trường năng động, sáng tạo và hiện đại.",
      "Có cơ hội thực tập tại các doanh nghiệp lớn trong và ngoài nước.",
    ],
    url: "https://www.viendong.edu.vn/khoa-kinh-te",
    image: "./assets/images/subject/logistics.jpg",
  },
  {
    name: "Quản trị Marketing",
    description: "Ngành Quản trị Marketing tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Gắn liền với thực tiễn, giúp sinh viên áp dụng kiến thức vào công việc kinh doanh và quản lý, đặc biệt là khởi sự doanh nghiệp.",
      "Có cơ hội thực tập tại các doanh nghiệp lớn trong và ngoài nước.",
    ],
    url: "https://www.viendong.edu.vn/khoa-kinh-te",
    image: "./assets/images/subject/quantrimarketing.jpg",
  },
  { 
    name: "Quản trị văn phòng (Thư ký Y Khoa)",
    description: "Ngành Quản trị văn phòng (Thư ký Y Khoa) tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Chương trình học gắn liền thực tế với kỹ năng quản lý hồ sơ, sắp xếp lịch khám, giao tiếp y tế.",
      "Sinh viên được kiến tập, thực tập tại bệnh viện và phòng khám, tăng khả năng ứng dụng sau tốt nghiệp.",
    ],
    url: "https://www.viendong.edu.vn/khoa-kinh-te",
    image: "./assets/images/subject/quantrivanphong.jpg",
  },
  {
    name: "Quan hệ công chúng",
    description: "Ngành Quan hệ công chúng tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Cung cấp kiến thức vững vàng về truyền thông, xây dựng hình ảnh thương hiệu và quản lý quan hệ công chúng.",
      "Hợp tác với nhiều công ty, tổ chức trong ngành truyền thông và PR, tạo cơ hội việc làm cho sinh viên sau khi ra trường.",
    ],
    url: "https://www.viendong.edu.vn/khoa-kinh-te",
    image: "./assets/images/subject/quanhecongchung.jpg",
  },
  {
  name: "Tài chính - Ngân hàng",
    description: "Ngành Tài chính - Ngân hàng tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Chương trình học được thiết kế theo tiêu chuẩn quốc tế, giúp sinh viên nắm vững kiến thức chuyên môn.",
      "Có cơ hội thực tập tại các ngân hàng lớn và các tổ chức tài chính trong và ngoài nước.",
    ],
    url: "https://www.viendong.edu.vn/khoa-kinh-te",
    image: "./assets/images/subject/tai-chinh-ngan-hang.jpg",
  },
  {
    name: "Ô tô",
    description: "Ngành Ô tô tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Chương trình đào tạo được thiết kế gắn liền với thực tế công việc, giúp sinh viên nắm bắt được yêu cầu và xu hướng của ngành công nghiệp ô tô.",
      "Chú trọng vào việc phát triển kỹ năng thực hành, giúp sinh viên có khả năng áp dụng lý thuyết vào thực tế công việc.",
    ],
    url: "https://www.viendong.edu.vn/khoa-o-to",
    image: "./assets/images/subject/oto.jpg",
  },
  {
    name: "Xây dựng",
    description: "Ngành Xây dựng tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Chương trình học được thiết kế theo tiêu chuẩn quốc tế, giúp sinh viên nắm vững kiến thức chuyên môn.",
      "Có cơ hội thực tập tại các công ty xây dựng lớn và các tổ chức trong ngành xây dựng.",
    ],
    url: "https://www.viendong.edu.vn/khoa-xay-dung",
    image: "./assets/images/subject/xaydung.jpg",
  },
  {
    name: "Thiết kế đồ họa",
    description: "Ngành Thiết kế đồ họa tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Chương trình học được thiết kế gắn liền với thực tế công việc, giúp sinh viên nắm bắt được yêu cầu và xu hướng của ngành thiết kế đồ họa.",
      "Có cơ hội thực tập tại các công ty thiết kế lớn và các tổ chức trong ngành truyền thông.",
    ],
    url: "https://www.viendong.edu.vn/khoa-cong-nghe-thong-tin",
    image: "./assets/images/subject/thietkedohoa.jpg",
  },
  {
    name: "Lập trình ứng dụng",
    description: "Ngành Lập trình ứng dụng tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Chương trình học được thiết kế gắn liền với thực tế công việc, giúp sinh viên nắm bắt được yêu cầu và xu hướng của ngành lập trình ứng dụng.",
      "Có cơ hội thực tập tại các công ty công nghệ lớn và các tổ chức trong ngành công nghệ thông tin.",
    ],
    url: "https://www.viendong.edu.vn/khoa-cong-nghe-thong-tin",
    image: "./assets/images/subject/ltud.jpg",
  },
  {
    name: "Truyền thông đa phương tiện",
    description: "Ngành Truyền thông đa phương tiện tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Kết hợp kiến thức về báo chí, truyền thông, công nghệ thông tin và thiết kế đồ họa.",
      "Sinh viên được học về viết kịch bản, thiết kế đồ họa chỉnh sửa hình ảnh, sử dụng kỹ thuật 2D, 3D để tạo ra các sản phẩm truyền thông như banner, catalog, sách, truyện, video, website"
    ],
    url: "https://www.viendong.edu.vn/khoa-cong-nghe-thong-tin",
    image: "./assets/images/subject/truyenthongdpt.jpg",
  },
  {
    name: "Truyền thông và mạng máy tính",
    description: "Ngành Truyền thông và mạng máy tính tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Chương trình đào tạo chú trọng vào việc phát triển kỹ năng thực hành, giúp sinh viên có khả năng áp dụng lý thuyết vào thực tế công việc.",
      "Đào tạo về quản trị hệ thống mạng máy tính, giám sát và điều phối các hoạt động liên quan đến toàn bộ hệ thống mạng.",
    ],
    url: "https://www.viendong.edu.vn/khoa-cong-nghe-thong-tin", 
    image: "./assets/images/subject/truyenthongmangmaytinh.jpg",
  },
  {
    name: "Dược Sĩ",
    description: "Ngành Dược Sĩ tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Đào tạo về quy trình sản xuất, kiểm tra chất lượng thuốc, bảo quản và phân phối thuốc, cùng với việc cung cấp thông tin về thuốc cho người sử dụng.",
      "Có cơ hội giảng dạy tại các trường cao đẳng, nghiên cứu khoa học về thuốc và các sản phẩm y tế.​",
    ],
    url: "https://www.viendong.edu.vn/duoc",
    image: "./assets/images/subject/duoc.jpg",
  },
  {
    name: "Hộ sinh",
    description: "Ngành Hộ sinh tại CĐVĐ",
    highlights: [
      "Đào tạo về chăm sóc sức khỏe bà mẹ và trẻ em, bao gồm việc theo dõi thai kỳ, sinh nở và chăm sóc sau sinh.",
      "Có cơ hội làm việc tại các bệnh viện, phòng khám, trung tâm y tế và các tổ chức phi chính phủ liên quan đến sức khỏe bà mẹ và trẻ em.",
    ],
    target: "100 chỉ tiêu",
    url: "https://www.viendong.edu.vn/kydtm-cdvd/dieu-duong-vido",
    image: "./assets/images/subject/hosinh.jpg",
  },
  {
    name: "Y sĩ đa khoa",
    description: "Ngành Y sĩ đa khoa tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Đào tạo về chăm sóc sức khỏe, chẩn đoán và điều trị bệnh, cùng với việc cung cấp thông tin về thuốc và các sản phẩm y tế.",
      "Có cơ hội làm việc tại các bệnh viện, phòng khám, trung tâm y tế và các tổ chức phi chính phủ liên quan đến sức khỏe.",
    ],
    url: "https://www.viendong.edu.vn/y-si-da-khoa",
    image: "./assets/images/subject/ysidakhoa.jpg",
  },
  {
    name: "Xét nghiệm",
    description: "Ngành Xét nghiệm tại CĐVĐ",
    highlights: [
      "Sinh viên sẽ được học và thực hành về các kỹ thuật xét nghiệm hiện đại, bao gồm xét nghiệm huyết học, xét nghiệm vi sinh, sinh hóa, miễn dịch và các kỹ thuật sinh học phân tử.",
      "Có cơ hội tham gia vào các dự án nghiên cứu về xét nghiệm y học, giúp tăng cường kỹ năng và kinh nghiệm thực tế.",
    ],
    target: "100 chỉ tiêu",
    url: "https://www.viendong.edu.vn/kydtm-cdvd/xet-nghiem-vido",
    image: "./assets/images/subject/xetnghiem.jpg",
  },
  {
    name: "Chăm sóc sắc đẹp",
    description: "Ngành Chăm sóc sắc đẹp tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Đào tạo về các kỹ thuật chăm sóc sắc đẹp, bao gồm chăm sóc da, trang điểm, làm tóc và các dịch vụ thẩm mỹ khác.",
      "Có cơ hội thực tập tại các spa, thẩm mỹ viện và các trung tâm chăm sóc sắc đẹp lớn.",
    ],
    url: "https://www.viendong.edu.vn/kydtm-cdvd/khoa-cham-soc-sac-dep-vido",
    image: "./assets/images/subject/chamsocsacdep.jpg",
  },
  {
    name: "Biên phiên dịch",
    description: "Ngành Biên phiên dịch tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Sinh viên được thực hành dịch thuật các loại tài liệu, hợp đồng, văn bản, và tham gia vào các buổi hội thảo, tọa đàm song ngữ.",
      "Chú trọng vào việc rèn luyện kỹ năng viết, nói và giao tiếp trong môi trường đa văn hóa.",
    ],
    url: "https://www.viendong.edu.vn/khoa-ngoai-ngu",
    image: "./assets/images/subject/bienphiendich.jpg",
  },
  {
    name: "Tiếng anh thương mại",
    description: "Ngành Tiếng anh thương mại tại CĐVĐ",
    highlights: [
      "Sinh viên được rèn luyện thành thạo bốn kỹ năng nghe, nói, đọc, viết, nhấn mạnh kỹ năng giao tiếp trong các tình huống kinh doanh thực tế.",
      "Chương trình học còn trang bị các kỹ năng mềm như thuyết trình, làm việc nhóm, phân tích và giải quyết vấn đề, giúp sinh viên tự tin và hiệu quả trong công việc.",
    ],
    target: "100 chỉ tiêu",
    url: "https://www.viendong.edu.vn/khoa-ngoai-ngu",
    image: "./assets/images/subject/tienganhthuongmai.jpg",
  },
  {
    name: "Quản trị khách sạn",
    description: "Ngành Quản trị khách sạn tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Chương trình học được thiết kế gắn liền với thực tế công việc, giúp sinh viên nắm bắt được yêu cầu và xu hướng của ngành quản trị khách sạn.",
      "Có cơ hội thực tập tại các khách sạn lớn và các tổ chức trong ngành du lịch.",
    ],
    url: "https://www.viendong.edu.vn/khoa-nha-hang-khach-san",
    image: "./assets/images/subject/qtks.jpg",
  },
  {
    name: "Du lịch & Lữ hành",
    description: "Ngành Du lịch & Lữ hành tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Chương trình học kết hợp giữa lý thuyết và thực hành, giúp sinh viên nắm vững kiến thức và kỹ năng cần thiết cho nghề nghiệp.",
      "Sinh viên có cơ hội thực tập tại các công ty du lịch, khách sạn, khu nghỉ dưỡng, giúp rèn luyện kỹ năng thực tế và hiểu rõ hơn về ngành nghề.",
    ],
    url: "https://www.viendong.edu.vn/khoa-du-lich-lu-hanh",  
    image: "./assets/images/subject/dulich.jpg",
  },
  {
    name: "Kỹ thuật chế biến món ăn",
    description: "Ngành Kỹ thuật chế biến món ăn tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Chương trình học kết hợp giữa lý thuyết và thực hành, giúp sinh viên nắm vững kiến thức và kỹ năng cần thiết cho nghề nghiệp.",
      "Sinh viên được trang bị kiến thức về kỹ thuật chế biến món ăn, an toàn thực phẩm, quản lý bếp và kỹ năng giao tiếp trong môi trường nhà hàng – khách sạn.",
    ],
    url: "https://www.viendong.edu.vn/khoa-nha-hang-khach-san",
    image: "./assets/images/subject/kythuatchebienmonan.jpg",
  },
  {
    name: "Sư phạm mầm non",
    description: "Ngành Sư phạm mầm non tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Chương trình học chú trọng vào việc phát triển kỹ năng sư phạm, giúp sinh viên có khả năng giảng dạy và chăm sóc trẻ em.",
      "Có cơ hội thực tập tại các trường mầm non, giúp sinh viên rèn luyện kỹ năng thực tế và hiểu rõ hơn về ngành nghề.",
    ],
    url: "https://www.viendong.edu.vn/khoa-su-pham-mam-non",
    image: "./assets/images/subject/supham.jpg",
  },
  {
    name: "Giáo dục mầm non",
    description: "Ngành Giáo dục mầm non tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Sinh viên được trang bị kiến thức về tâm lý trẻ em, phương pháp giáo dục mầm non, kỹ năng tổ chức hoạt động học tập và vui chơi cho trẻ.",
      "Ngành giáo dục mầm non đang phát triển mạnh mẽ, tạo ra nhiều cơ hội việc làm cho sinh viên.",
    ],  
    url: "https://www.viendong.edu.vn/khoa-giao-duc-mam-non",
    image: "./assets/images/subject/giaoduc.jpg",
  },
  {
    name: "Tiếng anh sư phạm",
    description: "Ngành Tiếng anh sư phạm tại CĐVĐ",
    target: "100 chỉ tiêu",
    highlights: [
      "Chương trình học chú trọng vào việc phát triển kỹ năng ngôn ngữ, giúp sinh viên có khả năng giao tiếp và giảng dạy tiếng Anh hiệu quả.",
      "Có cơ hội thực tập tại các trường học, giúp sinh viên rèn luyện kỹ năng thực tế và hiểu rõ hơn về ngành nghề.",
    ],
    url: "https://www.viendong.edu.vn/khoa-ngoai-ngu",
    image: "./assets/images/subject/tienganhsupham.jpg",
  },
  {
    name: "Cơ sở vật chất",
    description: "Hệ thống cơ sở vật chất hiện đại tại CĐ Viễn Đông",
    target: "Không ngừng nâng cấp và mở rộng",
    highlights: [
      "Trang bị đầy đủ phòng học máy lạnh, thư viện điện tử và phòng thực hành chuyên ngành đạt chuẩn.",
      "Khuôn viên rộng rãi, khu thể thao đa năng, ký túc xá tiện nghi, tạo môi trường học tập và sinh hoạt lý tưởng cho sinh viên.",
      "Hệ thống sân bóng đá, bóng rổ, phòng gym hiện đại phục vụ nhu cầu rèn luyện thể chất cho sinh viên."
    ],
    url: "https://www.viendong.edu.vn/ho-tro-sinh-vien.html",
    image: "./assets/images/subject/csvc.jpg",
    flag: false
  },
  {
    name: "Sân bóng đá",
    description: "Sân bóng đá hiện đại phục vụ sinh viên tại CĐ Viễn Đông",
    target: "Sân chơi thể thao cho lứa trẻ",
    highlights: [
      "Sân bóng đá cỏ nhân tạo rộng rãi, đạt chuẩn, phục vụ nhu cầu luyện tập và thi đấu thể thao cho sinh viên.",
      "Thường xuyên tổ chức các giải đấu bóng đá nội bộ, tạo sân chơi bổ ích, rèn luyện sức khỏe và tinh thần đồng đội.",
      "Sân bóng được bảo trì thường xuyên, đảm bảo mặt sân luôn trong tình trạng tốt nhất cho việc thi đấu và tập luyện."
    ],
    url: "https://www.viendong.edu.vn/ho-tro-sinh-vien.html",
    image: "./assets/images/subject/sanbanh.jpg",
    flag: false
  }
];
