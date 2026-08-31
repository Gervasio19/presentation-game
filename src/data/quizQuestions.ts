// ============================================================
// LAPSE — Presentation Quiz Database (Topic 2)
// Sourced directly from Monetary & Financial Theory Presentation
// Used for unlocking free items in the in-game Shop
// ============================================================

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ── Phần 1: Khái niệm & Nguồn gốc khủng hoảng ───────────────
  {
    id: "q1",
    question: "Ngân hàng đầu tư Lehman Brothers chính thức tuyên bố phá sản vào ngày tháng năm nào?",
    options: [
      "15/09/2008",
      "16/03/2007",
      "24/10/2009",
      "02/07/1997",
    ],
    correctIndex: 0,
    explanation: "Lehman Brothers nộp đơn xin phá sản vào ngày 15/09/2008 với hơn $600 tỷ tài sản, đánh dấu vụ phá sản lớn nhất lịch sử nước Mỹ và đỉnh điểm khủng hoảng.",
  },
  {
    id: "q2",
    question: "MBS trong kỹ thuật chứng khoán hóa (Securitization) là viết tắt của thuật ngữ nào?",
    options: [
      "Mortgage-Backed Securities",
      "Market Banking System",
      "Monetary Bond Scheme",
      "Macro Balance Sheet",
    ],
    correctIndex: 0,
    explanation: "MBS (Mortgage-Backed Securities) là chứng khoán được đảm bảo bằng tập hợp hàng nghìn khoản nợ vay thế chấp bất động sản.",
  },
  {
    id: "q3",
    question: "CDO trong cơ chế lan truyền rủi ro của cuộc khủng hoảng 2008 là viết tắt của thuật ngữ nào?",
    options: [
      "Collateralized Debt Obligations",
      "Credit Default Options",
      "Centralized Deposit Orders",
      "Commercial Derivative Origin",
    ],
    correctIndex: 0,
    explanation: "CDO (Collateralized Debt Obligations) là nghĩa vụ nợ có thế chấp, đóng gói nhiều tầng rủi ro MBS khác nhau để bán ra toàn cầu.",
  },
  {
    id: "q4",
    question: "Thuật ngữ 'NINJA Loan' trong cuộc khủng hoảng vay thế chấp dưới chuẩn chỉ loại đối tượng vay nào?",
    options: [
      "Người không có thu nhập, không có việc làm, không có tài sản (No Income, No Job, no Assets)",
      "Những nhà đầu tư bất động sản đến từ Nhật Bản",
      "Các quỹ phòng hộ rủi ro hoạt động bí mật trong bóng tối",
      "Người vay có bảo lãnh từ chính phủ liên bang",
    ],
    correctIndex: 0,
    explanation: "NINJA là từ châm biếm chỉ các khoản vay dễ dãi cho người 'No Income, No Job, no Assets' mà không hề thẩm định khả năng trả nợ.",
  },
  {
    id: "q5",
    question: "Trong mô hình 'Originate-to-Distribute', vì sao các ngân hàng cho vay lại nảy sinh rủi ro đạo đức (Moral Hazard)?",
    options: [
      "Vì họ bán đứt khoản nợ cho nhà đầu tư khác nên không còn chịu rủi ro vỡ nợ",
      "Vì người vay có điểm tín dụng quá hoàn hảo",
      "Vì lãi suất ngân hàng trung ương được neo ở mức quá cao",
      "Vì nhà nước đứng ra cam kết trả nợ thay 100%",
    ],
    correctIndex: 0,
    explanation: "Ngân hàng bán ngay khoản thế chấp đóng gói vào MBS cho nhà đầu tư toàn cầu, chỉ ăn phí hoa hồng ban đầu mà không quan tâm người vay có vỡ nợ hay không.",
  },
  {
    id: "q6",
    question: "Theo giáo trình của Mishkin, 4 thành phần cấu thành nên Hệ thống Tài chính bao gồm những gì?",
    options: [
      "Thị trường tài chính, Công cụ tài chính, Định chế trung gian, Cơ quan quản lý",
      "Ngân hàng thương mại, Ngân hàng trung ương, Bộ tài chính, Sàn chứng khoán",
      "Tiền gửi tiết kiệm, Trái phiếu, Cổ phiếu, Bất động sản",
      "Người tiết kiệm, Người đi vay, Nhà đầu tư, Người nộp thuế",
    ],
    correctIndex: 0,
    explanation: "Hệ thống tài chính bao gồm: Financial Markets (thị trường), Financial Instruments (công cụ), Financial Intermediaries (trung gian), và Regulatory Bodies (cơ quan quản lý).",
  },
  {
    id: "q7",
    question: "Sự kiện bong bóng đầu cơ sớm nhất trong lịch sử tài chính thế giới được nhóm nhắc đến trong bài là gì?",
    options: [
      "Hội chứng cuồng hoa Tulip Hà Lan (Tulip Mania, 1630s)",
      "Bong bóng công nghệ Dot-com (2000)",
      "Đại suy thoái kinh tế Mỹ (1929)",
      "Bong bóng Công ty Biển Nam (South Sea Bubble, 1720)",
    ],
    correctIndex: 0,
    explanation: "Tulip Mania tại Hà Lan (những năm 1630s) là ví dụ bong bóng đầu cơ kinh điển đầu tiên, khi một củ hoa tulip có giá tương đương một ngôi nhà tại Amsterdam trước khi sụp đổ.",
  },
  {
    id: "q8",
    question: "Cuộc khủng hoảng tài chính châu Á năm 1997 khởi phát từ sự kiện nào?",
    options: [
      "Thái Lan tuyên bố thả nổi đồng Baht vào tháng 7/1997",
      "Hàn Quốc đệ đơn xin phá sản quốc gia",
      "Thị trường chứng khoán Tokyo sụp đổ",
      "Vỡ nợ thị trường bất động sản Hồng Kông",
    ],
    correctIndex: 0,
    explanation: "Khủng hoảng 1997 khởi phát từ việc Thái Lan thả nổi đồng Baht (07/1997), tạo hiệu ứng domino phá giá tiền tệ và rút vốn ồ ạt khắp Đông Nam Á.",
  },

  // ── Phần 2: Sự sụp đổ của các định chế & Thị trường ─────────
  {
    id: "q9",
    question: "Ngân hàng đầu tư lâu đời nào đã phải bán mình khẩn cấp cho JPMorgan Chase vào tháng 3/2008 với sự hỗ trợ 30 tỷ USD từ Fed?",
    options: [
      "Bear Stearns",
      "Merrill Lynch",
      "Goldman Sachs",
      "Morgan Stanley",
    ],
    correctIndex: 0,
    explanation: "Bear Stearns sụp đổ vì hai quỹ đầu cơ CDO phá sản và phải bán mình cho JPMorgan với giá bèo bọt kèm khoản bảo lãnh $30B từ Fed.",
  },
  {
    id: "q10",
    question: "Hai tập đoàn bảo lãnh thế chấp khổng lồ ($5.000 tỷ) được chính phủ Mỹ tiếp quản khẩn cấp vào tháng 9/2008 là ai?",
    options: [
      "Fannie Mae và Freddie Mac",
      "Moody's và Standard & Poor's",
      "Citigroup và Bank of America",
      "BlackRock và Vanguard",
    ],
    correctIndex: 0,
    explanation: "Fannie Mae và Freddie Mac nắm giữ/bảo lãnh tới một nửa dư nợ thế chấp nhà ở toàn nước Mỹ ($5.000 tỷ) và phải được đặt dưới quyền kiểm soát của chính phủ.",
  },
  {
    id: "q11",
    question: "Tập đoàn bảo hiểm lớn nhất thế giới nào đã được chính phủ Mỹ giải cứu khẩn cấp $85 tỷ vì bán bảo hiểm phá sản (CDS)?",
    options: [
      "AIG (American International Group)",
      "Berkshire Hathaway",
      "Prudential Financial",
      "MetLife",
    ],
    correctIndex: 0,
    explanation: "AIG bán hàng trăm tỷ USD hợp đồng hoán đổi rủi ro tín dụng (Credit Default Swaps - CDS) bảo hiểm cho các CDO độc hại mà không có đủ vốn dự phòng khi vỡ nợ hàng loạt.",
  },
  {
    id: "q12",
    question: "Tỷ lệ đòn bẩy tài chính (Debt-to-Equity / Leverage Ratio) của nhiều ngân hàng đầu tư phố Wall trước năm 2008 lên tới mức nào?",
    options: [
      "Khoảng 30:1 đến 33:1",
      "Chỉ khoảng 5:1",
      "Khoảng 2:1",
      "100:1",
    ],
    correctIndex: 0,
    explanation: "Với đòn bẩy tới 30:1 hoặc hơn, chỉ cần giá trị tài sản nắm giữ sụt giảm hơn 3%, toàn bộ vốn chủ sở hữu của ngân hàng đầu tư sẽ bốc hơi hoàn toàn.",
  },
  {
    id: "q13",
    question: "Hiện tượng các ngân hàng hoảng loạn không dám cho nhau vay mượn vốn ngắn hạn trên thị trường liên ngân hàng được gọi là gì?",
    options: [
      "Credit Crunch (Khủng hoảng đóng băng tín dụng)",
      "Bank Run (Rút tiền ồ ạt)",
      "Quantitative Easing (Nới lỏng tiền tệ)",
      "Fiscal Cliff (Vực đá tài khóa)",
    ],
    correctIndex: 0,
    explanation: "Credit Crunch xảy ra khi lãi suất liên ngân hàng (LIBOR) tăng vọt, các ngân hàng ghìm giữ tiền mặt và từ chối cấp tín dụng cho nhau vì sợ đối tác ôm tài sản độc hại.",
  },

  // ── Phần 3: Tác động đến đời sống & Kinh tế toàn cầu ──────────
  {
    id: "q14",
    question: "Tỷ lệ thất nghiệp tại Mỹ đã tăng vọt lên mức đỉnh điểm bao nhiêu % vào tháng 10/2009?",
    options: [
      "10.0% (khoảng 8.7 triệu người mất việc)",
      "5.0%",
      "15.5%",
      "7.2%",
    ],
    correctIndex: 0,
    explanation: "Tỷ lệ thất nghiệp của Mỹ tăng gấp đôi từ 5.0% (cuối 2007) lên đỉnh 10.0% vào tháng 10/2009, khiến gần 8.7 triệu việc làm bị xóa sổ.",
  },
  {
    id: "q15",
    question: "Theo nghiên cứu được trích dẫn trong bài thuyết trình, có khoảng bao nhiêu hộ gia đình Mỹ phải đối mặt với lệnh siết nợ (Foreclosure)?",
    options: [
      "Hơn 14 triệu hộ gia đình",
      "Khoảng 500 nghìn hộ gia đình",
      "Khoảng 2 triệu hộ gia đình",
      "Hơn 50 triệu hộ gia đình",
    ],
    correctIndex: 0,
    explanation: "Hơn 14 triệu hộ gia đình Mỹ đã nhận thông báo siết nợ nhà cửa, gây ra cuộc khủng hoảng nhà ở và làn sóng mất nhà ở tồi tệ nhất thời hậu chiến.",
  },
  {
    id: "q16",
    question: "Khái niệm 'Negative Equity' (Nhà âm vốn) đối với người vay mua nhà nghĩa là gì?",
    options: [
      "Giá trị căn nhà trên thị trường sụt giảm xuống thấp hơn số tiền nợ ngân hàng còn lại",
      "Chủ nhà phải nộp thêm thuế thu nhập cá nhân",
      "Ngân hàng miễn giảm toàn bộ tiền lãi cho chủ nhà",
      "Chủ nhà cho thuê nhà với giá rẻ hơn thị trường",
    ],
    correctIndex: 0,
    explanation: "Negative Equity xảy ra khi giá nhà giảm sâu, ví dụ căn nhà còn giá 200k USD nhưng món nợ thế chấp còn tới 300k USD, khiến người vay thà bỏ nhà vỡ nợ còn hơn trả tiếp.",
  },
  {
    id: "q17",
    question: "Thế hệ sinh viên tốt nghiệp đại học trong giai đoạn 2008–2010 chịu ảnh hưởng nặng nề về cơ hội việc làm và thu nhập trọn đời thường được gọi là gì?",
    options: [
      "The Lost Generation (Thế hệ mất mát)",
      "Generation Alpha",
      "Baby Boomers",
      "The Golden Generation",
    ],
    correctIndex: 0,
    explanation: "Các nhà nghiên cứu kinh tế gọi lứa sinh viên ra trường đúng lúc khủng hoảng 2008 là 'The Lost Generation' vì mức lương khởi điểm thấp kéo theo thu nhập cả đời bị giảm sút.",
  },
  {
    id: "q18",
    question: "Do ảnh hưởng suy thoái từ các đối tác lớn như Mỹ và EU, tăng trưởng GDP của Việt Nam năm 2009 đã chậm lại ở mức nào?",
    options: [
      "5.3% (giảm từ mức 8.5% năm 2007)",
      "2.1%",
      "0.5%",
      "-1.5%",
    ],
    correctIndex: 0,
    explanation: "Tăng trưởng GDP của Việt Nam giảm từ 8.5% (2007) xuống 6.3% (2008) và 5.3% (2009) do sụt giảm mạnh về đơn hàng xuất khẩu và dòng vốn FDI.",
  },
  {
    id: "q19",
    question: "Ước tính tổng thiệt hại kinh tế toàn cầu từ cuộc Khủng hoảng tài chính 2008 là vào khoảng bao nhiêu?",
    options: [
      "Khoảng 10.000 tỷ USD ($10 Trillion)",
      "Khoảng 100 tỷ USD ($100B)",
      "Khoảng 500 tỷ USD ($500B)",
      "Khoảng 50.000 tỷ USD ($50T)",
    ],
    correctIndex: 0,
    explanation: "Theo các ước tính của IMF và các tổ chức quốc tế, tổng thiệt hại kinh tế toàn cầu lên tới khoảng 10.000 tỷ USD kèm theo sự bốc hơi 50% giá trị các sàn chứng khoán.",
  },

  // ── Phần 4: Giải pháp & Cải cách phòng ngừa ─────────────────
  {
    id: "q20",
    question: "Chương trình giải cứu tài sản xấu khẩn cấp TARP của chính phủ Mỹ năm 2008 có quy mô bao nhiêu vốn?",
    options: [
      "700 tỷ USD ($700B)",
      "250 tỷ USD ($250B)",
      "1.500 tỷ USD ($1.5T)",
      "85 tỷ USD ($85B)",
    ],
    correctIndex: 0,
    explanation: "Chương trình TARP (Troubled Asset Relief Program) trị giá $700 tỷ được Quốc hội Mỹ thông qua nhằm mua lại tài sản độc hại và bơm vốn cứu các ngân hàng.",
  },
  {
    id: "q21",
    question: "Quy tắc Volcker (Volcker Rule) trong Đạo luật Dodd-Frank 2010 nghiêm cấm các ngân hàng thương mại làm điều gì?",
    options: [
      "Tự doanh đầu cơ (Proprietary Trading) bằng tiền gửi của dân chúng",
      "Cung cấp thẻ tín dụng quốc tế",
      "Cho vay thế chấp bất động sản",
      "Đầu tư mua trái phiếu chính phủ Mỹ",
    ],
    correctIndex: 0,
    explanation: "Quy tắc Volcker cấm ngân hàng thương mại dùng tiền gửi tiết kiệm được nhà nước bảo hiểm để tự doanh đầu cơ chứng khoán hoặc rót vốn vào quỹ phòng hộ rủi ro cao.",
  },
  {
    id: "q22",
    question: "Chính sách Nới lỏng định lượng (Quantitative Easing - QE) của Cục Dự trữ Liên bang Mỹ (Fed) hoạt động như thế nào?",
    options: [
      "Fed tạo thêm tiền để mua lượng lớn trái phiếu chính phủ và chứng khoán MBS trên thị trường",
      "Fed in tiền mặt phát trực tiếp cho từng người dân",
      "Fed tăng lãi suất tái cấp vốn lên mức kỷ lục",
      "Fed đóng cửa các sàn giao dịch chứng khoán",
    ],
    correctIndex: 0,
    explanation: "Khi lãi suất đã về 0% (ZIRP), Fed thực hiện QE bằng cách mua vào hàng nghìn tỷ USD trái phiếu và MBS để trực tiếp bơm thanh khoản vào hệ thống tài chính.",
  },
  {
    id: "q23",
    question: "Cơ quan nào được thành lập dưới Đạo luật Dodd-Frank nhằm ngăn chặn các hành vi cho vay nặng lãi và bảo vệ người vay tiêu dùng?",
    options: [
      "CFPB (Consumer Financial Protection Bureau)",
      "SEC (Securities and Exchange Commission)",
      "FDIC (Federal Deposit Insurance Corporation)",
      "CFTC (Commodity Futures Trading Commission)",
    ],
    correctIndex: 0,
    explanation: "CFPB (Cục Bảo vệ Tài chính Người tiêu dùng) được thành lập theo đề xuất của GS. Elizabeth Warren để giám sát các sản phẩm tín dụng tiêu dùng và cho vay mua nhà.",
  },
  {
    id: "q24",
    question: "Hiệp ước Basel III bổ sung hai chỉ số an toàn thanh khoản then chốt nào sau cuộc khủng hoảng 2008?",
    options: [
      "LCR (Liquidity Coverage Ratio) và NSFR (Net Stable Funding Ratio)",
      "ROA (Return on Assets) và ROE (Return on Equity)",
      "P/E (Price to Earnings) và P/B (Price to Book)",
      "EBITDA và Operating Cash Flow",
    ],
    correctIndex: 0,
    explanation: "Basel III bổ sung chỉ số LCR (đảm bảo thanh khoản chống sốc 30 ngày) và NSFR (đảm bảo cơ cấu nguồn vốn ổn định trong vòng 1 năm).",
  },
  {
    id: "q25",
    question: "Hiện tượng nghịch lý tín dụng (Credit Paradox) xảy ra sau khủng hoảng 2008 được hiểu là gì?",
    options: [
      "Lãi suất điều hành giảm về gần 0% nhưng ngân hàng siết chặt tiêu chuẩn khiến người dân và SME rất khó vay tiền",
      "Lãi suất vay tiền tăng vọt khiến không ai muốn vay",
      "Người dân đổ xô đi vay ngân hàng mặc dù không có nhu cầu chi tiêu",
      "Ngân hàng từ chối nhận tiền gửi tiết kiệm của dân cư",
    ],
    correctIndex: 0,
    explanation: "Mặc dù Fed cắt lãi suất về sát 0% để khuyến khích vay mượn, các ngân hàng thương mại vì sợ rủi ro nợ xấu đã thắt chặt tiêu chuẩn cho vay, khiến tín dụng thực tế bị tắc nghẽn.",
  },
];

export function getRandomQuiz(): QuizQuestion {
  const index = Math.floor(Math.random() * QUIZ_QUESTIONS.length);
  const q = QUIZ_QUESTIONS[index];

  // Shuffle options so correct answer is randomly distributed among A, B, C, D
  const indexedOptions = q.options.map((opt, i) => ({
    opt,
    isCorrect: i === q.correctIndex,
  }));

  for (let i = indexedOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = indexedOptions[i];
    indexedOptions[i] = indexedOptions[j];
    indexedOptions[j] = temp;
  }

  const shuffledOptions = indexedOptions.map((item) => item.opt);
  const newCorrectIndex = indexedOptions.findIndex((item) => item.isCorrect);

  return {
    ...q,
    options: shuffledOptions,
    correctIndex: newCorrectIndex,
  };
}
