// /app/api/photo-upload/route.ts or /pages/api/photo-upload.ts (Next.js API route)

import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import sharp from 'sharp'

// Add polyfill if you're using fetch in Node.js < v18:
// import fetch from 'node-fetch';

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { base64, filename, remoteUrl } = body || {}
    if (!base64 && !remoteUrl) return NextResponse.json({ error: 'Missing file (provide base64 or remoteUrl)' }, { status: 400 })

    // Cloudinary config
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: 'Cloudinary not configured' }, { status: 500 })
    }
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    })

    let buffer: Buffer

    if (base64) {
      // Remove data:image/jpeg;base64, if present
      const matches = base64.match(/^data:.+;base64,(.*)$/)
      buffer = Buffer.from(matches ? matches[1] : base64, 'base64')
    } else if (remoteUrl) {
      // Fetch remote image and get buffer
      const response = await fetch(remoteUrl)
      buffer = Buffer.from(await response.arrayBuffer())
    } else {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    // Resize image BEFORE uploading (change dimensions/format as needed)
    const resizedBuffer = await sharp(buffer)
      .resize({ width: 1000 }) // Set your desired width
      .toFormat('jpeg', { quality: 80 }) // Output can be jpeg, png, webp, etc.
      .toBuffer()

    // Cloudinary accepts Data URLs
    const base64Resized = `data:image/jpeg;base64,${resizedBuffer.toString('base64')}`

    const publicId = filename ? filename.replace(/\.[^.]+$/, '') : undefined

    // Upload resized image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(base64Resized, {
      public_id: publicId,
      overwrite: true,
    })

    return NextResponse.json({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id
    })
  } catch (err: any) {
    console.error('Cloudinary/photo upload error:', err)
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
