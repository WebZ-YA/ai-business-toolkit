import React from 'react';

interface AdSenseBannerProps {
  slot: string;
  format?: 'horizontal' | 'rectangle' | 'auto';
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({ slot, format = 'auto' }) => {
  return (
    <div className="w-full my-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col items-center justify-center min-h-[90px] text-center space-y-1">
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
        ADVERTISEMENT
      </div>
      <div className="text-xs text-slate-400 font-medium">
        Google AdSense Placeholder ({slot} - {format})
      </div>
    </div>
  );
};
