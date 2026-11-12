import { motion } from 'framer-motion'

export function StoryTimeline({ items }) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="relative mt-8 flex flex-col items-center gap-6">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#d7c3b8]" aria-hidden="true" />

        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
            className={`relative w-full max-w-md ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}
          >
            <div className="story-note">
              <span className="font-handwriting text-3xl text-rose">{item.title}</span>
              <p className="mt-2 text-sm leading-relaxed text-ink">{item.description}</p>
            </div>
            <div className="story-pin" aria-hidden="true" />
            {index < items.length - 1 && (
              <div className="flex justify-center py-2 text-[#9a7d74]">↓</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
