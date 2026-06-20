import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Plus, Trash2, Edit } from 'lucide-react';
import { deleteBlog } from '@/app/actions/blog';

export default async function AdminBlogPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Blog & Articles Management</h1>
          <p className="text-slate-500 mt-1">Kelola daftar artikel blog untuk website Anda.</p>
        </div>
        <Link 
          href="/admin/blog/create" 
          className="bg-[#0A1F44] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#112a5c] transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Artikel Baru</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-semibold text-slate-600">Judul Artikel</th>
                <th className="p-4 font-semibold text-slate-600">Status</th>
                <th className="p-4 font-semibold text-slate-600">Tanggal Dibuat</th>
                <th className="p-4 font-semibold text-slate-600 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    Belum ada data Artikel. Silakan tambah baru.
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-900">{blog.title}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${blog.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">{new Date(blog.createdAt).toLocaleDateString('id-ID')}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/blog/edit/${blog.id}`} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <form action={async () => {
                          'use server';
                          await deleteBlog(blog.id);
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
