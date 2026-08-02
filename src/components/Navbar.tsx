import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Search,
  Globe,
  User,
  Shield,
  Database,
  Crown,
  Zap,
  Menu,
  X,
  Heart,
  LogOut,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenSearch }) => {
  const { language, setLanguage, isRtl, t } = useLanguage();
  const { user, role, setRole, login, logout, favorites, setShowSqlModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', labelEn: 'Home', labelAr: 'الرئيسية' },
    { id: 'tools', labelEn: 'Tools Library', labelAr: 'الأدوات (35+)' },
    { id: 'pricing', labelEn: 'Pricing', labelAr: 'الأسعار والخطط' },
    { id: 'blog', labelEn: 'Blog', labelAr: 'المدونة' },
    { id: 'dashboard', labelEn: 'Dashboard', labelAr: 'لوحة التحكم' },
    ...(role === 'admin' ? [{ id: 'admin', labelEn: 'Admin Control', labelAr: 'مركز الإدارة' }] : [])
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="font-black text-white text-base tracking-tight leading-none group-hover:text-indigo-300 transition-colors">
                AI Business Toolkit
              </div>
              <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                35+ Instant AI & SaaS Tools
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === item.id
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                {language === 'ar' ? item.labelAr : item.labelEn}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Actions (Search, Language, Supabase Schema, Auth) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center gap-2 transition-all"
            title="Search Tools (Ctrl+K)"
          >
            <Search className="w-4 h-4 text-indigo-400" />
            <span className="hidden lg:inline text-slate-400">{t.searchPlaceholder}</span>
            <kbd className="hidden lg:inline px-1.5 py-0.5 text-[10px] bg-slate-950 border border-slate-800 text-slate-500 rounded font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Supabase Schema Modal Launcher */}
          <button
            onClick={() => setShowSqlModal(true)}
            className="hidden sm:flex p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800 text-xs font-bold items-center gap-1.5 transition-all"
            title="Export PostgreSQL / Supabase Schema SQL"
          >
            <Database className="w-4 h-4" />
            <span className="hidden md:inline">Supabase SQL</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold flex items-center gap-1.5 transition-all"
            title="Switch Language / تغيير اللغة"
          >
            <Globe className="w-4 h-4 text-purple-400" />
            <span className="uppercase text-[11px] font-extrabold">{language === 'ar' ? 'English' : 'عربي'}</span>
          </button>

          {/* User Account / Role Selector */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pl-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-xl object-cover border border-indigo-500/30"
                />
                <span className="hidden sm:inline text-xs font-bold text-white max-w-[100px] truncate">{user.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 space-y-3">
                  <div className="p-2.5 rounded-xl bg-slate-950 space-y-1">
                    <div className="font-bold text-white text-xs">{user.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
                    <div className="flex items-center justify-between text-[10px] pt-1">
                      <span className="text-indigo-400 font-bold">{user.plan} Plan</span>
                      <span className="text-amber-400 font-semibold">{user.creditsUsed}/{user.creditsLimit} Credits</span>
                    </div>
                  </div>

                  {/* Role Switcher Demo */}
                  <div className="space-y-1">
                    <div className="text-[10px] text-slate-400 font-bold px-1">Switch User Role (Demo):</div>
                    <div className="grid grid-cols-2 gap-1 text-[11px]">
                      <button
                        onClick={() => { setRole('pro'); setUserDropdownOpen(false); }}
                        className={`p-1.5 rounded-lg border font-semibold ${role === 'pro' ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                      >
                        Pro User
                      </button>
                      <button
                        onClick={() => { setRole('admin'); setUserDropdownOpen(false); }}
                        className={`p-1.5 rounded-lg border font-semibold ${role === 'admin' ? 'bg-purple-600/30 border-purple-500 text-purple-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                      >
                        Admin
                      </button>
                    </div>
                  </div>

                  <div className="pt-1 border-t border-slate-800/80 space-y-1">
                    <button
                      onClick={() => { setActiveTab('dashboard'); setUserDropdownOpen(false); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-800 text-xs text-slate-200 font-semibold flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-indigo-400" />
                      <span>{t.dashboard}</span>
                    </button>

                    <button
                      onClick={() => { logout(); setUserDropdownOpen(false); }}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-800 text-xs text-red-400 font-semibold flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t.signOut}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={login}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all"
            >
              {t.signIn}
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === item.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {language === 'ar' ? item.labelAr : item.labelEn}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
