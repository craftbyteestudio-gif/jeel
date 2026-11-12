import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

export function EnvelopeCard({ label, note }) {
  const [opened, setOpened] = useState(false)

  return (
    <div className="group relative">
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpened((current) => !current)}
        // min-h instead of fixed h — text never overflows at any zoom level
        className="relative block min-h-[120px] sm:min-h-[140px] w-full cursor-pointer text-left focus:outline-none"
        aria-label={label}
      >
        <div className={`envelope h-full ${opened ? 'opened' : ''}`}>
          <div className="envelope-flap" />
          <div className="envelope-label font-handwriting text-xl sm:text-2xl text-ink">{label}</div>
        </div>
      </motion.button>

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            className="mt-3 sm:mt-4 rounded-[1.2rem] sm:rounded-[1.5rem] border border-[#eadad1] bg-[#fffaf6] p-4 sm:p-5 shadow-soft"
          >
            <div className="mx-auto max-w-xl text-sm sm:text-[15px] leading-relaxed text-ink">
              <p className="whitespace-pre-line">{note}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
