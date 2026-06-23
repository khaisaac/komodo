import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Tag, Trash2 } from 'lucide-react';
import { deleteVoucher } from '@/app/actions/voucher';

export default async function VouchersPage() {
  const vouchers = await prisma.voucher.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0A1F44] mb-2 flex items-center gap-3">
            <Tag className="w-8 h-8 text-blue-600" />
            Manajemen Voucher
          </h1>
          <p className="text-slate-500">Kelola kode promo dan diskon untuk pelanggan.</p>
        </div>
        <Link 
          href="/admin/vouchers/create" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20"
        >
          <Plus className="w-5 h-5" />
          Buat Voucher Baru
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-5 font-semibold text-slate-600">Kode Promo</th>
                <th className="p-5 font-semibold text-slate-600">Nilai Diskon</th>
                <th className="p-5 font-semibold text-slate-600">Status & Kuota</th>
                <th className="p-5 font-semibold text-slate-600">Masa Berlaku</th>
                <th className="p-5 font-semibold text-slate-600 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Belum ada voucher yang dibuat.
                  </td>
                </tr>
              ) : vouchers.map((v) => (
                <tr key={v.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="p-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 font-mono font-bold border border-blue-200">
                      {v.code}
                    </span>
                  </td>
                  <td className="p-5 font-medium text-slate-700">
                    {v.discountType === 'PERCENTAGE' ? `${v.discountValue}%` : `Rp ${Number(v.discountValue).toLocaleString('id-ID')}`}
                  </td>
                  <td className="p-5">
                    <div className="flex flex-col gap-1">
                      {v.isActive ? (
                        <span className="w-fit px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">Aktif</span>
                      ) : (
                        <span className="w-fit px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">Tidak Aktif</span>
                      )}
                      <span className="text-xs text-slate-500">
                        Dipakai: {v.usedCount} {v.usageLimit ? `/ ${v.usageLimit}` : '(Tanpa Batas)'}
                      </span>
                    </div>
                  </td>
                  <td className="p-5 text-sm text-slate-600">
                    {v.validFrom.toLocaleDateString('id-ID')} - <br/>
                    {v.validTo.toLocaleDateString('id-ID')}
                  </td>
                  <td className="p-5 text-right">
                    <form action={async () => {
                      'use server';
                      await deleteVoucher(v.id);
                    }}>
                      <button 
                        type="submit"
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus Voucher"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
