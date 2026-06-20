'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createTrip } from '@/app/actions/trip';
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from 'lucide-react';

export default function CreateTripPage() {
  const [loading, setLoading] = useState(false);
  const [pricingOptions, setPricingOptions] = useState([{ name: '', price: '' }]);

  const addPricingOption = () => setPricingOptions([...pricingOptions, { name: '', price: '' }]);
  const removePricingOption = (index: number) => {
    if (pricingOptions.length > 1) {
      setPricingOptions(pricingOptions.filter((_, i) => i !== index));
    }
  };

  const updatePricingOption = (index: number, field: 'name' | 'price', value: string) => {
    const newOptions = [...pricingOptions];
    newOptions[index][field] = value;
    setPricingOptions(newOptions);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/trips" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tambah Open Trip</h1>
          <p className="text-slate-500 mt-1">Buat paket Open Trip baru untuk ditampilkan di website.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <form 
          action={async (formData) => {
            setLoading(true);
            await createTrip(formData);
            // It will redirect automatically
          }} 
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Judul Paket *</label>
              <input type="text" name="title" required placeholder="Misal: Sailing Komodo Premium 3D2N" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Destinasi Utama *</label>
              <input type="text" name="destination" required placeholder="Misal: Labuan Bajo" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Durasi Hari *</label>
              <input type="number" name="durationDays" required min="1" defaultValue="3" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Durasi Malam *</label>
              <input type="number" name="durationNights" required min="0" defaultValue="2" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Harga Mulai Dari (Rp) *</label>
              <input type="number" name="basePrice" required min="0" placeholder="2500000" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">URL Gambar Utama (Sementara) *</label>
            <input type="url" name="featuredImage" required placeholder="https://images.unsplash.com/photo-..." className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            <p className="text-xs text-slate-500 mt-2">Untuk versi produksi nanti akan diganti dengan fitur Upload File.</p>
          </div>

          {/* DYNAMIC PRICING OPTIONS SECTION */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-bold text-slate-900">Opsi Paket & Harga</h3>
                <p className="text-xs text-slate-500 mt-1">Tambahkan varian paket untuk trip ini (contoh: Deluxe Cabin, Sharing Cabin).</p>
              </div>
              <button type="button" onClick={addPricingOption} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-200 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Tambah Opsi
              </button>
            </div>
            
            <input type="hidden" name="pricingOptionsStr" value={JSON.stringify(pricingOptions)} />

            <div className="space-y-4">
              {pricingOptions.map((option, index) => (
                <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Nama Paket Opsi *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Misal: Private Deluxe Package" 
                      value={option.name}
                      onChange={(e) => updatePricingOption(index, 'name', e.target.value)}
                      className="w-full bg-transparent border-b border-slate-200 text-slate-900 py-2 outline-none focus:border-blue-500" 
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Harga (Rp) *</label>
                    <input 
                      type="number" 
                      required 
                      min="0"
                      placeholder="Misal: 4500000" 
                      value={option.price}
                      onChange={(e) => updatePricingOption(index, 'price', e.target.value)}
                      className="w-full bg-transparent border-b border-slate-200 text-slate-900 py-2 outline-none focus:border-blue-500" 
                    />
                  </div>
                  <button 
                    type="button" 
                    onClick={() => removePricingOption(index)}
                    disabled={pricingOptions.length === 1}
                    className="w-10 h-10 mt-5 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                    title="Hapus Opsi"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi Paket *</label>
            <textarea name="description" rows={5} required placeholder="Jelaskan detail pengalaman yang akan didapatkan..." className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"></textarea>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" disabled={loading} className="bg-[#0A1F44] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#112a5c] transition-colors flex items-center gap-2 disabled:opacity-70">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              <span>Simpan Paket</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
