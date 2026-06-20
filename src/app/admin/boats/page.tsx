import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Plus, Trash2 } from 'lucide-react';
import { deleteBoat } from '@/app/actions/boat';

export default async function AdminBoatsPage() {
  const boats = await prisma.boat.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Liveaboards (Boats) Management</h1>
          <p className="text-slate-500 mt-1">Kelola daftar armada kapal untuk charter atau liveaboard.</p>
        </div>
        <Link 
          href="/admin/boats/create" 
          className="bg-[#0A1F44] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#112a5c] transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Kapal Baru</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-semibold text-slate-600">Nama Kapal</th>
                <th className="p-4 font-semibold text-slate-600">Tipe</th>
                <th className="p-4 font-semibold text-slate-600">Kapasitas</th>
                <th className="p-4 font-semibold text-slate-600">Harga / Malam</th>
                <th className="p-4 font-semibold text-slate-600 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {boats.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Belum ada armada kapal. Silakan tambah baru.
                  </td>
                </tr>
              ) : (
                boats.map((boat) => {
                  const specs = boat.specifications as any || {};
                  return (
                    <tr key={boat.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900">{boat.name}</td>
                      <td className="p-4 text-slate-600">{specs.type || '-'}</td>
                      <td className="p-4 text-slate-600">{specs.capacity || '-'} Pax</td>
                      <td className="p-4 text-slate-600">Rp {Number(specs.basePrice || 0).toLocaleString('id-ID')}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <form action={async () => {
                            'use server';
                            await deleteBoat(boat.id);
                          }}>
                            <button type="submit" className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors" title="Hapus">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
