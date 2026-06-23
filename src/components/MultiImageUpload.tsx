'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, X } from 'lucide-react';

interface MultiImageUploadProps {
  name: string;
  initialImages?: string[];
  label?: string;
  maxImages?: number;
}

export default function MultiImageUpload({ name, initialImages = [], label = "Upload Foto Galeri (Maksimal 5)", maxImages = 5 }: MultiImageUploadProps) {
  const [images, setImages] = useState<string[]>(initialImages);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
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
            resolve(canvas.toDataURL('image/jpeg', 0.8));
          } else {
            resolve(e.target?.result as string);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const remainingSlots = maxImages - images.length;
      const filesToProcess = newFiles.slice(0, remainingSlots);

      const processedBase64 = await Promise.all(filesToProcess.map(processImage));
      setImages(prev => [...prev, ...processedBase64]);

      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // reset so same file can be selected again
      }
    }
  };

  const handleRemove = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-slate-700 mb-2">{label} {images.length}/{maxImages}</label>
      
      {/* Hidden input to hold the JSON string array for form submission */}
      <input type="hidden" name={name} value={JSON.stringify(images)} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                title="Hapus"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {images.length < maxImages && (
          <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="flex flex-col items-center justify-center p-4 text-center text-slate-500">
              <UploadCloud className="w-6 h-6 mb-2 text-slate-400" />
              <p className="text-xs font-semibold">Tambah</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
    </div>
  );
}
