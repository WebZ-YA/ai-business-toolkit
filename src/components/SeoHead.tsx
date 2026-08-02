import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface SeoHeadProps {
  activeTab: string;
}

export const SeoHead: React.FC<SeoHeadProps> = ({ activeTab }) => {
  const { language } = useLanguage();

  useEffect(() => {
    let title = 'AI Business Toolkit - 35+ Instant AI & Productivity Tools';

    if (activeTab === 'tools') {
      title = language === 'ar' ? 'مكتبة الأدوات (35+ أداة ذكية) | AI Business Toolkit' : 'Tools Library (35+ AI Tools) | AI Business Toolkit';
    } else if (activeTab === 'pricing') {
      title = language === 'ar' ? 'خطط الأسعار والاشتراكات | AI Business Toolkit' : 'Pricing & Plans | AI Business Toolkit';
    } else if (activeTab === 'blog') {
      title = language === 'ar' ? 'مدونة الذكاء الاصطناعي والأتمتة | AI Business Toolkit' : 'AI & SaaS Blog | AI Business Toolkit';
    } else if (activeTab === 'dashboard') {
      title = language === 'ar' ? 'لوحة تحكم المستخدم | AI Business Toolkit' : 'User Dashboard | AI Business Toolkit';
    } else if (activeTab === 'admin') {
      title = language === 'ar' ? 'مركز إدارة النظام | AI Business Toolkit' : 'Admin Control Center | AI Business Toolkit';
    }

    document.title = title;
  }, [activeTab, language]);

  return null;
};
