import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { GitCompare } from 'lucide-react';

export const TextCompareTool: React.FC = () => {
  const { language } = useLanguage();

  const [text1, setText1] = useState('Welcome to AI Business Toolkit.\nScale your business with 35+ AI tools.');
  const [text2, setText2] = useState('Welcome to AI Business Toolkit Platform.\nSupercharge your team with 35+ AI tools.');

  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
      <h3 className="font-bold text-white text-base flex items-center gap-2">
        <GitCompare className="w-5 h-5 text-indigo-400" />
        <span>{language === 'ar' ? 'مقارنة النصوص واكتشاف الفروقات' : 'Side-by-Side Text Compare & Diff'}</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Original Text (A)</label>
          <textarea
            rows={8}
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Modified Text (B)</label>
          <textarea
            rows={8}
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
        <span className="text-slate-400 font-bold block mb-2">Line Diff Comparison:</span>
        {lines1.map((line, idx) => {
          const isDifferent = lines2[idx] !== line;
          return (
            <div key={idx} className={`p-2 rounded flex justify-between ${isDifferent ? 'bg-amber-950/40 border border-amber-800/40 text-amber-300' : 'text-slate-300'}`}>
              <div>
                <span className="text-slate-500 mr-2">L{idx + 1}:</span>
                <span>{line}</span>
              </div>
              {isDifferent && <span className="text-amber-400 font-bold text-[10px]">MODIFIED</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
