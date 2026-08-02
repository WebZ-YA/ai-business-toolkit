import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { categoriesData, toolsData } from '../../data/toolsData';
import { Tool, CategoryId } from '../../types';
import {
  Search,
  Sparkles,
  Heart,
  TrendingUp,
  Filter,
  Zap,
  ArrowRight,
  Sliders,
  Check
} from 'lucide-react';
import { AdSenseBanner } from '../AdSenseBanner';

interface ToolsViewProps {
  onSelectTool: (tool: Tool) => void;
}

export const ToolsView: React.FC<ToolsViewProps> = ({ onSelectTool }) => {
  const { language } = useLanguage();
  const { isFavorite, toggleFavorite, favorites } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all' | 'favorites'>('all');
  const [filterType, setFilterType] = useState<'all' | 'ai' | 'utilities' | 'pro'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = toolsData.filter((tool) => {
    // Category filter
    if (selectedCategory === 'favorites') {
      if (!favorites.includes(tool.id)) return false;
    } else if (selectedCategory !== 'all') {
      if (tool.categoryId !== selectedCategory) return false;
    }

    // Type filter
    if (filterType === 'ai' && !tool.isAi) return false;
    if (filterType === 'utilities' && tool.isAi) return false;
    if (filterType === 'pro' && !tool.isPro) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const name = (language === 'ar' ? tool.nameAr : tool.nameEn).toLowerCase();
      const desc = (language === 'ar' ? tool.descriptionAr : tool.descriptionEn).toLowerCase();
      const tags = tool.tags.join(' ').toLowerCase();
      return name.includes(q) || desc.includes(q) || tags.includes(q);
    }

    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            {language === 'ar' ? 'مكتبة الأدوات الشاملة' : 'Tool Directory'}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          {language === 'ar' ? 'استكشف أكثر من 35 أداة ذكية وإنتاجية' : 'Explore 35+ Instant AI & Digital Productivity Tools'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          {language === 'ar'
            ? 'اختر الأداة المطلوبة وابدأ بالعمل فوراً. أدوات كتابة بالذكاء الاصطناعي، معالجة الصور، PDF، التكويد وتوليد الباركود.'
            : 'Select any tool below to launch. Includes Gemini AI content generators, background remover, image compression, PDF converters, and developer utilities.'}
        </p>

        {/* Search Bar & Quick Filters */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ar' ? 'ابحث باسم الأداة أو الوصف...' : 'Search tool name or tags...'}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 placeholder-slate-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterType === 'all'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {language === 'ar' ? 'الكل' : 'All Types'}
            </button>
            <button
              onClick={() => setFilterType('ai')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                filterType === 'ai'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>AI Tools</span>
            </button>
            <button
              onClick={() => setFilterType('utilities')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                filterType === 'utilities'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              <span>Utilities</span>
            </button>
          </div>
        </div>
      </div>

      {/* Categories Tabs Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
          }`}
        >
          {language === 'ar' ? 'جميع التصنيفات' : 'All Categories'} ({toolsData.length})
        </button>

        <button
          onClick={() => setSelectedCategory('favorites')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            selectedCategory === 'favorites'
              ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-pink-400" />
          <span>{language === 'ar' ? 'المفضلة' : 'Favorites'} ({favorites.length})</span>
        </button>

        {categoriesData.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
            }`}
          >
            {language === 'ar' ? cat.nameAr : cat.nameEn}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredTools.map((tool) => {
            const isFav = isFavorite(tool.id);
            return (
              <div
                key={tool.id}
                className="group relative p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      {tool.isAi && (
                        <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[9px] font-black uppercase">
                          AI
                        </span>
                      )}
                      {tool.isPro && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-bold">
                          Pro
                        </span>
                      )}
                      <button
                        onClick={() => toggleFavorite(tool.id)}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 transition-colors"
                        title={isFav ? 'Remove Favorite' : 'Add Favorite'}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-pink-500 text-pink-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
                      {language === 'ar' ? tool.nameAr : tool.nameEn}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {language === 'ar' ? tool.descriptionAr : tool.descriptionEn}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">
                    {tool.usageCount.toLocaleString()} {language === 'ar' ? 'عملية' : 'runs'}
                  </span>

                  <button
                    onClick={() => onSelectTool(tool)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 transition-all"
                  >
                    <span>{language === 'ar' ? 'تشغيل' : 'Launch'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
          <Sparkles className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">
            {language === 'ar' ? 'لم يتم العثور على أدوات' : 'No tools matched your filter.'}
          </h3>
          <p className="text-xs text-slate-400">
            {language === 'ar' ? 'جرب البحث بكلمة أخرى أو قم بإلغاء الفلترة' : 'Try resetting your category or search query.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setFilterType('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold"
          >
            {language === 'ar' ? 'إعادة ضبط الفلتر' : 'Reset Filters'}
          </button>
        </div>
      )}

      {/* AdSense Placement */}
      <AdSenseBanner slot="tools-view-bottom" format="horizontal" />

    </div>
  );
};
