import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Plus, Trash2, Edit } from 'lucide-react';
import { deleteTrip } from '@/app/actions/trip';

export default async function AdminTripsPage() {
  const trips = await prisma.trip.findMany({
    where: { type: 'OPEN_TRIP' },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Open Trips Management</h1>
          <p className="text-slate-500 mt-1">Kelola daftar paket Open Trip yang tersedia di website.</p>
        </div>
        <Link 
          href="/admin/trips/create" 
          className="bg-[#0A1F44] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#112a5c] transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Trip Baru</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-semibold text-slate-600">Nama Paket</th>
                <th className="p-4 font-semibold text-slate-600">Destinasi</th>
                <th className="p-4 font-semibold text-slate-600">Durasi</th>
                <th className="p-4 font-semibold text-slate-600">Harga Dasar</th>
                <th className="p-4 font-semibold text-slate-600 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {trips.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Belum ada data Open Trip. Silakan tambah baru.
                  </td>
                </tr>
              ) : (
                trips.map((trip) => (
                  <tr key={trip.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-900">{trip.title}</td>
                    <td className="p-4 text-slate-600">{trip.destination}</td>
                    <td className="p-4 text-slate-600">{trip.durationDays}H {trip.durationNights}M</td>
                    <td className="p-4 text-slate-600">Rp {Number(trip.basePrice).toLocaleString('id-ID')}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/trips/edit/${trip.id}`} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Link>
                        {/* We use a form with Server Action for deletion */}
                        <form action={async () => {
                          'use server';
                          await deleteTrip(trip.id);
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
