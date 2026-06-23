'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createDestination, updateDestination } from '@/app/actions/destination';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

import ImageUpload from '@/components/ImageUpload';

interface DestinationFormProps {
  destination?: {
    id: string;
    name: string;
    description: string;
    image: string;
  };
}

export default function DestinationForm({ destination }: DestinationFormProps) {
  const [loading, setLoading] = useState(false);
  const isEditing = !!destination;

  return (
    <div className="max-w-3xl">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/destinations" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{isEditing ? 'Edit Destinasi' : 'Tambah Destinasi'}</h1>
          <p className="text-slate-500 mt-1">{isEditing ? 'Perbarui data destinasi.' : 'Buat destinasi baru untuk trip Anda.'}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <form 
          action={async (formData) => {
            setLoading(true);
            if (isEditing) {
              await updateDestination(destination.id, formData);
            } else {
              await createDestination(formData);
            }
          }} 
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Destinasi *</label>
            <input type="text" name="name" defaultValue={destination?.name} required placeholder="Misal: Komodo National Park" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
          </div>

          <div>
            <ImageUpload 
              name="image" 
              label="Foto Destinasi" 
              initialImage={destination?.image} 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi (Opsional)</label>
            <textarea name="description" defaultValue={destination?.description} rows={4} placeholder="Jelaskan secara singkat tentang destinasi ini..." className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"></textarea>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" disabled={loading} className="bg-[#0A1F44] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#112a5c] transition-colors flex items-center gap-2 disabled:opacity-70">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              <span>Simpan Destinasi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
