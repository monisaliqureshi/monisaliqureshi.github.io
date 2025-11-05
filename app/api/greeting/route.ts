import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('greeting')
      .select('*')
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch greeting' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    
    // First, get the existing greeting ID if it exists
    const { data: existing } = await supabaseAdmin
      .from('greeting')
      .select('id')
      .maybeSingle()

    let result;
    
    if (existing) {
      // Update existing greeting
      result = await supabaseAdmin
        .from('greeting')
        .update({
          title: body.title,
          title2: body.title2,
          nickname: body.nickname,
          full_name: body.full_name,
          subtitle: body.subtitle,
          resume_link: body.resume_link,
          mail: body.mail,
        })
        .eq('id', existing.id)
        .select()
        .single()
    } else {
      // Insert new greeting (first time)
      result = await supabaseAdmin
        .from('greeting')
        .insert({
          title: body.title,
          title2: body.title2,
          nickname: body.nickname,
          full_name: body.full_name,
          subtitle: body.subtitle,
          resume_link: body.resume_link,
          mail: body.mail,
        })
        .select()
        .single()
    }

    if (result.error) throw result.error

    return NextResponse.json(result.data)
  } catch (error) {
    console.error('Greeting update error:', error)
    return NextResponse.json({ error: 'Failed to update greeting' }, { status: 500 })
  }
}
