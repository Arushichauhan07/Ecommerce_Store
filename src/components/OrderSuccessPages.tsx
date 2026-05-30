import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();

  return (
    <div className="w-200 h-100 bg-gradient-to-br from-[#F8FAFC] via-white to-[#EEF2FF] flex items-center justify-center px-4 py-12 rounded-2xl">
      <div className="w-full max-w-lg">
        
        <div className="bg-white shadow-xl rounded-3xl p-8 border border-[#E2E8F0]">
          <div className="text-center mb-10">
            <div className="relative mx-auto mb-5 w-20 h-20">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse" />
              <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-[#10B981] shadow-lg">
                <CheckCircle
                  className="text-white w-10 h-10"
                  strokeWidth={2.5}
                />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-[#0F172A] mb-2">
              Order Confirmed!
            </h1>

            <p className="text-sm text-[#64748B] leading-relaxed">
              Thanks for your purchase. We'll send you a shipping update soon.
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent mb-8" />

          <div className="flex justify-center">
            <button
              onClick={() => {
                onClose();
                navigate("/");
              }}
              className="group relative w-44 py-3 rounded-2xl bg-[#0F172A] text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Go to Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
