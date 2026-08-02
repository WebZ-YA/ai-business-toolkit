import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { toolsData } from '../data/toolsData';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (toolId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectTool }) => {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger parent open search
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? toolsData.filter((t) => {
        const q = query.toLowerCase();
        const name = (language === 'ar' ? t.nameAr : t.nameEn).toLowerCase();
        const desc = (language === 'ar' ? t.descriptionAr : t.descriptionEn).toLowerCase();
        const tags = t.tags.join(' ').toLowerCase();
        return name.includes(q) || desc.includes(q) || tags.includes(q);
      })
    : toolsData.slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            placeholder={language === 'ar' ? 'ابحث عن أداة الذكاء الاصطناعي أو التصنيف...' : 'Search tools, categories, or keywords...'}
            className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-slate-500"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            {query.trim() ? (language === 'ar' ? 'نتائج البحث' : 'Search Results') : (language === 'ar' ? 'أدوات مقترحة' : 'Suggested Tools')}
          </div>

          {results.length > 0 ? (
            results.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  onSelectTool(tool.id);
                  onClose();
                }}
                className="w-full p-3 hover:bg-slate-800 rounded-2xl flex items-center justify-between text-left transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-white text-xs group-hover:text-indigo-300 truncate">
                      {language === 'ar' ? tool.nameAr : tool.nameEn}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {language === 'ar' ? tool.descriptionAr : tool.descriptionEn}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {tool.isAi && (
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[9px] font-bold">
                      AI
                    </span>
                  )}
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </button>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              {language === 'ar' ? 'لا توجد نتائج مطابقة لبحثك' : 'No tools found matching your query.'}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
