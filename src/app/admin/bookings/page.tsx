import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Search, Eye } from 'lucide-react';

export default async function AdminBookingsPage() {
  // Fetch bookings including related schedule and trip details
  const bookings = await prisma.booking.findMany({
    include: {
      schedule: {
        include: {
          trip: true,
          boat: true
        }
      },
      user: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Daftar Pesanan (Bookings)</h1>
          <p className="text-slate-500 mt-1">Pantau semua pesanan masuk dari pelanggan dan tamu.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari kode booking atau nama..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
            />
          </div>
          <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-2 outline-none cursor-pointer">
            <option>Semua Status</option>
            <option>PENDING</option>
            <option>PAID</option>
            <option>COMPLETED</option>
            <option>CANCELLED</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-semibold text-slate-600 text-sm">Kode Booking</th>
                <th className="p-4 font-semibold text-slate-600 text-sm">Tanggal Pesan</th>
                <th className="p-4 font-semibold text-slate-600 text-sm">Nama Pemesan</th>
                <th className="p-4 font-semibold text-slate-600 text-sm">Paket / Kapal</th>
                <th className="p-4 font-semibold text-slate-600 text-sm">Total Tagihan</th>
                <th className="p-4 font-semibold text-slate-600 text-sm">Status</th>
                <th className="p-4 font-semibold text-slate-600 text-sm text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    Belum ada data pesanan (booking).
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => {
                  const customerName = booking.user?.name || booking.guestName || 'Guest Unknown';
                  const itemName = booking.schedule?.trip?.title || booking.schedule?.boat?.name || 'Paket Tidak Diketahui';
                  
                  // Status badge colors
                  let statusColor = "bg-slate-100 text-slate-700";
                  if (booking.status === "PENDING") statusColor = "bg-amber-100 text-amber-700";
                  if (booking.status === "PAID") statusColor = "bg-green-100 text-green-700";
                  if (booking.status === "CANCELLED") statusColor = "bg-red-100 text-red-700";
                  if (booking.status === "COMPLETED") statusColor = "bg-blue-100 text-blue-700";

                  return (
                    <tr key={booking.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-bold text-blue-600">{booking.bookingCode}</td>
                      <td className="p-4 text-sm text-slate-600">
                        {new Date(booking.createdAt).toLocaleDateString('id-ID', {
                          day: '2-digit', month: 'short', year: 'numeric'
                        })}
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-slate-900">{customerName}</div>
                        <div className="text-xs text-slate-500">{booking.user?.email || booking.guestEmail}</div>
                      </td>
                      <td className="p-4 text-sm text-slate-700">{itemName}</td>
                      <td className="p-4 text-sm font-medium text-slate-900">
                        Rp {Number(booking.grandTotal).toLocaleString('id-ID')}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Link href={`/admin/bookings/${booking.id}`} className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors ml-auto" title="Lihat Detail">
                          <Eye className="w-4 h-4" />
                        </Link>
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
