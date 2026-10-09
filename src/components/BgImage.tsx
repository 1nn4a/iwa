import { useEffect, useState, type ReactNode, type CSSProperties } from 'react'

type Props = {
  src: string
  className?: string
  style?: CSSProperties
  bg?: string
  children?: ReactNode
}

export default function BgImage({ src, className = '', style, bg = '#0a4e8f', children }: Props) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.src = src
    img.decode().then(
      () => !cancelled && setReady(true),
      () => !cancelled && setReady(true),
    )
    return () => { cancelled = true }
  }, [src])

  return (
    <div className={`overflow-hidden ${className}`} style={{ backgroundColor: bg, ...style }}>
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `url(${src})` }}
      />
      {children}
    </div>
  )
}