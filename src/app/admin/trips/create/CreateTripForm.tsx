'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createTrip } from '@/app/actions/trip';
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import MultiImageUpload from '@/components/MultiImageUpload';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to prevent SSR window issues
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false, 
  loading: () => <div className="h-64 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl text-slate-400">Loading Editor...</div> 
});

export default function CreateTripForm({ destinations }: { destinations: any[] }) {
  const [loading, setLoading] = useState(false);
  const [pricingOptions, setPricingOptions] = useState([{ name: '', price: '' }]);
  const [includes, setIncludes] = useState<string[]>(['']);
  const [excludes, setExcludes] = useState<string[]>(['']);
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

  const handleFacilityChange = (index: number, value: string, type: 'include' | 'exclude') => {
    if (type === 'include') {
      const newIncludes = [...includes];
      newIncludes[index] = value;
      setIncludes(newIncludes);
    } else {
      const newExcludes = [...excludes];
      newExcludes[index] = value;
      setExcludes(newExcludes);
    }
  };

  const addFacility = (type: 'include' | 'exclude') => {
    if (type === 'include') setIncludes([...includes, '']);
    else setExcludes([...excludes, '']);
  };

  const removeFacility = (index: number, type: 'include' | 'exclude') => {
    if (type === 'include') {
      if (includes.length > 1) setIncludes(includes.filter((_, i) => i !== index));
    } else {
      if (excludes.length > 1) setExcludes(excludes.filter((_, i) => i !== index));
    }
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
            formData.append('description', description);
            await createTrip(formData);
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
              <select name="destination" required className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 appearance-none">
                <option value="">Pilih Destinasi...</option>
                {destinations.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
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
              <label className="block text-sm font-semibold text-slate-700 mb-2">Rating Paket (1.0 - 5.0)</label>
              <input type="number" step="0.1" name="rating" min="1" max="5" defaultValue="5.0" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Jumlah Ulasan (Review Count)</label>
              <input type="number" name="reviewCount" min="0" defaultValue="0" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
            </div>
          </div>

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

          {/* DYNAMIC INCLUDES & EXCLUDES SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900">Include</h3>
                <button type="button" onClick={() => addFacility('include')} className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:text-blue-800">
                  <Plus className="w-4 h-4" /> Tambah
                </button>
              </div>
              <input type="hidden" name="includesStr" value={JSON.stringify(includes.filter(i => i.trim() !== ''))} />
              <div className="space-y-3">
                {includes.map((inc, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={inc} 
                      onChange={(e) => handleFacilityChange(idx, e.target.value, 'include')}
                      placeholder="Misal: Boat Transportation"
                      className="flex-1 bg-white border border-slate-200 text-slate-900 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                    />
                    <button type="button" onClick={() => removeFacility(idx, 'include')} disabled={includes.length === 1} className="p-2 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900">Exclude</h3>
                <button type="button" onClick={() => addFacility('exclude')} className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:text-blue-800">
                  <Plus className="w-4 h-4" /> Tambah
                </button>
              </div>
              <input type="hidden" name="excludesStr" value={JSON.stringify(excludes.filter(i => i.trim() !== ''))} />
              <div className="space-y-3">
                {excludes.map((exc, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={exc} 
                      onChange={(e) => handleFacilityChange(idx, e.target.value, 'exclude')}
                      placeholder="Misal: Personal Expenses"
                      className="flex-1 bg-white border border-slate-200 text-slate-900 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                    />
                    <button type="button" onClick={() => removeFacility(idx, 'exclude')} disabled={excludes.length === 1} className="p-2 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi Paket *</label>
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
              <span>Simpan Paket</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
