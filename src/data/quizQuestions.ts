// ============================================================
// LAPSE — Presentation Quiz Database (Topic 2)
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
  {
    id: "q1",
    question: "Ngân hàng đầu tư Lehman Brothers chính thức tuyên bố phá sản vào tháng/năm nào?",
    options: [
      "Tháng 09 / 2008",
      "Tháng 03 / 2007",
      "Tháng 12 / 2009",
      "Tháng 07 / 1997",
    ],
    correctIndex: 0,
    explanation: "Lehman Brothers nộp đơn xin phá sản vào ngày 15/09/2008 với hơn $600 tỷ tài sản, đánh dấu sự kiện chấn động nhất cuộc khủng hoảng.",
  },
  {
    id: "q2",
    question: "MBS trong kỹ thuật chứng khoán hóa (Securitization) là viết tắt của từ gì?",
    options: [
      "Mortgage-Backed Securities",
      "Market Banking System",
      "Monetary Bond Scheme",
      "Macro Balance Sheet",
    ],
    correctIndex: 0,
    explanation: "MBS (Mortgage-Backed Securities) là chứng khoán đảm bảo bằng các khoản thế chấp bất động sản.",
  },
  {
    id: "q3",
    question: "Gói cứu trợ tài chính khẩn cấp TARP của chính phủ Mỹ năm 2008 có quy mô bao nhiêu?",
    options: [
      "700 tỷ USD ($700B)",
      "250 tỷ USD ($250B)",
      "1.500 tỷ USD ($1.5T)",
      "85 tỷ USD ($85B)",
    ],
    correctIndex: 0,
    explanation: "Chương trình TARP (Troubled Asset Relief Program) được Quốc hội Mỹ thông qua với quy mô 700 tỷ USD để giải cứu các ngân hàng.",
  },
  {
    id: "q4",
    question: "Trong mô hình 'Originate-to-Distribute', vì sao các ngân hàng cho vay lại bất cẩn (Moral Hazard)?",
    options: [
      "Vì họ bán đứt khoản nợ cho người khác nên không còn chịu rủi ro vỡ nợ",
      "Vì người vay nợ có điểm tín dụng quá cao",
      "Vì lãi suất ngân hàng trung ương quá cao",
      "Vì nhà nước cam kết trả nợ thay 100%",
    ],
    correctIndex: 0,
    explanation: "Ngân hàng bán ngay khoản thế chấp đóng gói vào MBS cho nhà đầu tư, nên họ chỉ cần ăn phí hoa hồng mà không quan tâm người vay có trả được nợ hay không.",
  },
  {
    id: "q5",
    question: "Quy tắc Volcker (Volcker Rule) trong Đạo luật Dodd-Frank 2010 cấm các ngân hàng thương mại làm gì?",
    options: [
      "Tự doanh đầu cơ (Proprietary Trading) và rót vốn vào quỹ phòng hộ rủi ro",
      "Nhận tiền gửi tiết kiệm của dân cư",
      "Cho vay mua nhà trả góp",
      "Mở thêm chi nhánh ở nước ngoài",
    ],
    correctIndex: 0,
    explanation: "Volcker Rule cấm các ngân hàng thương mại nhận tiền gửi của dân sử dụng nguồn vốn này để tự doanh đánh bạc trên thị trường tài chính.",
  },
  {
    id: "q6",
    question: "Tập đoàn bảo hiểm khổng lồ nào của Mỹ đã phải nhận gói giải cứu hơn $85 tỷ do phát hành quá nhiều hợp đồng CDS?",
    options: [
      "AIG (American International Group)",
      "Berkshire Hathaway",
      "Prudential",
      "MetLife",
    ],
    correctIndex: 0,
    explanation: "AIG đã bán khống bảo hiểm phá sản (Credit Default Swaps - CDS) trị giá hàng trăm tỷ USD cho các CDO độc hại và suýt sụp đổ hoàn toàn.",
  },
  {
    id: "q7",
    question: "Tỷ lệ thất nghiệp tại Mỹ đã tăng vọt lên mức đỉnh điểm bao nhiêu % vào tháng 10/2009?",
    options: [
      "10.0%",
      "5.0%",
      "15.5%",
      "7.2%",
    ],
    correctIndex: 0,
    explanation: "Tỷ lệ thất nghiệp của Mỹ đã tăng gấp đôi từ 5.0% (cuối 2007) lên đỉnh 10.0% vào tháng 10/2009, khiến 8.7 triệu người mất việc.",
  },
  {
    id: "q8",
    question: "Do ảnh hưởng từ khủng hoảng tài chính toàn cầu 2008, tăng trưởng GDP của Việt Nam đã chậm lại từ 8.5% (2007) xuống mức nào vào năm 2009?",
    options: [
      "5.3%",
      "2.1%",
      "0.5%",
      "-1.5%",
    ],
    correctIndex: 0,
    explanation: "Tăng trưởng GDP của Việt Nam giảm từ 8.5% (2007) xuống 6.3% (2008) và 5.3% (2009) do các đối tác xuất khẩu lớn như Mỹ, EU rơi vào suy thoái.",
  },
  {
    id: "q9",
    question: "Hiệp ước Basel III đưa ra các chỉ số an toàn thanh khoản nào sau khủng hoảng 2008?",
    options: [
      "LCR (Liquidity Coverage Ratio) và NSFR (Net Stable Funding Ratio)",
      "ROA và ROE",
      "P/E và P/B",
      "EBITDA và Cash Flow",
    ],
    correctIndex: 0,
    explanation: "Basel III bổ sung 2 tỷ lệ thanh khoản cốt lõi là LCR (thanh khoản ngắn hạn 30 ngày) và NSFR (nguồn vốn ổn định dài hạn).",
  },
  {
    id: "q10",
    question: "Sự kiện bong bóng đầu cơ sớm nhất trong lịch sử tài chính thường được nhắc đến là gì?",
    options: [
      "Hội chứng cuồng hoa Tulip Hà Lan (Tulip Mania, 1630s)",
      "Bong bóng Dot-com (2000)",
      "Đại suy thoái Mỹ (1929)",
      "Khủng hoảng Công ty Biển Nam (South Sea Bubble, 1720)",
    ],
    correctIndex: 0,
    explanation: "Tulip Mania tại Hà Lan (những năm 1630s) là ví dụ kinh điển sớm nhất khi một củ hoa tulip có giá tương đương một ngôi nhà mặt phố Amsterdam.",
  },
];

export function getRandomQuiz(): QuizQuestion {
  const index = Math.floor(Math.random() * QUIZ_QUESTIONS.length);
  return QUIZ_QUESTIONS[index];
}
