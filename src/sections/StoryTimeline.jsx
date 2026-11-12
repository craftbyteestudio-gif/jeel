import { motion } from 'framer-motion'

export function StoryTimeline({ items }) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative mt-6 flex flex-col items-center gap-5">
        {/* Vertical line — hidden on mobile, shown md+ */}
        <div
          className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#d7c3b8] md:block"
          aria-hidden="true"
        />

        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
            // Mobile: full width centered. md+: alternate left/right
            className={`relative w-full md:max-w-[55%] ${
              index % 2 === 0 ? 'md:mr-auto md:pr-6' : 'md:ml-auto md:pl-6'
            }`}
          >
            <div className="story-note">
              <span className="font-handwriting text-2xl sm:text-3xl text-rose">{item.title}</span>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-ink">{item.description}</p>
            </div>
            {/* Pin — only on md+ where the center line exists */}
            <div className="story-pin hidden md:block" aria-hidden="true" />
            {index < items.length - 1 && (
              <div className="flex justify-center py-2 text-[#9a7d74]">↓</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
