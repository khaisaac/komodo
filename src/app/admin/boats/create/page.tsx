'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createBoat } from '@/app/actions/boat';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

export default function CreateBoatPage() {
  const [loading, setLoading] = useState(false);

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
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tipe Kapal *</label>
              <input type="text" name="type" required placeholder="Misal: Luxury Phinisi" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Kapasitas Maksimal (Orang) *</label>
              <input type="number" name="capacity" required min="1" defaultValue="14" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Harga Sewa per Malam (Rp) *</label>
              <input type="number" name="basePrice" required min="0" placeholder="45000000" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">URL Gambar Utama (Sementara) *</label>
            <input type="url" name="featuredImage" required placeholder="https://images.unsplash.com/photo-..." className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            <p className="text-xs text-slate-500 mt-2">Gunakan URL gambar publik (unsplash, dll).</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi Kapal</label>
            <textarea name="description" rows={5} placeholder="Fasilitas unggulan, spesifikasi mesin, dll..." className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"></textarea>
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
