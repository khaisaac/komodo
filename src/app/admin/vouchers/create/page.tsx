import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { createVoucher } from '@/app/actions/voucher';

export default function CreateVoucherPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/vouchers"
          className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-500"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#0A1F44]">Buat Voucher Baru</h1>
          <p className="text-slate-500 text-sm">Tambahkan kode promo untuk pelanggan Anda.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
        <form action={createVoucher} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Kode Voucher *</label>
              <input 
                type="text" 
                name="code" 
                required 
                placeholder="Misal: LEBARAN2026" 
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500 uppercase font-mono" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tipe Diskon *</label>
              <select 
                name="discountType" 
                required
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="PERCENTAGE">Persentase (%)</option>
                <option value="FIXED_AMOUNT">Nominal Tetap (Rp)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nilai Diskon *</label>
              <input 
                type="number" 
                name="discountValue" 
                required 
                min="0"
                step="any"
                placeholder="Misal: 10 atau 500000" 
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Berlaku Dari *</label>
              <input 
                type="date" 
                name="validFrom" 
                required 
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Berlaku Sampai *</label>
              <input 
                type="date" 
                name="validTo" 
                required 
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Batas Kuota Penggunaan</label>
              <input 
                type="number" 
                name="usageLimit" 
                min="1"
                placeholder="Kosongkan jika tanpa batas" 
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" 
              />
              <p className="text-xs text-slate-500 mt-1">Berapa kali kode ini bisa dipakai total oleh semua orang.</p>
            </div>

            <div className="flex items-center gap-3 pt-8">
              <input 
                type="checkbox" 
                name="isActive" 
                id="isActive"
                defaultChecked
                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isActive" className="font-semibold text-slate-700 cursor-pointer">
                Aktifkan Voucher Ini Langsung
              </label>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
            <Link 
              href="/admin/vouchers"
              className="px-6 py-3 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Batal
            </Link>
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-colors flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Simpan Voucher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
