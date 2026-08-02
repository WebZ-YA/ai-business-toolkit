import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { blogPostsData } from '../../data/blogData';
import { BlogPost } from '../../types';
import { BookOpen, Calendar, Clock, User, ArrowLeft, ArrowRight, Search, Tag, Share2 } from 'lucide-react';

export const BlogView: React.FC = () => {
  const { language } = useLanguage();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [search, setSearch] = useState('');

  const filteredPosts = blogPostsData.filter((post) => {
    const title = (language === 'ar' ? post.titleAr : post.titleEn).toLowerCase();
    const excerpt = (language === 'ar' ? post.excerptAr : post.excerptEn).toLowerCase();
    return title.includes(search.toLowerCase()) || excerpt.includes(search.toLowerCase());
  });

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <button
          onClick={() => setSelectedPost(null)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all"
        >
          {language === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{language === 'ar' ? 'العودة لجميع المقالات' : 'Back to All Articles'}</span>
        </button>

        <article className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-10 space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-indigo-400 font-semibold">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              {selectedPost.category}
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              {selectedPost.date}
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {selectedPost.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            {language === 'ar' ? selectedPost.titleAr : selectedPost.titleEn}
          </h1>

          <div className="flex items-center gap-3 pt-2 pb-4 border-b border-slate-800">
            <img
              src={selectedPost.author.avatar}
              alt={selectedPost.author.name}
              className="w-10 h-10 rounded-full object-cover border border-indigo-500/30"
            />
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">{selectedPost.author.name}</div>
              <div className="text-[11px] text-slate-400">{selectedPost.author.role}</div>
            </div>
          </div>

          <img
            src={selectedPost.image}
            alt={selectedPost.titleEn}
            className="w-full h-64 sm:h-96 object-cover rounded-2xl border border-slate-800 shadow-xl"
          />

          <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-4 pt-4">
            {language === 'ar' ? selectedPost.contentAr : selectedPost.contentEn}
          </div>

          <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {selectedPost.tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-[10px] font-medium flex items-center gap-1">
                  <Tag className="w-3 h-3 text-indigo-400" />
                  <span>#{tag}</span>
                </span>
              ))}
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert(language === 'ar' ? 'تم نسخ رابط المقال!' : 'Article link copied!');
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all text-xs flex items-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'مشاركة' : 'Share'}</span>
            </button>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          <span>{language === 'ar' ? 'مدونة الذكاء الاصطناعي وإنتاجية الأعمال' : 'AI & Productivity SaaS Blog'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white">
          {language === 'ar' ? 'أحدث المقالات والاستراتيجيات' : 'Insights & Strategies for Digital Creators'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {language === 'ar'
            ? 'مقالات متخصصة في أتمتة الأعمال، أسرار تحسين SEO، واستغلال الذكاء الاصطناعي لزيادة الأرباح.'
            : 'Deep dives into AI workflows, SEO content scaling, and productivity hacks for entrepreneurs.'}
        </p>

        <div className="max-w-md mx-auto pt-2 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={language === 'ar' ? 'ابحث عن عنوان المقال...' : 'Search articles by keyword...'}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 placeholder-slate-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="group rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 shadow-xl overflow-hidden cursor-pointer transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                  {post.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-white text-lg group-hover:text-indigo-300 transition-colors leading-snug">
                  {language === 'ar' ? post.titleAr : post.titleEn}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {language === 'ar' ? post.excerptAr : post.excerptEn}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-[11px] font-semibold text-slate-300">{post.author.name}</span>
              </div>

              <span className="text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>{language === 'ar' ? 'اقرأ المزيد' : 'Read Article'}</span>
                <span>→</span>
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
