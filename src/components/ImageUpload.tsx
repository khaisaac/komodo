'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  name: string;
  initialImage?: string;
  label?: string;
}

export default function ImageUpload({ name, initialImage, label = "Upload Foto" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const [base64, setBase64] = useState<string | null>(initialImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1024;
        const MAX_HEIGHT = 1024;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8); // Compress to 80% quality JPEG
          setPreview(dataUrl);
          setBase64(dataUrl);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImage(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setBase64(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
      
      {/* Hidden input to hold the base64 string for the form submission */}
      <input type="hidden" name={name} value={base64 || ''} />

      {preview ? (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-50 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={handleRemove}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" /> Hapus Foto
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-500">
            <UploadCloud className="w-10 h-10 mb-3 text-slate-400" />
            <p className="mb-2 text-sm font-semibold">Klik untuk memilih foto</p>
            <p className="text-xs">PNG, JPG, atau JPEG (Otomatis Kompres)</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}
