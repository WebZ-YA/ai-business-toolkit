import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, CreditCard, Lock, CheckCircle2, Shield } from 'lucide-react';

interface StripeModalProps {
  planName: string;
  planPrice: string;
  onClose: () => void;
}

export const StripeModal: React.FC<StripeModalProps> = ({ planName, planPrice, onClose }) => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Stripe Checkout</h3>
              <p className="text-[11px] text-slate-400">{planName} ({planPrice})</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="font-extrabold text-white text-lg">Subscription Activated!</h4>
            <p className="text-xs text-slate-300">Your account has been upgraded with unlimited Gemini credits.</p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs"
            >
              Start Using Pro Tools
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Card Number</label>
              <input
                type="text"
                placeholder="4242 •••• •••• 4242"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM / YY"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">CVC</label>
                <input
                  type="text"
                  placeholder="123"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Protected by 256-bit SSL encryption via Stripe</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              {loading ? 'Processing Payment...' : `Pay ${planPrice} & Upgrade`}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
