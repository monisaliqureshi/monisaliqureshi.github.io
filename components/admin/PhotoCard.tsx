"use client"

import Spinner from '@/components/common/Spinner'

interface Props {
  src?: string
  alt?: string
  name?: string
  status?: 'pending' | 'compressing' | 'uploading' | 'done' | 'error' | 'too_large' | 'ready'
  error?: string
  onRemove?: () => void
  children?: React.ReactNode
}

export default function PhotoCard({ src, alt, name, status, error, onRemove, children }: Props) {
  return (
    <div className="relative group rounded-lg overflow-hidden border-2 border-cyan-500/20 bg-gray-900/50">
      <div className="aspect-square relative flex items-center justify-center bg-black/10">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt || name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-500">No Image</div>
        )}
        {(status === 'compressing' || status === 'uploading') && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
            <Spinner size={3} />
          </div>
        )}
      </div>

      <div className="p-2 text-xs text-center text-gray-400 truncate">{name}</div>

      <div className="p-2 flex items-center justify-center gap-2">
        {children}
        {status === 'done' && <div className="text-sm text-green-400">Done</div>}
        {status === 'error' && <div className="text-sm text-red-400">{error || 'Error'}</div>}
        {status === 'too_large' && <div className="text-sm text-yellow-400">Too large</div>}
      </div>

      {onRemove && (
        <button onClick={onRemove} className="absolute top-1 right-1 p-1.5 rounded-full bg-red-500/80 text-white">✕</button>
      )}
    </div>
  )
}
