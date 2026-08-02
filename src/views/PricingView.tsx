import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Check, Zap, Crown, Shield, HelpCircle, Sparkles, Star } from 'lucide-react';
import { StripeModal } from '../StripeModal';

export const PricingView: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();

  const [isAnnual, setIsAnnual] = useState(true);
  const [stripePlan, setStripePlan] = useState<{ name: string; price: string } | null>(null);

  const plans = [
    {
      id: 'free',
      nameEn: 'Free Starter',
      nameAr: 'المجاني للمبتدئين',
      priceMonthly: '$0',
      priceAnnual: '$0',
      credits: '15 Credits / Month',
      creditsAr: '15 رصيد / شهرياً',
      descEn: 'Perfect for testing utility tools and casual AI content generation.',
      descAr: 'مثالي لتجربة الأدوات العامة والتوليد المحدود للذكاء الاصطناعي.',
      isPopular: false,
      featuresEn: [
        'Access to 20+ Utility & Developer Tools',
        'Basic AI Content Generation',
        'Text & Code Exporters',
        'Standard Processing Speed',
        'Community Support'
      ],
      featuresAr: [
        'وصول لأكثر من 20 أداة عامة وللمطورين',
        'توليد محتوى بالذكاء الاصطناعي الأساسي',
        'تصدير النصوص والأكواد',
        'سرعة معالجة قياسية',
        'دعم مجتمعي عبر المنتدى'
      ]
    },
    {
      id: 'pro',
      nameEn: 'Pro Entrepreneur',
      nameAr: 'احترافي رواد الأعمال',
      priceMonthly: '$19',
      priceAnnual: '$15',
      credits: '500 Credits / Month',
      creditsAr: '500 رصيد / شهرياً',
      descEn: 'Designed for marketers, freelancers, and growing small businesses.',
      descAr: 'مصمم للمسوقين، المستقلين، والشركات الناشئة لزيادة الإنتاجية.',
      isPopular: true,
      featuresEn: [
        'Full Access to ALL 35+ AI & Utility Tools',
        'Gemini 3.6 Flash Unlimited High Speed',
        'Image Background Remover & 4X Upscaler',
        'Saved Files Vault & Generation History',
        'Priority Customer Support 24/7',
        'Export Supabase SQL & Custom Webhooks'
      ],
      featuresAr: [
        'وصول كامل لجميع الـ 35 أداة ذكية وعامة',
        'سرعة فائقة مع محرك Gemini 3.6 Flash',
        'إزالة خلفية الصور وتكبير الجودة 4X',
        'حفظ أرشفة الملفات وسجل العمليات',
        'دعم فني أولوية على مدار الساعة',
        'تصدير كود SQL وقواعد البيانات'
      ]
    },
    {
      id: 'enterprise',
      nameEn: 'Agency & Team',
      nameAr: 'الشركات والفرق',
      priceMonthly: '$49',
      priceAnnual: '$39',
      credits: 'Unlimited Credits',
      creditsAr: 'رصيد لا محدود',
      descEn: 'For marketing agencies, multi-member teams, and high-volume automation.',
      descAr: 'لوكالات التسويق، الفرق المتعددة، وللعمليات الضخمة.',
      isPopular: false,
      featuresEn: [
        'Everything in Pro Plan',
        'Unlimited AI Generation & Images',
        'Dedicated API Key Access',
        'Custom Webhook Integrations',
        'Multi-User Team Collaboration',
        '1-on-1 Onboarding Specialist'
      ],
      featuresAr: [
        'كل مميزات الباقة الاحترافية',
        'توليد لا محدود للمقالات والصور',
        'مفتاح API مخصص للربط البرمجي',
        'ربط الـ Webhooks والتطبيقات',
        'عمل جماعي لعدة مستخدمين',
        'مدير حساب مخصص للتدريب'
      ]
    }
  ];

  const faqs = [
    {
      qEn: 'How do AI Credits work?',
      qAr: 'كيف تعمل أرصدة الذكاء الاصطناعي؟',
      aEn: 'Each AI generation (blog post, marketing copy, chat prompt) uses 1 credit. Utility tools like QR generators, password tools, and JSON formatters are completely free and do not consume credits.',
      aAr: 'كل عملية توليد بالذكاء الاصطناعي تستهلك 1 رصيد. الأدوات العامة مثل مولد الباركود ومعدل JSON مجانية تماماً ولا تستهلك من الرصيد.'
    },
    {
      qEn: 'Can I cancel or upgrade my plan anytime?',
      qAr: 'هل يمكنني إلغاء أو تغيير الباقة في أي وقت؟',
      aEn: 'Yes! You can upgrade, downgrade, or cancel your subscription at any time directly from your user dashboard with one click.',
      aAr: 'نعم! يمكنك الترقية، الإلغاء، أو تعديل خطتك في أي وقت بنقرة واحدة من لوحة التحكم.'
    },
    {
      qEn: 'Are payments handled securely?',
      qAr: 'هل المدفوعات آمنة ومحمية؟',
      aEn: 'All payments are processed with bank-grade 256-bit SSL encryption via Stripe with full support for Visa, Mastercard, Apple Pay, and Google Pay.',
      aAr: 'جميع المعاملات المالية مشفرة ومعالجة بواسطة Stripe بدعم لبطاقات فيزا، ماستركارد، وأبل باي.'
    }
  ];

  return (
    <div className="space-y-16 pb-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Crown className="w-4 h-4 text-amber-400" />
          <span>{language === 'ar' ? 'خطط أسعار مرنة وشفافة' : 'Simple, Transparent Pricing'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          {language === 'ar' ? 'استثمر في إنتاجية عملك اليوم' : 'Choose the Perfect Plan for Your Business'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          {language === 'ar' ? 'اختر الخطة المناسبة لاحتياجاتك واستمتع بجميع أدوات الذكاء الاصطناعي بدون تكاليف خفية.' : 'Get instant access to 35+ tools. Cancel or switch plans anytime.'}
        </p>

        {/* Monthly / Annual Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-bold ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>
            {language === 'ar' ? 'شهري' : 'Monthly'}
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-8 rounded-full bg-slate-800 p-1 border border-slate-700 flex items-center transition-all"
          >
            <div
              className={`w-6 h-6 rounded-full bg-indigo-600 shadow-md transition-transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-bold ${isAnnual ? 'text-white' : 'text-slate-400'}`}>
              {language === 'ar' ? 'سنوي' : 'Annual'}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold">
              {language === 'ar' ? 'خصم 20%' : 'Save 20%'}
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {plans.map((plan) => {
          const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;
          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                plan.isPopular
                  ? 'bg-slate-900 border-2 border-indigo-500 shadow-2xl shadow-indigo-600/20 scale-105 z-10'
                  : 'bg-slate-900/80 border border-slate-800'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                  {language === 'ar' ? 'الأكثر شعبية' : 'Most Popular Choice'}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {language === 'ar' ? plan.nameAr : plan.nameEn}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 min-h-[36px]">
                    {language === 'ar' ? plan.descAr : plan.descEn}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">{price}</span>
                  <span className="text-xs text-slate-400 font-medium">
                    / {language === 'ar' ? 'شهر' : 'month'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-semibold text-indigo-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>{language === 'ar' ? plan.creditsAr : plan.credits}</span>
                </div>

                <ul className="space-y-3 pt-2 text-xs">
                  {(language === 'ar' ? plan.featuresAr : plan.featuresEn).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() =>
                    setStripePlan({
                      name: language === 'ar' ? plan.nameAr : plan.nameEn,
                      price: price
                    })
                  }
                  className={`w-full py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>{language === 'ar' ? 'اشترك الآن' : 'Subscribe Now'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            <span>{language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}</span>
          </h2>
          <p className="text-xs text-slate-400">
            {language === 'ar' ? 'إليك إجابات لأبرز الاستفسارات المتعلقة بالاشتراك والاستخدام' : 'Everything you need to know about plans and features.'}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white text-sm">
                {language === 'ar' ? faq.qAr : faq.qEn}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'ar' ? faq.aAr : faq.aEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stripe Modal Integration */}
      {stripePlan && (
        <StripeModal
          planName={stripePlan.name}
          planPrice={stripePlan.price}
          onClose={() => setStripePlan(null)}
        />
      )}

    </div>
  );
};
