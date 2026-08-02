import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Fingerprint, Copy, Check, RefreshCw } from 'lucide-react';

export const UuidGeneratorTool: React.FC = () => {
  const { language } = useLanguage();
  const [quantity, setQuantity] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateV4 = () =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });

  const handleGenerate = () => {
    const arr: string[] = [];
    for (let i = 0; i < quantity; i++) {
      arr.push(generateV4());
    }
    setUuids(arr);
  };

  React.useEffect(() => {
    handleGenerate();
  }, [quantity]);

  const handleCopy = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Fingerprint className="w-5 h-5 text-indigo-400" />
          <span>{language === 'ar' ? 'توليد معرفات UUID v4 الفريدة' : 'UUID v4 Bulk Generator'}</span>
        </h3>

        <button
          onClick={handleCopy}
          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy All'}</span>
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="text-xs font-semibold text-slate-300">Quantity to generate:</label>
          {[1, 5, 10, 20].map((num) => (
            <button
              key={num}
              onClick={() => setQuantity(num)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                quantity === num ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              {num} UUIDs
            </button>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 space-y-2 select-all max-h-60 overflow-y-auto">
          {uuids.map((id, i) => (
            <div key={i}>{id}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
