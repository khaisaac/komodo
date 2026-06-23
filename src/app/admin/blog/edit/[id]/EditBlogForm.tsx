'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { updateBlog } from '@/app/actions/blog';
import ImageUpload from '@/components/ImageUpload';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to prevent SSR window issues
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false, 
  loading: () => <div className="h-64 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl text-slate-400">Loading Editor...</div> 
});

interface EditBlogFormProps {
  blog: {
    id: string;
    title: string;
    content: string;
    thumbnail: string | null;
    status: string;
  }
}

export default function EditBlogForm({ blog }: EditBlogFormProps) {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(blog.content);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/blog" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Edit Artikel</h1>
          <p className="text-slate-500 mt-1">Ubah artikel {blog.title}.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <form 
          action={async (formData) => {
            setLoading(true);
            formData.append('content', content);
            await updateBlog(blog.id, formData);
          }} 
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Judul Artikel *</label>
            <input type="text" name="title" required defaultValue={blog.title} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500" />
          </div>

          <div>
            <ImageUpload name="thumbnail" label="Gambar Thumbnail" initialImage={blog.thumbnail || undefined} />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Status Publikasi</label>
            <select name="status" defaultValue={blog.status} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:border-blue-500">
              <option value="PUBLISHED">Published (Tayang)</option>
              <option value="DRAFT">Draft (Disembunyikan)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Isi Artikel *</label>
            <div className="bg-white overflow-hidden rounded-xl text-slate-900">
              <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent} 
                modules={modules}
                className="h-96 mb-12 text-slate-900"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" disabled={loading} className="bg-[#0A1F44] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#112a5c] transition-colors flex items-center gap-2 disabled:opacity-70">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
