/**
 * Client-side image compression helper.
 * Reads a File, draws to a canvas and iteratively reduces quality/size until <= maxBytes.
 * Returns a data URL, mime and base64 body (without prefix).
 */
export async function compressFileToDataUrl(file: File, maxBytes = 5 * 1024 * 1024) {
  const readAsDataURL = (f: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (e) => reject(e)
    reader.readAsDataURL(f)
  })

  const dataUrl = await readAsDataURL(file)

  // Quick size check: approximate bytes from base64 length
  const base64 = dataUrl.split(',')[1] || ''
  const approxBytes = Math.ceil((base64.length * 3) / 4)
  if (approxBytes <= maxBytes) {
    const mimeMatch = dataUrl.match(/^data:(.*);base64,/) || []
    const mime = mimeMatch[1] || file.type || 'image/png'
    return { dataUrl, mime, base64 }
  }

  // Create image element
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image()
    i.onload = () => resolve(i)
    i.onerror = (e) => reject(e)
    i.src = dataUrl
  })

  const canvas = document.createElement('canvas')
  let width = img.naturalWidth
  let height = img.naturalHeight

  // Decide output mime: prefer webp if available, otherwise fallback to jpeg for compression
  const testCanvas = document.createElement('canvas')
  const supportsWebP = (() => {
    try {
      return testCanvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
    } catch (e) {
      return false
    }
  })()

  let outMime = supportsWebP ? 'image/webp' : 'image/jpeg'

  // Iteratively reduce quality then dimensions until under maxBytes
  let quality = 0.92
  const minQuality = 0.25
  const minWidth = 64

  const ctx = canvas.getContext('2d')!

  while (true) {
    canvas.width = Math.max(1, Math.round(width))
    canvas.height = Math.max(1, Math.round(height))
    // clear and draw
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // draw with smoothing
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    let compressed: string
    try {
      compressed = canvas.toDataURL(outMime, quality)
    } catch (e) {
      // fallback to default without quality param
      compressed = canvas.toDataURL(outMime)
    }

    const b64 = compressed.split(',')[1] || ''
    const bytes = Math.ceil((b64.length * 3) / 4)
    if (bytes <= maxBytes) {
      return { dataUrl: compressed, mime: outMime, base64: b64 }
    }

    // reduce quality first, then dimensions
    if (quality > minQuality) {
      quality = Math.max(minQuality, quality - 0.12)
      continue
    }

    // scale down dimensions by 90%
    if (width > minWidth && height > minWidth) {
      width = Math.floor(width * 0.9)
      height = Math.floor(height * 0.9)
      // after scaling, reset quality a bit to try better compression
      quality = Math.max(minQuality, quality - 0.05)
      continue
    }

    // Cannot reduce further; return the last compressed result (may still be > maxBytes)
    return { dataUrl: compressed, mime: outMime, base64: b64 }
  }
}
