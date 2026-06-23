'use client';

import React, { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { authenticate } from '@/app/actions/auth';
import { Ship, Loader2, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useActionState } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-[#0A1F44] text-white py-3 rounded-xl font-bold hover:bg-[#112a5c] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-6"
    >
      {pending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Masuk ke Admin Panel'}
    </button>
  );
}

export default function LoginPage() {
  const [errorMessage, dispatch] = useActionState(authenticate, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-[#0A1F44] p-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Ship className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Komodo Lombok Cruise</h1>
          <p className="text-slate-300 mt-2">Login ke Admin Panel</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form action={dispatch} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="admin@trip.com"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl pl-10 pr-12 py-3 outline-none focus:border-blue-500 focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                {errorMessage}
              </div>
            )}

            <SubmitButton />
          </form>
        </div>
      </div>
      <p className="text-slate-400 text-sm mt-8">
        &copy; {new Date().getFullYear()} Komodo Lombok Cruise. All rights reserved.
      </p>
    </div>
  );
}
