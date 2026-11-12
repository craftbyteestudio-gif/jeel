import { motion } from 'framer-motion'

export function PolaroidCard({
  image,
  caption,
  rotation = 0,
  className = '',
  title = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`relative mx-auto w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="tape tape-top" aria-hidden="true" />
      <div className="paper-card bg-[#fffdfb] p-3 shadow-soft">
        <div className="overflow-hidden border border-[#f0e7df] bg-[#f7efe9]">
          <img
            src={image}
            alt={title || caption || 'Memory'}
            // Responsive height: smaller on mobile, grows on larger screens
            className="h-[260px] w-full object-cover sm:h-[320px] md:h-[380px]"
            loading="lazy"
          />
        </div>
        <div className="mt-3 flex items-center justify-center">
          <p className="font-handwriting text-xl sm:text-2xl text-ink">{caption}</p>
        </div>
      </div>
    </motion.div>
  )
}
