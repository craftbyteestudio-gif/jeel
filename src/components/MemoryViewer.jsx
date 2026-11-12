import { AnimatePresence, motion } from 'framer-motion'

export function MemoryViewer({ photo, onClose, onPrev, onNext }) {
  if (!photo) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d2026]/60 p-4 backdrop-blur-[2px]"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 18 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.98, opacity: 0, y: 10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl rounded-[1.5rem] border border-[#f1e3dc] bg-[#fffaf7] p-3 shadow-soft"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-3 flex items-center justify-between gap-3 text-sm text-taupe">
            <span className="font-handwriting text-2xl text-rose">{photo.caption}</span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[#e4d3ca] bg-[#fff2eb] px-3 py-1.5 font-medium text-ink transition hover:bg-[#fbe7dd]"
            >
              Close
            </button>
          </div>

          <div className="overflow-hidden rounded-[1rem] border border-[#edded7] bg-[#f5ece8]">
            <img
              src={photo.src}
              alt={photo.caption}
              className="max-h-[70vh] w-full object-contain"
            />
          </div>

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
    </AnimatePresence>
  )
}
