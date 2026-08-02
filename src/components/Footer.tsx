import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Shield, Heart, Github, Twitter, Mail } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  const { language } = useLanguage();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white text-base">AI Business Toolkit</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              {language === 'ar'
                ? 'منصة شاملة تجمع 35+ أداة إنتاجية وتوليد محتوى بالذكاء الاصطناعي مع دعم كامل للغة العربية.'
                : 'All-in-one SaaS platform featuring 35+ instant AI generators, image studio, and developer utilities.'}
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-white text-xs uppercase tracking-wider">{language === 'ar' ? 'التصنيفات' : 'Categories'}</div>
            <ul className="space-y-1 text-[11px]">
              <li><button onClick={() => onNavigateTab('tools')} className="hover:text-indigo-400 transition-colors">{language === 'ar' ? 'أدوات الذكاء الاصطناعي' : 'AI Content Generators'}</button></li>
              <li><button onClick={() => onNavigateTab('tools')} className="hover:text-indigo-400 transition-colors">{language === 'ar' ? 'استوديو الصور 4K' : 'Image Studio & Background Remover'}</button></li>
              <li><button onClick={() => onNavigateTab('tools')} className="hover:text-indigo-400 transition-colors">{language === 'ar' ? 'أدوات المطورين JSON' : 'Developer & JSON Utilities'}</button></li>
              <li><button onClick={() => onNavigateTab('tools')} className="hover:text-indigo-400 transition-colors">{language === 'ar' ? 'أدوات QR والتنسيق' : 'QR & Code Generators'}</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-white text-xs uppercase tracking-wider">{language === 'ar' ? 'روابط سريعة' : 'Quick Navigation'}</div>
            <ul className="space-y-1 text-[11px]">
              <li><button onClick={() => onNavigateTab('home')} className="hover:text-indigo-400 transition-colors">{language === 'ar' ? 'الرئيسية' : 'Home'}</button></li>
              <li><button onClick={() => onNavigateTab('pricing')} className="hover:text-indigo-400 transition-colors">{language === 'ar' ? 'الأسعار والخطط' : 'Pricing Plans'}</button></li>
              <li><button onClick={() => onNavigateTab('blog')} className="hover:text-indigo-400 transition-colors">{language === 'ar' ? 'المدونة والتعليمات' : 'Blog Articles'}</button></li>
              <li><button onClick={() => onNavigateTab('dashboard')} className="hover:text-indigo-400 transition-colors">{language === 'ar' ? 'لوحة التحكم' : 'User Dashboard'}</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-white text-xs uppercase tracking-wider">{language === 'ar' ? 'الأمان والخصوصية' : 'Trust & Compliance'}</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {language === 'ar'
                ? 'جميع أدوات المعالجة تعمل بتشفير 256-bit SSL آمن، ولا يتم مشاركة بياناتك مع أي طرف ثالث.'
                : 'Protected with enterprise-grade SSL encryption. Powered by Gemini 3.6 Flash.'}
            </p>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 AI Business Toolkit Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">{language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">{language === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
