import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { supabaseAdmin } from '@/lib/supabase-admin'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { public_id, newsId, photoUrl } = body || {}

    // Delete from Cloudinary if we have public_id
    if (public_id) {
      const res = await cloudinary.uploader.destroy(public_id, { invalidate: true })
      // continue even if deletion reports not found
    }

    // If newsId and photoUrl provided, remove photoUrl from news record in Supabase
    if (newsId && photoUrl) {
      const { data: existing, error: selErr } = await supabaseAdmin
        .from('news')
        .select('id, photos')
        .eq('id', newsId)
        .single()

      if (selErr) {
        console.error('Failed to select news row for photo removal', selErr)
      } else {
        const oldPhotos: string[] = Array.isArray(existing?.photos) ? existing.photos : []
        const nextPhotos = oldPhotos.filter((p) => p !== photoUrl)
        const { error: updErr } = await supabaseAdmin
          .from('news')
          .update({ photos: nextPhotos })
          .eq('id', newsId)

        if (updErr) console.error('Failed to update news photos after deletion', updErr)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('cloudinary-delete error', err)
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}
