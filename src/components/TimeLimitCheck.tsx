import React from "react";
import { useNavigate } from "react-router-dom";
import { useTimeLimit } from "../contexts/TimeLimitContext";

const TimeLimitCheck: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isWithinTimeLimit, remainingTime, timeLimitSettings } =
    useTimeLimit();
  const navigate = useNavigate();

  if (!timeLimitSettings.isEnabled) {
    return <>{children}</>;
  }

  if (!isWithinTimeLimit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-lg max-w-md w-full text-center">
          <div className="text-6xl mb-4">⏰</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Zaman Sınırı Aşıldı
          </h2>
          <p className="text-gray-600 mb-6">
            {remainingTime <= 0
              ? "Bugünkü kullanım süreniz doldu. Yarın tekrar görüşmek üzere!"
              : `Kalan süreniz: ${remainingTime} dakika`}
          </p>
          <button
            onClick={() => navigate("/profile")}
            className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Ebeveyn Kontrolüne Git
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default TimeLimitCheck;
