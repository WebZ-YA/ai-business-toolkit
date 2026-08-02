import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Upload, Minimize2, Download, RefreshCw } from 'lucide-react';

export const ImageCompressorTool: React.FC = () => {
  const { language } = useLanguage();
  const { addSavedFile, addHistoryItem } = useAuth();

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [compressedSrc, setCompressedSrc] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (evt) => {
        setImageSrc(evt.target?.result as string);
        setCompressedSrc(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const processCompress = () => {
    if (!imageSrc) return;
    setProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      setCompressedSrc(dataUrl);

      // Estimate compressed size in bytes
      const stringLength = dataUrl.length - 'data:image/jpeg;base64,'.length;
      const sizeInBytes = Math.round(stringLength * 0.75);
      setCompressedSize(sizeInBytes);
      setProcessing(false);

      addHistoryItem({
        toolId: 'image-compressor',
        toolName: 'Image Compressor',
        category: 'Image Tools',
        input: `Original size: ${(originalSize / 1024).toFixed(1)} KB`,
        output: `Compressed size: ${(sizeInBytes / 1024).toFixed(1)} KB`
      });
    };
    img.src = imageSrc;
  };

  const handleDownload = () => {
    if (!compressedSrc) return;
    const a = document.createElement('a');
    a.href = compressedSrc;
    a.download = 'compressed_image.jpg';
    a.click();

    addSavedFile({
      name: 'compressed_image.jpg',
      type: 'JPG Image',
      size: `${(compressedSize / 1024).toFixed(1)} KB`,
      toolId: 'image-compressor'
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
      <h3 className="font-bold text-white text-base flex items-center gap-2">
        <Minimize2 className="w-5 h-5 text-indigo-400" />
        <span>{language === 'ar' ? 'ضغط حجم الصور المباشر' : 'Smart Image Size Compressor'}</span>
      </h3>

      {!imageSrc ? (
        <label className="border-2 border-dashed border-slate-700 hover:border-indigo-500/80 rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer bg-slate-950/50 transition-all text-center">
          <Upload className="w-10 h-10 text-indigo-400 mb-3" />
          <span className="font-bold text-sm text-white">{language === 'ar' ? 'اختر صورة لضغط حجمها' : 'Select Image to Compress'}</span>
          <span className="text-xs text-slate-400 mt-1">Supports PNG, JPG, WebP</span>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Original ({(originalSize / 1024).toFixed(1)} KB)
              </span>
              <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
                <img src={imageSrc} alt="Original" className="max-h-full max-w-full object-contain" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Compressed {compressedSize > 0 && `(${(compressedSize / 1024).toFixed(1)} KB)`}
              </span>
              <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
                {compressedSrc ? (
                  <img src={compressedSrc} alt="Compressed" className="max-h-full max-w-full object-contain" />
                ) : (
                  <div className="text-slate-500 text-xs">Result will render here</div>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Compression Quality Ratio ({Math.round(quality * 100)}%)</span>
              <span className="font-bold text-indigo-400">
                {originalSize > 0 && compressedSize > 0
                  ? `Saved ${Math.round((1 - compressedSize / originalSize) * 100)}%`
                  : ''}
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.9"
              step="0.05"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={processCompress}
              disabled={processing}
              className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
            >
              {processing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Compressing...</span>
                </>
              ) : (
                <>
                  <Minimize2 className="w-4 h-4" />
                  <span>Compress Image</span>
                </>
              )}
            </button>

            {compressedSrc && (
              <button
                onClick={handleDownload}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Compressed JPG</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
