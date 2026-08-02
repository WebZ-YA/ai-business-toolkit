import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Role, Coupon, SupportTicket } from '../../types';
import {
  Shield,
  Users,
  DollarSign,
  Zap,
  TrendingUp,
  Tag,
  MessageSquare,
  Activity,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Search,
  Check
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const { language } = useLanguage();
  const { role } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'coupons' | 'tickets'>('overview');

  // Sample Admin SaaS Metrics
  const stats = {
    mrr: '$14,250',
    totalUsers: 3480,
    activeSubscribers: 612,
    totalExecutions: 148900,
    aiCreditsConsumed: 482000,
    growthRate: '+18.4%'
  };

  // Sample Coupon List
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: 'c-1',
      code: 'SUMMER2026',
      discount: 25,
      type: 'percentage',
      validUntil: '2026-08-31',
      uses: 142,
      maxUses: 500,
      active: true
    },
    {
      id: 'c-2',
      code: 'VIPPRO50',
      discount: 50,
      type: 'percentage',
      validUntil: '2026-12-31',
      uses: 89,
      maxUses: 100,
      active: true
    }
  ]);

  const [newCouponCode, setNewCouponCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('20');

  // Sample Tickets
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 't-101',
      userId: 'usr-882',
      userName: 'Sami Mansour',
      userEmail: 'sami@agency.com',
      subject: 'Background remover image resolution question',
      message: 'Does the PNG export maintain 4K resolution on transparent outputs?',
      status: 'open',
      createdAt: '2026-07-31 09:12'
    },
    {
      id: 't-102',
      userId: 'usr-904',
      userName: 'Laura Croft',
      userEmail: 'laura@design.io',
      subject: 'Custom Webhook integration for Supabase',
      message: 'Can I send the generated JSON formatting payload directly to a custom API URL?',
      status: 'resolved',
      createdAt: '2026-07-30 16:45'
    }
  ]);

  if (role !== 'admin') {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <Shield className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-white">Access Denied (المسؤول فقط)</h2>
        <p className="text-xs text-slate-400">
          This panel is restricted to system administrators. Switch role to Admin in Navbar to test.
        </p>
      </div>
    );
  }

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    const coupon: Coupon = {
      id: `c-${Date.now()}`,
      code: newCouponCode.toUpperCase().trim(),
      discount: Number(newDiscount) || 10,
      type: 'percentage',
      validUntil: '2026-12-31',
      uses: 0,
      maxUses: 200,
      active: true
    };

    setCoupons([coupon, ...coupons]);
    setNewCouponCode('');
  };

  const handleToggleTicket = (id: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === 'open' ? 'resolved' : 'open' } : t
      )
    );
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-800/40 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">System Admin Control Center</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                Admin v2.5
              </span>
            </div>
            <p className="text-xs text-slate-400">Monitor SaaS revenue metrics, manage coupons, user roles, and support tickets.</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'overview'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Overview Stats</span>
        </button>

        <button
          onClick={() => setActiveTab('coupons')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'coupons'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
          }`}
        >
          <Tag className="w-3.5 h-3.5 text-amber-400" />
          <span>Discount Coupons</span>
        </button>

        <button
          onClick={() => setActiveTab('tickets')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'tickets'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span>Support Tickets ({tickets.filter((t) => t.status === 'open').length})</span>
        </button>
      </div>

      {/* Tab 1: Executive KPI Metrics Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 font-medium">Monthly Recurring Revenue</div>
              <div className="text-2xl font-black text-emerald-400">{stats.mrr}</div>
              <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <span>{stats.growthRate}</span> vs last month
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 font-medium">Total Registered Users</div>
              <div className="text-2xl font-black text-white">{stats.totalUsers.toLocaleString()}</div>
              <div className="text-[10px] text-indigo-400 font-bold">{stats.activeSubscribers} Active Pro/Enterprise</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 font-medium">Total Executions</div>
              <div className="text-2xl font-black text-purple-400">{stats.totalExecutions.toLocaleString()}</div>
              <div className="text-[10px] text-slate-500">Across 35+ tools</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 font-medium">Gemini AI Credits Consumed</div>
              <div className="text-2xl font-black text-amber-400">{stats.aiCreditsConsumed.toLocaleString()}</div>
              <div className="text-[10px] text-slate-500">High efficiency rate</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <span>Realtime System Infrastructure Health</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">Gemini 3.6 Flash API</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Operational
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">Image Canvas Engine</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Operational
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">Stripe Billing Webhooks</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Operational
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Coupons */}
      {activeTab === 'coupons' && (
        <div className="space-y-6">
          <form onSubmit={handleAddCoupon} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={newCouponCode}
              onChange={(e) => setNewCouponCode(e.target.value)}
              placeholder="e.g. SUMMERPRO2026"
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs uppercase font-mono"
            />
            <input
              type="number"
              value={newDiscount}
              onChange={(e) => setNewDiscount(e.target.value)}
              placeholder="Discount %"
              className="w-28 px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Coupon</span>
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coupons.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-mono font-bold text-amber-400 text-sm">{c.code}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    {c.discount}% OFF • {c.uses} / {c.maxUses} used • Exp: {c.validUntil}
                  </div>
                </div>

                <button
                  onClick={() => setCoupons(coupons.filter((x) => x.id !== c.id))}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-red-950/40 text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Tickets */}
      {activeTab === 'tickets' && (
        <div className="space-y-4">
          {tickets.map((t) => (
            <div key={t.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{t.userName}</span>
                  <span className="text-slate-500">({t.userEmail})</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] capitalize ${
                  t.status === 'open' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {t.status}
                </span>
              </div>

              <div className="font-semibold text-slate-200">{t.subject}</div>
              <p className="p-3 rounded-xl bg-slate-950 text-slate-300 leading-relaxed">{t.message}</p>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-500">{t.createdAt}</span>
                <button
                  onClick={() => handleToggleTicket(t.id)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 font-semibold text-xs flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Mark as {t.status === 'open' ? 'Resolved' : 'Open'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
