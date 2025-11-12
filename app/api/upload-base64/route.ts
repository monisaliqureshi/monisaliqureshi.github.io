import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { filename, base64, mime } = body

    if (!filename || !base64) {
      return NextResponse.json({ error: 'filename and base64 are required' }, { status: 400 })
    }

    // Store base64 data in images table
    const insertPayload = {
      filename,
      mime: mime || null,
      base64_data: base64,
    }

    // Use upsert to avoid duplicate filename unique constraint errors.
    // If a row with the same filename exists, replace its base64_data and mime.
    const { data, error } = await supabaseAdmin
      .from('images')
      .upsert(insertPayload, { onConflict: 'filename' })
      .select()
      .single()

    if (error) {
      console.error('Supabase upsert error:', error)
      return NextResponse.json({ error: 'Failed to save image to supabase' }, { status: 500 })
    }

    // Respond with saved filename and the base64 data so client can preview immediately
    return NextResponse.json({ filename: data.filename, base64: data.base64_data })
  } catch (err) {
    console.error('upload-base64 error:', err)
    return NextResponse.json({ error: 'Failed to upload base64 image' }, { status: 500 })
  }
}
