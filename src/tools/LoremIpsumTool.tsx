import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FileText, Copy, Check } from 'lucide-react';

export const LoremIpsumTool: React.FC = () => {
  const { language } = useLanguage();

  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const baseText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

  const generateLorem = () => {
    let res = [];
    for (let i = 0; i < paragraphs; i++) {
      res.push(baseText);
    }
    setOutput(res.join('\n\n'));
  };

  React.useEffect(() => {
    generateLorem();
  }, [paragraphs]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-400" />
          <span>{language === 'ar' ? 'مولد نصوص لوريم إيبسوم المؤقتة' : 'Lorem Ipsum Generator'}</span>
        </h3>

        <button
          onClick={handleCopy}
          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="text-xs font-semibold text-slate-300">Paragraphs:</label>
          {[1, 3, 5, 10].map((num) => (
            <button
              key={num}
              onClick={() => setParagraphs(num)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                paragraphs === num ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              {num} Paragraphs
            </button>
          ))}
        </div>

        <textarea
          rows={8}
          readOnly
          value={output}
          className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-sans text-xs focus:outline-none leading-relaxed"
        />
      </div>
    </div>
  );
};
