import React from 'react';
import { Tool } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { X, Heart, Star, Share2, Sparkles, Zap, Shield, HelpCircle } from 'lucide-react';

import { AiToolRenderer } from './tools/AiToolRenderer';
import { BackgroundRemoverTool } from './tools/BackgroundRemoverTool';
import { ImageUpscalerTool } from './tools/ImageUpscalerTool';
import { ImageCompressorTool } from './tools/ImageCompressorTool';
import { QrGeneratorTool } from './tools/QrGeneratorTool';
import { BarcodeGeneratorTool } from './tools/BarcodeGeneratorTool';
import { ColorPaletteTool } from './tools/ColorPaletteTool';
import { GradientGeneratorTool } from './tools/GradientGeneratorTool';
import { JsonFormatterTool } from './tools/JsonFormatterTool';
import { Base64Tool } from './tools/Base64Tool';
import { MarkdownEditorTool } from './tools/MarkdownEditorTool';
import { WordCounterTool } from './tools/WordCounterTool';
import { PasswordGeneratorTool } from './tools/PasswordGeneratorTool';
import { UuidGeneratorTool } from './tools/UuidGeneratorTool';
import { LoremIpsumTool } from './tools/LoremIpsumTool';
import { TextCompareTool } from './tools/TextCompareTool';
import { CaseConverterTool } from './tools/CaseConverterTool';
import { AdSenseBanner } from './AdSenseBanner';

interface ToolRunnerModalProps {
  tool: Tool | null;
  onClose: () => void;
}

export const ToolRunnerModal: React.FC<ToolRunnerModalProps> = ({ tool, onClose }) => {
  const { language, isRtl } = useLanguage();
  const { isFavorite, toggleFavorite } = useAuth();

  if (!tool) return null;

  const toolName = language === 'ar' ? tool.nameAr : tool.nameEn;
  const toolDesc = language === 'ar' ? tool.descriptionAr : tool.descriptionEn;
  const isFav = isFavorite(tool.id);

  const renderToolBody = () => {
    switch (tool.id) {
      case 'remove-background':
        return <BackgroundRemoverTool />;
      case 'image-upscaler':
        return <ImageUpscalerTool />;
      case 'image-compressor':
        return <ImageCompressorTool />;
      case 'qr-code-generator':
        return <QrGeneratorTool />;
      case 'barcode-generator':
        return <BarcodeGeneratorTool />;
      case 'color-palette-generator':
        return <ColorPaletteTool />;
      case 'gradient-generator':
        return <GradientGeneratorTool />;
      case 'json-formatter':
        return <JsonFormatterTool />;
      case 'base64-encoder':
      case 'base64-decoder':
        return <Base64Tool defaultTab={tool.id === 'base64-decoder' ? 'decode' : 'encode'} />;
      case 'markdown-editor':
        return <MarkdownEditorTool />;
      case 'word-counter':
        return <WordCounterTool />;
      case 'password-generator':
        return <PasswordGeneratorTool />;
      case 'uuid-generator':
        return <UuidGeneratorTool />;
      case 'lorem-ipsum-generator':
        return <LoremIpsumTool />;
      case 'text-compare':
        return <TextCompareTool />;
      case 'case-converter':
        return <CaseConverterTool />;
      default:
        // Default to AI Tool Renderer for AI writing / AI marketing / chat tools
        return <AiToolRenderer tool={tool} />;
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: toolName,
        text: toolDesc,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(language === 'ar' ? 'تم نسخ رابط الأداة!' : 'Tool URL copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Modal Bar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base sm:text-lg text-white truncate">{toolName}</h2>
                {tool.isAi && (
                  <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-extrabold uppercase tracking-wide shrink-0">
                    AI Gemini
                  </span>
                )}
                {tool.isPro && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold shrink-0">
                    Pro
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 truncate">{toolDesc}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => toggleFavorite(tool.id)}
              className={`p-2 rounded-xl border transition-all ${
                isFav
                  ? 'bg-pink-950/40 text-pink-400 border-pink-800/50'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700'
              }`}
              title={isFav ? 'Remove Favorite' : 'Add Favorite'}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-pink-400' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
              title="Share Tool"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content Container */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {renderToolBody()}

          {/* AdSense Banner Placement inside tool view */}
          <AdSenseBanner slot="tool-runner-bottom" format="horizontal" />
        </div>

        {/* Footer info bar inside Modal */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'ar' ? 'بياناتك مشفرة ومحفوظة آلياً' : 'Encrypted & Secure Session'}</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{tool.usageCount.toLocaleString()} {language === 'ar' ? 'عملية تنفيذ' : 'executions'}</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white underline font-medium"
          >
            {language === 'ar' ? 'إغلاق الأداة' : 'Close Tool'}
          </button>
        </div>

      </div>
    </div>
  );
};
