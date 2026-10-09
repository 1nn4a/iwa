import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  priority?: boolean
  bg?: string
}

export default function LazyImage({
  priority = false,
  bg = '#0a4e8f',
  className = '',
  style,
  onLoad,
  ...rest
}: Props) {
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  // Cached images can finish before React attaches onLoad
  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true)
  }, [])

  return (
    <img
      ref={ref}
      {...rest}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={{ backgroundColor: bg, ...style }}
      onLoad={(e) => {
        setLoaded(true)
        onLoad?.(e)
      }}
      onError={() => setLoaded(true)}
    />
  )
}