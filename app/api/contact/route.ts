import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('contact')
      .select('*')
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contact' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    
    // First, get the existing contact ID if it exists
    const { data: existing } = await supabaseAdmin
      .from('contact')
      .select('id')
      .maybeSingle()

    let result;
    
    if (existing) {
      // Update existing contact
      result = await supabaseAdmin
        .from('contact')
        .update({
          title: body.title,
          profile_image_path: body.profile_image_path,
          description: body.description,
          blog_title: body.blog_title,
          blog_subtitle: body.blog_subtitle,
          blog_link: body.blog_link,
        })
        .eq('id', existing.id)
        .select()
        .single()
    } else {
      // Insert new contact (first time)
      result = await supabaseAdmin
        .from('contact')
        .insert({
          title: body.title,
          profile_image_path: body.profile_image_path,
          description: body.description,
          blog_title: body.blog_title,
          blog_subtitle: body.blog_subtitle,
          blog_link: body.blog_link,
        })
        .select()
        .single()
    }

    if (result.error) throw result.error

    return NextResponse.json(result.data)
  } catch (error) {
    console.error('Contact update error:', error)
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 })
  }
}
