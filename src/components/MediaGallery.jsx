import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function VideoCard({ item, index, onClick }) {
  const videoRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (hovering) {
      video.play().catch(() => {})
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [hovering])

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      className="media-card group relative overflow-hidden rounded-[1.5rem] border border-[#eaded7] bg-[#fffaf7] p-2 text-left shadow-soft"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      aria-label={`Play video: ${item.caption}`}
    >
      <div className="relative overflow-hidden rounded-[1rem]">
        <video
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="media-card-video h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Play badge */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={hovering ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-[#fffaf7]/80 shadow-soft backdrop-blur-sm">
            <span className="ml-1 text-2xl text-[#b94e6b]">▶</span>
          </div>
        </motion.div>

        {/* Video label pill */}
        <div className="absolute left-3 top-3 rounded-full border border-[#eaded7]/60 bg-[#fffaf7]/80 px-2.5 py-0.5 text-xs font-medium text-taupe backdrop-blur-sm">
          video
        </div>
      </div>

      <span className="mt-3 block font-handwriting text-[28px] text-ink">{item.caption}</span>
    </motion.button>
  )
}

function ImageCard({ item, index, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="media-card group relative overflow-hidden rounded-[1.5rem] border border-[#eaded7] bg-[#fffaf7] p-2 text-left shadow-soft"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      aria-label={`View photo: ${item.caption}`}
    >
      <div className="overflow-hidden rounded-[1rem]">
        <img
          src={item.src}
          alt={item.caption}
          className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <span className="mt-3 block font-handwriting text-[28px] text-ink">{item.caption}</span>
    </motion.button>
  )
}

function LightboxModal({ item, onClose, onPrev, onNext }) {
  // Close on Escape, navigate with arrow keys
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d2026]/70 p-4 backdrop-blur-[3px]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 12 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="relative w-full max-w-3xl rounded-[1.5rem] border border-[#f1e3dc] bg-[#fffaf7] p-3 shadow-soft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header row */}
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="font-handwriting text-2xl text-rose">{item.caption}</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#e4d3ca] bg-[#fff2eb] px-3 py-1.5 font-medium text-ink transition hover:bg-[#fbe7dd]"
          >
            Close
          </button>
        </div>

        {/* Media */}
        <div className="overflow-hidden rounded-[1rem] border border-[#edded7] bg-[#f5ece8]">
          {item.type === 'video' ? (
            <video
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              className="max-h-[70vh] w-full object-contain"
            />
          ) : (
            <img
              src={item.src}
              alt={item.caption}
              className="max-h-[70vh] w-full object-cover"
            />
          )}
        </div>

        {/* Nav row */}
        <div className="mt-4 flex items-center justify-between gap-3 text-ink">
          <button
            type="button"
            onClick={onPrev}
            className="rounded-full border border-[#e4d3ca] bg-[#fff3ec] px-4 py-2 font-medium transition hover:bg-[#f7e7df]"
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            className="rounded-full border border-[#e4d3ca] bg-[#fff3ec] px-4 py-2 font-medium transition hover:bg-[#f7e7df]"
          >
            Next →
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function MediaGallery({ items }) {
  const [selected, setSelected] = useState(null)

  const selectedIndex = selected ? items.findIndex((i) => i.id === selected.id) : -1

  const goPrev = () =>
    setSelected(items[(selectedIndex - 1 + items.length) % items.length])

  const goNext = () =>
    setSelected(items[(selectedIndex + 1) % items.length])

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        {items.map((item, index) =>
          item.type === 'video' ? (
            <VideoCard
              key={item.id}
              item={item}
              index={index}
              onClick={() => setSelected(item)}
            />
          ) : (
            <ImageCard
              key={item.id}
              item={item}
              index={index}
              onClick={() => setSelected(item)}
            />
          ),
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <LightboxModal
            item={selected}
            onClose={() => setSelected(null)}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </>
  )
}
