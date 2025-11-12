"use client"

export default function Spinner({ size = 6 }: { size?: number }) {
  const s = `${size}rem`
  return (
    <div style={{ width: s, height: s }} className="flex items-center justify-center">
      <div className="w-full h-full border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
