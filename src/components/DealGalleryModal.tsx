type Props = {
  images: string[]
  index: number
  onIndexChange: (i: number) => void
  onClose: () => void
}

export default function DealGalleryModal({ images, index, onIndexChange, onClose }: Props) {
  const prev = () => onIndexChange((index - 1 + images.length) % images.length)
  const next = () => onIndexChange((index + 1) % images.length)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#083a6f]/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        <img
          src={images[index]}
          alt=""
          className="w-full rounded-[14px] shadow-2xl"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#083a6f] hover:bg-white"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#083a6f] hover:bg-white"
            >
              ›
            </button>
            <div className="mt-3 flex justify-center gap-1.5">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}