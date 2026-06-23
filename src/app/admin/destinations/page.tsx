import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Plus, Trash2, Edit } from 'lucide-react';
import { deleteDestination } from '@/app/actions/destination';
import Image from 'next/image';

export default async function AdminDestinationsPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Destinations Management</h1>
          <p className="text-slate-500 mt-1">Kelola daftar destinasi yang tersedia untuk trip.</p>
        </div>
        <Link 
          href="/admin/destinations/create" 
          className="bg-[#0A1F44] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#112a5c] transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Destinasi</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-semibold text-slate-600 w-24">Image</th>
                <th className="p-4 font-semibold text-slate-600">Nama Destinasi</th>
                <th className="p-4 font-semibold text-slate-600">Deskripsi Singkat</th>
                <th className="p-4 font-semibold text-slate-600 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {destinations.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    Belum ada data destinasi. Silakan tambah baru.
                  </td>
                </tr>
              ) : (
                destinations.map((dest) => (
                  <tr key={dest.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4">
                      {dest.image ? (
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-slate-200">
                          <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-16 h-12 rounded-lg bg-slate-200 flex items-center justify-center text-xs text-slate-400">No Img</div>
                      )}
                    </td>
                    <td className="p-4 font-medium text-slate-900">{dest.name}</td>
                    <td className="p-4 text-slate-600 max-w-xs truncate">{dest.description || '-'}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/destinations/edit/${dest.id}`} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <form action={async () => {
                          'use server';
                          await deleteDestination(dest.id);
                        }}>
                          <button type="submit" className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors" title="Hapus">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
