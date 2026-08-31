import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Inventory, MAX_EXTRA_HEARTS, MAX_BAILOUTS } from "@/lib/game/gameTypes";
import { QuizQuestion, getRandomQuiz } from "@/data/quizQuestions";

type ShopItemType = "oracle" | "extraHeart" | "bailout";

type ShopModalProps = {
  inventory: Inventory;
  onClose: () => void;
  onBuyItem: (item: ShopItemType) => void;
  onUseBailout: () => void;
};

export default function ShopModal({
  inventory,
  onClose,
  onBuyItem,
  onUseBailout,
}: ShopModalProps) {
  const [activeSubModal, setActiveSubModal] = useState<"qr" | "quiz" | null>(null);
  const [selectedItem, setSelectedItem] = useState<ShopItemType | null>(null);
  const [quiz, setQuiz] = useState<QuizQuestion | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<boolean | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [qrCountdown, setQrCountdown] = useState<number>(30);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    if (activeSubModal !== "qr") return;
    if (qrCountdown <= 0) return;

    const timer = setInterval(() => {
      setQrCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [activeSubModal, qrCountdown]);

  const handleOpenQR = (item: ShopItemType) => {
    if (item === "extraHeart" && (inventory.extraHeartPurchases || 0) >= MAX_EXTRA_HEARTS) return;
    if (item === "bailout" && (inventory.bailoutPurchases || 0) >= MAX_BAILOUTS) return;
    setSelectedItem(item);
    setQrCountdown(30);
    setActiveSubModal("qr");
  };

  const handleOpenQuiz = (item: ShopItemType) => {
    if (item === "extraHeart" && (inventory.extraHeartPurchases || 0) >= MAX_EXTRA_HEARTS) return;
    if (item === "bailout" && (inventory.bailoutPurchases || 0) >= MAX_BAILOUTS) return;
    setSelectedItem(item);
    setQuiz(getRandomQuiz());
    setQuizAnswered(null);
    setSelectedOption(null);
    setActiveSubModal("quiz");
  };

  const handleConfirmQR = () => {
    if (selectedItem) {
      onBuyItem(selectedItem);
      showToast("ching ching chong chong the phone ringing, đã nạp thành công 🔔💸");
      setActiveSubModal(null);
    }
  };

  const handleAnswerQuiz = (index: number) => {
    if (quizAnswered !== null || !quiz || !selectedItem) return;
    setSelectedOption(index);
    const isCorrect = index === quiz.correctIndex;
    setQuizAnswered(isCorrect);

    if (isCorrect) {
      setTimeout(() => {
        onBuyItem(selectedItem);
        showToast("Chính xác! Đã nhận vật phẩm thành công.");
        setActiveSubModal(null);
      }, 1200);
    }
  };

  const hasAnyItem =
    inventory.oracleCharges > 0 ||
    inventory.extraHearts > 0 ||
    inventory.bailoutCount > 0;

  const isHeartLimitReached = (inventory.extraHeartPurchases || 0) >= MAX_EXTRA_HEARTS;
  const isBailoutLimitReached = (inventory.bailoutPurchases || 0) >= MAX_BAILOUTS;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 notranslate"
      translate="no"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl max-h-[88vh] flex flex-col text-white overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div>
            <h2 className="text-xl font-black text-white tracking-wide flex items-center gap-2">
              <span>🛒</span> Hiệu ứng & Cửa hàng
            </h2>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">
              Secret Black Market & Inventory
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-1 py-4 space-y-6">
          {/* Section 1: Active Effects & Inventory */}
          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <span>✨</span> Hiệu ứng đang sở hữu
            </h3>

            {!hasAnyItem ? (
              <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 text-center">
                <p className="text-xs text-zinc-500 italic">
                  Chưa có vật phẩm nào đang kích hoạt.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {inventory.oracleCharges > 0 && (
                  <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">👁️</span>
                      <div>
                        <p className="text-xs font-bold text-cyan-300">Thuốc Tiên Tri</p>
                        <p className="text-[10px] text-cyan-400/80">Còn {inventory.oracleCharges} lượt xem trước</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-2 py-1 rounded-full border border-cyan-500/40">
                      ON
                    </span>
                  </div>
                )}

                {inventory.extraHearts > 0 && (
                  <div className="p-3 rounded-xl bg-pink-950/30 border border-pink-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">❤️</span>
                      <div>
                        <p className="text-xs font-bold text-pink-300">Extra Heart (Mạng cứu sinh)</p>
                        <p className="text-[10px] text-pink-400/80">Tự động hồi sinh 50% khi chạm 0% hoặc 100%</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-pink-400 bg-pink-500/20 px-2.5 py-1 rounded-full">
                      x{inventory.extraHearts}
                    </span>
                  </div>
                )}

                {inventory.bailoutCount > 0 && (
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">🏦</span>
                      <div>
                        <p className="text-xs font-bold text-amber-300">Gói Cứu Trợ Fed</p>
                        <p className="text-[10px] text-amber-400/80">Cân bằng cả 4 chỉ số về mức 50%</p>
                      </div>
                    </div>
                    <button
                      onClick={onUseBailout}
                      className="text-[10px] bg-amber-500 hover:bg-amber-400 text-black font-bold px-3 py-1.5 rounded-lg transition-all shadow-md active:scale-95"
                    >
                      KÍCH HOẠT (x{inventory.bailoutCount})
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="w-full h-px bg-zinc-800" />

          {/* Section 2: Shop Items Catalog */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
              <span>🛍️</span> Cửa hàng vật phẩm
            </h3>

            {/* Item 1: Oracle Potion */}
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-cyan-500/40 transition-colors space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl shrink-0">
                  👁️
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">Thuốc Tiên Tri</h4>
                    <span className="text-[10px] text-zinc-500 font-mono">Đang có: x{inventory.oracleCharges}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                    Mỗi lựa chọn đều để lại những hậu quả. Với món quà này, bạn có thể nhìn thấy trước biến động của các chỉ số (+2 lượt).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleOpenQR("oracle")}
                  className="py-2.5 px-3 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 active:scale-95 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>📱</span> Quét QR Donate
                </button>
                <button
                  onClick={() => handleOpenQuiz("oracle")}
                  className="py-2.5 px-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-white active:scale-95 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <span>🎓</span> Trả lời Quiz
                </button>
              </div>
            </div>

            {/* Item 2: Extra Heart */}
            <div className={`p-4 rounded-2xl bg-zinc-950/80 border transition-colors space-y-3 ${isHeartLimitReached ? "border-zinc-800 opacity-75" : "border-zinc-800 hover:border-pink-500/40"}`}>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-2xl shrink-0">
                  ❤️
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">Extra Heart (Mạng Dự Phòng)</h4>
                    <span className="text-[10px] text-pink-400 font-mono font-bold">
                      Đã mua: {inventory.extraHeartPurchases || 0}/{MAX_EXTRA_HEARTS}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                    Sống sót không có gì là sai trái. Với cái này, bạn sẽ thoát khỏi một cái kết không có hậu (cứu mạng 1 lần khi chỉ số chạm 0% hoặc 100%).
                  </p>
                </div>
              </div>

              {isHeartLimitReached ? (
                <div className="py-2.5 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
                  <span className="text-xs font-bold text-zinc-500 flex items-center justify-center gap-1.5">
                    🔒 Đã đạt giới hạn tối đa ({MAX_EXTRA_HEARTS}/{MAX_EXTRA_HEARTS} lượt/game)
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleOpenQR("extraHeart")}
                    className="py-2.5 px-3 rounded-xl bg-pink-500/15 border border-pink-500/40 text-pink-300 hover:bg-pink-500/25 active:scale-95 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>📱</span> Quét QR Donate
                  </button>
                  <button
                    onClick={() => handleOpenQuiz("extraHeart")}
                    className="py-2.5 px-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-white active:scale-95 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>🎓</span> Trả lời Quiz
                  </button>
                </div>
              )}
            </div>

            {/* Item 3: Emergency Bailout */}
            <div className={`p-4 rounded-2xl bg-zinc-950/80 border transition-colors space-y-3 ${isBailoutLimitReached ? "border-zinc-800 opacity-75" : "border-zinc-800 hover:border-amber-500/40"}`}>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl shrink-0">
                  🏦
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">Gói Cứu Trợ FED (Bailout)</h4>
                    <span className="text-[10px] text-amber-400 font-mono font-bold">
                      Đã mua: {inventory.bailoutPurchases || 0}/{MAX_BAILOUTS}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                    Bơm thanh khoản khẩn cấp từ Cục Dự trữ Liên bang, lập tức đưa cả 4 chỉ số đang nguy kịch về lại mức cân bằng 50%.
                  </p>
                </div>
              </div>

              {isBailoutLimitReached ? (
                <div className="py-2.5 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
                  <span className="text-xs font-bold text-zinc-500 flex items-center justify-center gap-1.5">
                    🔒 Đã đạt giới hạn tối đa ({MAX_BAILOUTS}/{MAX_BAILOUTS} lượt/game)
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleOpenQR("bailout")}
                    className="py-2.5 px-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 active:scale-95 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>📱</span> Quét QR Donate
                  </button>
                  <button
                    onClick={() => handleOpenQuiz("bailout")}
                    className="py-2.5 px-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-white active:scale-95 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>🎓</span> Trả lời Quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Toast Notification */}
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium text-center shadow-lg mt-2"
          >
            {toastMessage}
          </motion.div>
        )}
      </motion.div>

      {/* ── Sub-Modal 1: QR Payment / Troll Donate ────────────────── */}
      <AnimatePresence>
        {activeSubModal === "qr" && (
          <motion.div
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSubModal(null)}
          >
            <motion.div
              className="w-full max-w-sm bg-zinc-900 border border-zinc-700/60 rounded-3xl p-6 text-center space-y-4 shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-black text-white">Quét QR chuyển khoản</h3>
              <p className="text-xs text-zinc-400">
                Quét mã QR bằng ứng dụng ngân hàng để ủng hộ nhóm thuyết trình.
              </p>

              {/* QR Image - Clean Static Frame */}
              <div className="relative w-52 h-52 mx-auto bg-white p-2 rounded-2xl shadow-xl overflow-hidden border-2 border-zinc-700">
                <Image
                  src="/qrcode.png"
                  alt="QR Code"
                  fill
                  className="object-contain"
                />
              </div>

              {/* 30s Countdown Progress Bar */}
              {qrCountdown > 0 ? (
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] text-zinc-400 font-medium">
                    <span>Đang chờ xác thực giao dịch...</span>
                    <span className="font-mono font-bold text-amber-400">{qrCountdown}s</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 transition-all duration-1000 ease-linear rounded-full"
                      style={{ width: `${((30 - qrCountdown) / 30) * 100}%` }}
                    />
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-emerald-400 font-semibold pt-1">
                  Đã hoàn tất thời gian chờ xác thực
                </p>
              )}

              <div className="pt-2 space-y-2">
                <button
                  onClick={handleConfirmQR}
                  disabled={qrCountdown > 0}
                  className={`w-full py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg font-bold ${
                    qrCountdown > 0
                      ? "bg-zinc-800 text-zinc-500 border border-zinc-700/60 cursor-not-allowed"
                      : "bg-amber-500 hover:bg-amber-400 text-black active:scale-95 shadow-amber-500/20"
                  }`}
                >
                  {qrCountdown > 0
                    ? `Vui lòng chờ xác thực (${qrCountdown}s)`
                    : "Tôi đã chuyển khoản thành công"}
                </button>
                <button
                  onClick={() => setActiveSubModal(null)}
                  className="w-full py-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white text-xs font-medium transition-colors"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sub-Modal 2: Presentation Quiz Challenge ──────────────── */}
      <AnimatePresence>
        {activeSubModal === "quiz" && quiz && (
          <motion.div
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSubModal(null)}
          >
            <motion.div
              className="w-full max-w-sm bg-zinc-900 border border-cyan-500/30 rounded-3xl p-6 space-y-4 shadow-2xl text-left"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-2.5 py-1 rounded-full border border-cyan-500/30">
                  🎓 SEMINAR QUIZ
                </span>
                <span className="text-xs text-zinc-500">Nhận vật phẩm FREE</span>
              </div>

              <h3 className="text-sm font-bold text-white leading-snug">
                {quiz.question}
              </h3>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {quiz.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === quiz.correctIndex;

                  let btnStyle = "bg-zinc-800/80 border-zinc-700 text-zinc-200 hover:bg-zinc-700";
                  if (quizAnswered !== null) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                    } else if (isSelected && !isCorrect) {
                      btnStyle = "bg-red-500/20 border-red-500 text-red-300";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerQuiz(idx)}
                      disabled={quizAnswered !== null}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 ${btnStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-black/40 text-center font-mono shrink-0 flex items-center justify-center text-[10px]">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Result explanation */}
              {quizAnswered !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-xl text-xs ${
                    quizAnswered
                      ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-200"
                      : "bg-red-500/15 border border-red-500/30 text-red-200"
                  }`}
                >
                  <p className="font-bold mb-1">
                    {quizAnswered ? "🎉 Chính xác!" : "❌ Chưa chính xác!"}
                  </p>
                  <p className="text-[11px] leading-relaxed text-zinc-300">
                    {quiz.explanation}
                  </p>
                  {!quizAnswered && (
                    <button
                      onClick={() => handleOpenQuiz(selectedItem!)}
                      className="mt-2 text-xs font-bold text-amber-400 hover:text-amber-300 underline"
                    >
                      Thử lại câu hỏi khác ➔
                    </button>
                  )}
                </motion.div>
              )}

              <div className="pt-1">
                <button
                  onClick={() => setActiveSubModal(null)}
                  className="w-full py-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white text-xs font-medium transition-colors"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
