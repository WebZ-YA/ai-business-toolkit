import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { categoriesData, toolsData } from '../../data/toolsData';
import { Tool } from '../../types';
import {
  Sparkles,
  Zap,
  ArrowRight,
  TrendingUp,
  Search,
  Shield,
  Star,
  Check,
  Bot,
  Code,
  PenTool,
  Image as ImageIcon,
  FileText,
  Megaphone,
  Briefcase,
  Share2,
  DollarSign,
  Crown
} from 'lucide-react';
import { AdSenseBanner } from '../AdSenseBanner';

interface HomeViewProps {
  onSelectTool: (tool: Tool) => void;
  onNavigateTab: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectTool, onNavigateTab }) => {
  const { t, language } = useLanguage();
  const { isFavorite, toggleFavorite } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const popularTools = toolsData.filter((tool) => tool.popular);
  const trendingTools = toolsData.filter((tool) => tool.trending);

  const filteredTools = searchTerm
    ? toolsData.filter(
        (tool) =>
          tool.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.nameAr.includes(searchTerm) ||
          tool.descriptionEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  return (
    <div className="space-y-16 pb-12">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 text-center overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[200px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>{language === 'ar' ? 'منصة الذكاء الاصطناعي الشاملة 2026' : '35+ Instant AI & Productivity Tools v2.5'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            {language === 'ar' ? (
              <>
                منصة واحدة تجمع أفضل <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                  أدوات الذكاء الاصطناعي والإنتاجية
                </span>
              </>
            ) : (
              <>
                Supercharge Your Business With <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                  35+ Professional AI & Developer Tools
                </span>
              </>
            )}
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'ar'
              ? 'توقف عن نقل البيانات بين عشرات التطبيقات. توليد المقالات، كتابة الإعلانات، معالجة الصور، تنسيق JSON، وأدوات PDF متقدمة داخل لوحة تحكم واحدة.'
              : 'Stop paying for separate software. Generate marketing copy, remove image backgrounds, format JSON, merge PDFs, and write code with Gemini 3.6 Flash in one place.'}
          </p>

          {/* Instant Search input */}
          <div className="max-w-xl mx-auto relative pt-2">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-12 pr-28 py-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-2xl backdrop-blur-md"
              />
              <button
                onClick={() => onNavigateTab('tools')}
                className="absolute right-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 transition-all"
              >
                <span>{language === 'ar' ? 'تصفح الكل' : 'Explore All'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Instant Search dropdown results */}
            {searchTerm && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-30 max-h-72 overflow-y-auto text-left">
                {filteredTools.length > 0 ? (
                  filteredTools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => {
                        setSearchTerm('');
                        onSelectTool(tool);
                      }}
                      className="w-full p-2.5 hover:bg-slate-800 rounded-xl flex items-center justify-between text-slate-200 text-xs transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span className="font-semibold text-white">{language === 'ar' ? tool.nameAr : tool.nameEn}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 capitalize">{tool.categoryId}</span>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-slate-400 text-xs">
                    {language === 'ar' ? 'لم نجد أداة مطابقة لبحثك' : 'No tools matched your query.'}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick CTA Buttons */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigateTab('tools')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center gap-2 transition-all"
            >
              <Zap className="w-4 h-4" />
              <span>{language === 'ar' ? 'استكشف الـ 35 أداة الآن' : 'Start Using Tools Free'}</span>
            </button>
            <button
              onClick={() => onNavigateTab('pricing')}
              className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm transition-all flex items-center gap-1.5"
            >
              <Crown className="w-4 h-4 text-amber-400" />
              <span>{t.pricing}</span>
            </button>
          </div>

          {/* Trust stats */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-slate-800/80 text-center">
            <div>
              <div className="text-xl font-black text-white">35+</div>
              <div className="text-[11px] text-slate-400">{language === 'ar' ? 'أداة ذكية جاهزة' : 'AI & Utility Tools'}</div>
            </div>
            <div>
              <div className="text-xl font-black text-indigo-400">100K+</div>
              <div className="text-[11px] text-slate-400">{language === 'ar' ? 'عملية توليد ناجحة' : 'Executions Run'}</div>
            </div>
            <div>
              <div className="text-xl font-black text-emerald-400">99.9%</div>
              <div className="text-[11px] text-slate-400">{language === 'ar' ? 'سرعة الاستجابة' : 'Uptime Guarantee'}</div>
            </div>
            <div>
              <div className="text-xl font-black text-purple-400">Bilingual</div>
              <div className="text-[11px] text-slate-400">{language === 'ar' ? 'دعم كامل عربي وإنجليزي' : 'Full RTL & English'}</div>
            </div>
          </div>

        </div>
      </section>

      {/* AdSense Top Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <AdSenseBanner slot="home-top-banner" format="horizontal" />
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span>{language === 'ar' ? 'تصنيفات الأدوات الشاملة' : 'Tool Categories'}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'ar' ? 'تصفح الأدوات بحسب التخصص والمجال' : 'Browse AI tools grouped by domain and workflow'}
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('tools')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>{language === 'ar' ? 'عرض كل التصنيفات' : 'View All'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoriesData.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigateTab('tools')}
              className="group p-5 rounded-2xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer shadow-lg space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
                  {language === 'ar' ? cat.nameAr : cat.nameEn}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                  {language === 'ar' ? cat.descriptionAr : cat.descriptionEn}
                </p>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium pt-1 border-t border-slate-800/60">
                <span>{cat.toolCount} {language === 'ar' ? 'أداة' : 'tools'}</span>
                <span className="text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <span>{language === 'ar' ? 'الأدوات الأكثر استخداماً' : 'Most Popular Tools'}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'ar' ? 'الأدوات المفضلة لدى آلاف رواد الأعمال والشركات' : 'Top choice tools relied on by entrepreneurs'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularTools.map((tool) => (
            <div
              key={tool.id}
              className="group relative p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
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
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors">
                    {language === 'ar' ? tool.nameAr : tool.nameEn}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {language === 'ar' ? tool.descriptionAr : tool.descriptionEn}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  {tool.usageCount.toLocaleString()} {language === 'ar' ? 'استخدام' : 'uses'}
                </span>

                <button
                  onClick={() => onSelectTool(tool)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 transition-all"
                >
                  <span>{language === 'ar' ? 'تشغيل الأداة' : 'Launch Tool'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12 bg-slate-900/60 border border-slate-800/80 rounded-3xl space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-extrabold text-white">
            {language === 'ar' ? 'لماذا تختار AI Business Toolkit؟' : 'Built for High Performance & Scalability'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {language === 'ar' ? 'صممت المنصة لتقديم أقصى سرعة وأعلى إنتاجية بدون تعقيدات' : 'Engineered to replace 10+ subscriptions with an all-in-one SaaS platform.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Gemini 3.6 Flash Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'ar'
                ? 'استجابات لحظية فائقة الذكاء مع فهم كامل للغة العربية الفصحى والأسلوب التسويقي.'
                : 'Powered by Gemini 3.6 Flash for instant text generation, code drafting, and chat.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Privacy & Client Processing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'ar'
                ? 'أدوات معالجة الصور والتكويد تعمل محلياً داخل متصفحك للحفاظ على خصوصيتك الكاملة.'
                : 'Image processing, JSON validation, and password generators process inside your browser.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <Crown className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Bilingual & RTL Native</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'ar'
                ? 'دعم كامل للغة العربية والاتجاه من اليمين إلى اليسار مع تجربة مخصصة للمنطقة العربية.'
                : 'Seamless bidirectional support for both English and native Arabic RTL typography.'}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
