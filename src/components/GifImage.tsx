import { useState } from 'react'

type GifImageProps = {
  src: string
  alt: string
  className?: string
  placeholderClassName?: string
}

export function GifImage({
  src,
  alt,
  className = '',
  placeholderClassName = '',
}: GifImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const hasError = failedSrc === src

  if (hasError) {
    return (
      <div
        className={`flex min-h-32 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-100 px-4 py-6 text-center text-sm font-medium text-slate-500 ${placeholderClassName}`}
      >
        GIF unavailable
      </div>
    )
  }

  return (
    <img
      alt={alt}
      className={className}
      loading="lazy"
      src={src}
      onError={() => setFailedSrc(src)}
    />
  )
}
