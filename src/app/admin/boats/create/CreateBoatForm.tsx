'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createBoat } from '@/app/actions/boat';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import MultiImageUpload from '@/components/MultiImageUpload';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to prevent SSR window issues
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false, 
  loading: () => <div className="h-64 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl text-slate-400">Loading Editor...</div> 
});

interface CreateBoatFormProps {
  destinations: { id: string; name: string }[];
}

export default function CreateBoatForm({ destinations }: CreateBoatFormProps) {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/boats" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tambah Kapal Phinisi</h1>
          <p className="text-slate-500 mt-1">Buat profil armada kapal baru untuk layanan Liveaboard/Charter.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <form 
          action={async (formData) => {
            setLoading(true);
            formData.append('description', description);
            await createBoat(formData);
          }} 
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Kapal *</label>
              <input type="text" name="name" required placeholder="Misal: Majestic Manta" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Destinasi Utama *</label>
              <select name="destinationId" required className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 appearance-none">
                <option value="">Pilih Destinasi...</option>
                {destinations.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tipe Kapal *</label>
              <input type="text" name="type" required placeholder="Misal: Luxury Phinisi" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Kapasitas Maksimal (Orang) *</label>
              <input type="number" name="capacity" required min="1" defaultValue="14" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Harga Sewa per Malam (Rp) *</label>
            <input type="number" name="basePrice" required min="0" placeholder="45000000" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ImageUpload name="featuredImage" label="Gambar Utama" />
            </div>
            <div>
              <MultiImageUpload name="gallery" label="Foto Galeri (Maksimal 5)" maxImages={5} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Rating Kapal (1.0 - 5.0)</label>
              <input type="number" step="0.1" name="rating" min="1" max="5" defaultValue="5.0" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Jumlah Ulasan (Review Count)</label>
              <input type="number" name="reviewCount" min="0" defaultValue="0" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi Kapal</label>
            <div className="bg-white overflow-hidden rounded-xl text-slate-900 border border-slate-200">
              <ReactQuill 
                theme="snow" 
                value={description} 
                onChange={setDescription} 
                modules={modules}
                className="h-64 mb-12 text-slate-900"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" disabled={loading} className="bg-[#0A1F44] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#112a5c] transition-colors flex items-center gap-2 disabled:opacity-70">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              <span>Simpan Kapal</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
