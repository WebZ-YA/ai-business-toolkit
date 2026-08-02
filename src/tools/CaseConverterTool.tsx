import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Type, Copy, Check } from 'lucide-react';

export const CaseConverterTool: React.FC = () => {
  const { language } = useLanguage();

  const [text, setText] = useState('Supercharge your SaaS with AI Business Toolkit');
  const [copied, setCopied] = useState(false);

  const toUpper = () => setText((t) => t.toUpperCase());
  const toLower = () => setText((t) => t.toLowerCase());
  const toTitle = () =>
    setText((t) =>
      t
        .toLowerCase()
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    );
  const toCamel = () =>
    setText((t) =>
      t
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
    );
  const toSnake = () =>
    setText((t) =>
      t
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-zA-Z0-9_]/g, '')
    );
  const toKebab = () =>
    setText((t) =>
      t
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-]/g, '')
    );

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Type className="w-5 h-5 text-indigo-400" />
          <span>{language === 'ar' ? 'محول حالة الأحرف Case Converter' : 'String Case Converter'}</span>
        </h3>

        <button
          onClick={handleCopy}
          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Result'}</span>
        </button>
      </div>

      <div className="space-y-4">
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-indigo-500 leading-relaxed"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          <button onClick={toUpper} className="py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-bold">
            UPPERCASE
          </button>
          <button onClick={toLower} className="py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-bold">
            lowercase
          </button>
          <button onClick={toTitle} className="py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-bold">
            Title Case
          </button>
          <button onClick={toCamel} className="py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-bold">
            camelCase
          </button>
          <button onClick={toSnake} className="py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-bold">
            snake_case
          </button>
          <button onClick={toKebab} className="py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-bold">
            kebab-case
          </button>
        </div>
      </div>
    </div>
  );
};
