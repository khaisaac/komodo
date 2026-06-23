'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function checkVoucher(code: string, subtotal: number) {
  if (!code) return { valid: false, message: 'Kode voucher kosong' };

  const voucher = await prisma.voucher.findUnique({
    where: { code: code.toUpperCase() }
  });

  if (!voucher) {
    return { valid: false, message: 'Kode voucher tidak ditemukan' };
  }

  if (!voucher.isActive) {
    return { valid: false, message: 'Voucher sudah tidak aktif' };
  }

  const now = new Date();
  if (now < voucher.validFrom || now > voucher.validTo) {
    return { valid: false, message: 'Voucher sudah kedaluwarsa atau belum aktif' };
  }

  if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit) {
    return { valid: false, message: 'Kuota penggunaan voucher ini sudah habis' };
  }

  let discountAmount = 0;
  if (voucher.discountType === 'PERCENTAGE') {
    discountAmount = (subtotal * Number(voucher.discountValue)) / 100;
  } else if (voucher.discountType === 'FIXED_AMOUNT') {
    discountAmount = Number(voucher.discountValue);
  }

  // Ensure discount doesn't exceed subtotal
  if (discountAmount > subtotal) {
    discountAmount = subtotal;
  }

  return {
    valid: true,
    discountAmount,
    voucherId: voucher.id,
    message: 'Voucher berhasil digunakan!'
  };
}

export async function createVoucher(formData: FormData) {
  const code = formData.get('code') as string;
  const discountType = formData.get('discountType') as 'PERCENTAGE' | 'FIXED_AMOUNT';
  const discountValue = parseFloat(formData.get('discountValue') as string);
  const validFrom = new Date(formData.get('validFrom') as string);
  const validTo = new Date(formData.get('validTo') as string);
  const usageLimitStr = formData.get('usageLimit') as string;
  const usageLimit = usageLimitStr ? parseInt(usageLimitStr) : null;
  const isActive = formData.get('isActive') === 'on';

  await prisma.voucher.create({
    data: {
      code: code.toUpperCase(),
      discountType,
      discountValue,
      validFrom,
      validTo,
      usageLimit,
      isActive
    }
  });

  revalidatePath('/admin/vouchers');
  redirect('/admin/vouchers');
}

export async function deleteVoucher(id: string) {
  await prisma.voucher.delete({
    where: { id }
  });

  revalidatePath('/admin/vouchers');
}
