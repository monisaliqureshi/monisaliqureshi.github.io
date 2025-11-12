import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('news')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) throw error

    // If no data, return empty array
    const rows = data || []

    try {
      // Collect unique candidate filenames (skip entries that are already data URIs)
      const filenameSet = new Set<string>()
      for (const row of rows) {
        if (row?.thumbnail_filename && typeof row.thumbnail_filename === 'string' && !row.thumbnail_filename.startsWith('data:')) {
          filenameSet.add(row.thumbnail_filename)
        }
        if (Array.isArray(row.photos)) {
          for (const p of row.photos) {
            if (p && typeof p === 'string' && !p.startsWith('data:')) filenameSet.add(p)
          }
        }
      }

      const filenames = Array.from(filenameSet)

      // If no filenames to lookup, return rows as-is
      if (filenames.length === 0) return NextResponse.json(rows)

      // Batch query images table for all candidate filenames
      const { data: imagesData, error: imagesError } = await supabaseAdmin
        .from('images')
        .select('filename, base64_data, mime')
        .in('filename', filenames)

      // If images lookup failed, just return original rows (fallback to local files)
      if (imagesError) {
        console.error('Error fetching images table:', imagesError)
        return NextResponse.json(rows)
      }

      // Map results by filename for quick replacement
      const imagesMap = new Map<string, { base64_data: string; mime?: string }>()
      for (const img of imagesData || []) {
        imagesMap.set(img.filename, { base64_data: img.base64_data, mime: img.mime })
      }

      // Replace filenames with data URIs when available; otherwise leave original (local) values
      const enriched = rows.map((row: any) => {
        const out = { ...row }

        if (out.thumbnail_filename && typeof out.thumbnail_filename === 'string' && !out.thumbnail_filename.startsWith('data:')) {
          const found = imagesMap.get(out.thumbnail_filename)
          if (found && found.base64_data) out.thumbnail_filename = `data:${found.mime || 'image/png'};base64,${found.base64_data}`
        }

        if (Array.isArray(out.photos) && out.photos.length > 0) {
          out.photos = out.photos.map((p: string) => {
            if (!p || typeof p !== 'string' || p.startsWith('data:')) return p
            const found = imagesMap.get(p)
            return found && found.base64_data ? `data:${found.mime || 'image/png'};base64,${found.base64_data}` : p
          })
        }

        return out
      })

      return NextResponse.json(enriched)
    } catch (e) {
      // On unexpected errors, log and return original rows so the client can use local files
      console.error('Error enriching news with images:', e)
      return NextResponse.json(rows)
    }
  } catch (error) {
    console.error('Error fetching news:', error)
    // Return empty array on error to maintain consistent API response
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { data, error } = await supabaseAdmin
      .from('news')
      .insert(body)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    const { data, error } = await supabaseAdmin
      .from('news')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('news')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 })
  }
}

