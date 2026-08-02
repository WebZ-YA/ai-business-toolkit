import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { toolsData } from '../../data/toolsData';
import { Tool } from '../../types';
import {
  User,
  Zap,
  Clock,
  FileText,
  Key,
  Copy,
  Check,
  Trash2,
  Download,
  Sparkles,
  Heart,
  Crown,
  Search,
  ExternalLink,
  Shield,
  LayoutDashboard
} from 'lucide-react';

interface DashboardViewProps {
  onSelectTool: (tool: Tool) => void;
  onNavigateTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onSelectTool, onNavigateTab }) => {
  const { language } = useLanguage();
  const { user, history, clearHistory, savedFiles, removeSavedFile, favorites, isFavorite, toggleFavorite } = useAuth();

  const [activeTab, setActiveTab] = useState<'favorites' | 'history' | 'files' | 'api'>('favorites');
  const [copiedKey, setCopiedKey] = useState(false);
  const [historyFilter, setHistoryFilter] = useState('');

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <User className="w-12 h-12 text-slate-600 mx-auto" />
        <h2 className="text-xl font-bold text-white">
          {language === 'ar' ? 'سجل الدخول لعرض لوحة التحكم' : 'Please Sign In to Access Your Dashboard'}
        </h2>
        <p className="text-xs text-slate-400">
          {language === 'ar' ? 'قم بتسجيل الدخول لتتبع الرصيد، حماية الملفات، وحفظ تاريخ الأدوات.' : 'Track your credit usage, saved files, history, and API keys.'}
        </p>
      </div>
    );
  }

  const favoriteTools = toolsData.filter((t) => favorites.includes(t.id));

  const filteredHistory = history.filter((item) =>
    item.toolName.toLowerCase().includes(historyFilter.toLowerCase()) ||
    item.input.toLowerCase().includes(historyFilter.toLowerCase()) ||
    item.output.toLowerCase().includes(historyFilter.toLowerCase())
  );

  const handleCopyApiKey = () => {
    if (user.apiKey) {
      navigator.clipboard.writeText(user.apiKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const creditPercentage = Math.min(100, Math.round((user.creditsUsed / user.creditsLimit) * 100));

  return (
    <div className="space-y-8 pb-12">
      
      {/* Profile Overview Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-xl shrink-0"
          />
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white truncate">{user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold uppercase shrink-0">
                {user.plan}
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate">{user.email}</p>
            <p className="text-[10px] text-slate-500">
              {language === 'ar' ? 'عضو منذ:' : 'Member since:'} {user.createdAt}
            </p>
          </div>
        </div>

        {/* Credit Usage Progress Meter */}
        <div className="w-full lg:w-80 bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{language === 'ar' ? 'رصيد الذكاء الاصطناعي' : 'AI Credits Usage'}</span>
            </span>
            <span className="text-indigo-400">
              {user.creditsUsed} / {user.creditsLimit}
            </span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${creditPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
            <span>{creditPercentage}% {language === 'ar' ? 'مستخلاص' : 'consumed'}</span>
            <button
              onClick={() => onNavigateTab('pricing')}
              className="text-indigo-400 hover:text-indigo-300 font-semibold underline"
            >
              {language === 'ar' ? 'زيادة الرصيد' : 'Upgrade Credits'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'favorites'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-pink-400" />
          <span>{language === 'ar' ? 'الأدوات المفضلة' : 'Favorite Tools'} ({favorites.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'history'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'سجل العمليات' : 'Generation History'} ({history.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('files')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'files'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'الملفات المحفوظة' : 'Saved Files Vault'} ({savedFiles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('api')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'api'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
          }`}
        >
          <Key className="w-3.5 h-3.5 text-amber-400" />
          <span>{language === 'ar' ? 'مفاتيح API' : 'API Management'}</span>
        </button>
      </div>

      {/* Tab 1: Favorites */}
      {activeTab === 'favorites' && (
        <div className="space-y-4">
          {favoriteTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteTools.map((tool) => (
                <div
                  key={tool.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 shadow-xl transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <button
                        onClick={() => toggleFavorite(tool.id)}
                        className="p-1 rounded-lg text-pink-500 hover:bg-slate-800"
                      >
                        <Heart className="w-4 h-4 fill-pink-500" />
                      </button>
                    </div>
                    <h3 className="font-bold text-white text-sm">
                      {language === 'ar' ? tool.nameAr : tool.nameEn}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {language === 'ar' ? tool.descriptionAr : tool.descriptionEn}
                    </p>
                  </div>

                  <button
                    onClick={() => onSelectTool(tool)}
                    className="mt-4 w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all"
                  >
                    {language === 'ar' ? 'تشغيل الأداة' : 'Launch Tool'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-2">
              <Heart className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400">
                {language === 'ar' ? 'لم تقم بفيضلة أي أدوات بعد.' : 'No favorite tools saved yet.'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Generation History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={historyFilter}
                onChange={(e) => setHistoryFilter(e.target.value)}
                placeholder={language === 'ar' ? 'تصفية في السجل...' : 'Search history logs...'}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="px-3 py-2 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-xs font-semibold hover:bg-red-900/50 transition-all flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'مسح السجل بالكامل' : 'Clear History'}</span>
              </button>
            )}
          </div>

          {filteredHistory.length > 0 ? (
            <div className="space-y-3">
              {filteredHistory.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span className="font-bold text-indigo-400">{item.toolName}</span>
                    <span>{item.timestamp}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 text-slate-300 font-mono text-[11px] truncate">
                    <span className="text-slate-500">Input:</span> {item.input}
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-slate-200 whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
                    {item.output}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-slate-900 border border-slate-800 rounded-3xl text-xs text-slate-400">
              {language === 'ar' ? 'سجل التوليد فارغ حالياً' : 'No history logs available.'}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Saved Files Vault */}
      {activeTab === 'files' && (
        <div className="space-y-4">
          {savedFiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedFiles.map((file) => (
                <div key={file.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-white truncate">{file.name}</div>
                      <div className="text-[10px] text-slate-400">{file.type} • {file.size} • {file.createdAt}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => alert(`Downloading ${file.name}`)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeSavedFile(file.id)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-red-950/40 text-red-400"
                      title="Delete File"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-slate-900 border border-slate-800 rounded-3xl text-xs text-slate-400">
              {language === 'ar' ? 'لم تقم بحفظ أي ملفات بعد' : 'Vault is empty.'}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: API Key */}
      {activeTab === 'api' && (
        <div className="max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">API Secret Key</h3>
              <p className="text-xs text-slate-400">Use this key to trigger tool executions via REST API endpoints.</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2">
            <code className="text-xs font-mono text-emerald-400 truncate">{user.apiKey || 'sk_toolkit_live_sample'}</code>
            <button
              onClick={handleCopyApiKey}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1 shrink-0"
            >
              {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey ? 'Copied' : 'Copy Key'}</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
