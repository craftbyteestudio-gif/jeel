import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EnvelopeCard } from './components/EnvelopeCard'
import { MediaGallery } from './components/MediaGallery'
import { MemoryViewer } from './components/MemoryViewer'
import { PolaroidCard } from './components/PolaroidCard'
import { birthday } from './data/birthday'
import { StoryTimeline } from './sections/StoryTimeline'

const memoryPhotos = [
  { id: 1, type: 'image', caption: 'you looked so lovely here', src: '/Screenshot 2026-11-12 201542.png' },
  { id: 2, type: 'image', caption: 'that smile though', src: '/Screenshot 2026-11-12 201602.png' },
  { id: 3, type: 'image', caption: 'this one is a favourite', src: '/Screenshot 2026-11-12 201613.png' },
  { id: 4, type: 'image', caption: 'genuinely radiant', src: '/Screenshot 2026-11-12 201623.png' },
  { id: 5, type: 'image', caption: 'one for the wall', src: '/Screenshot 2026-11-12 202030.png' },
  { id: 6, type: 'image', caption: 'just being you', src: '/Screenshot 2026-11-12 202105.png' },
  { id: 7, type: 'image', caption: 'always', src: '/Screenshot 2026-11-12 202123.png' },
  { id: 8, type: 'image', caption: 'keep this one forever', src: '/Screenshot 2026-11-12 202138.png' },
  { id: 9, type: 'image', caption: 'my favourite one', src: '/Screenshot 2026-11-12 202149.png' },
]

const jeelVideos = [
  { id: 'v1', type: 'video', caption: 'a moment I keep coming back to', src: '/Video-3889.mp4', poster: '/Screenshot 2026-11-12 201542.png' },
  { id: 'v2', type: 'video', caption: 'this one made me smile', src: '/Video-43622.mp4', poster: '/Screenshot 2026-11-12 201602.png' },
  { id: 'v3', type: 'video', caption: 'I could watch this on loop', src: '/Video-44088.mp4', poster: '/Screenshot 2026-11-12 201613.png' },
  { id: 'v4', type: 'video', caption: 'just being herself', src: '/Video-99863.mp4', poster: '/Screenshot 2026-11-12 201623.png' },
]

const loveList = [
  'the way you carry yourself',
  'your smile, honestly',
  'the way you seem to light up a room',
  'your expressions — they say everything',
  'how genuine you seem in everything you do',
  'the energy you bring to people around you',
  'the little details that make you, you',
  'your laugh',
  'the way you make ordinary things feel special',
  'just you, being you',
]

const storyItems = [
  { title: 'From the beginning', description: 'I noticed you from a distance. No grand moment — just a quiet realisation that you were someone worth paying attention to.' },
  { title: 'Learning about you', description: 'Slowly, through the little things — your words, your moments, the way you are — I started to understand why you stayed on my mind.' },
  { title: 'The feeling grew', description: 'Without any conversation, without meeting in person, something still felt familiar. Like I already knew I liked who you were.' },
  { title: 'Still from a distance', description: 'We have never spoken, never crossed paths. But that never stopped how genuine this feels.' },
  { title: 'Happy Birthday, Jeel 🎂', description: 'I may be a stranger to you, but you have been someone quietly special to me. I hope today is as bright as you are.' },
]

const futureMemories = [
  'meet someday, actually',
  'have a proper conversation',
  'take a photo together',
  'go on a random coffee trip',
  'watch a sunset somewhere new',
  'have a completely unnecessary long walk',
  'make each other laugh',
  'just say hello one day',
]

const envelopeNotes = [
  {
    label: 'Open when you feel unseen',
    note: `Hey.\n\nI know we have never met. I know you probably do not even know I exist. But I want you to know that someone out there sees you — the real you, not just the surface.\n\nThe way you carry yourself, the way you laugh, the small things you do that you probably don't even notice — they matter. They have made an impression on someone who has never even had the chance to say hello.\n\nYou are more noticeable than you think. In the best possible way. ❤️`,
  },
  {
    label: 'Open when you are having a hard day',
    note: `Hey.\n\nIf today is heavy, I hope this is at least a small reminder that someone out there is quietly rooting for you.\n\nI don't know your struggles. I don't know what you are carrying right now. But I know that someone who notices the good in you from a distance believes you are strong enough to get through it.\n\nOne breath. One step. You have got this. ❤️`,
  },
  {
    label: 'Open when you need a smile',
    note: `Hey — I am imagining the face you make when you are trying not to laugh at something ridiculous and completely failing.\n\nThat face is honestly one of the best things about you, even though we have never met.\n\nYou are funny, warm, and a lot more charming than you probably realise. And somewhere out there, someone is smiling just thinking about you.\n\nThat someone is me. 😌`,
  },
  {
    label: 'Open because you are curious 👀',
    note: `Okay, so you opened this one.\n\nHonestly? I appreciate the curiosity.\n\nI just want to say — this isn't creepy, I promise. This is just someone who admires you from a respectful distance and wanted to say something kind on your birthday. No strings, no expectations.\n\nYou seem like a genuinely good person. And good people deserve to hear that every once in a while.\n\nHappy Birthday, Jeel. ❤️`,
  },
]

const initialCheckedState = Object.fromEntries(futureMemories.map((item) => [item, false]))

// Reusable responsive heading — large on desktop, comfortable on mobile
function SectionHeading({ children, className = '' }) {
  return (
    <p className={`font-handwriting text-3xl sm:text-4xl md:text-5xl text-ink ${className}`}>
      {children}
    </p>
  )
}

function App() {
  const prefersReducedMotion = useReducedMotion()
  const [openingView, setOpeningView] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [foundHearts, setFoundHearts] = useState([])
  const [wishMade, setWishMade] = useState(false)
  const [finalOpened, setFinalOpened] = useState(false)
  const [checkedItems, setCheckedItems] = useState(initialCheckedState)
  const [shareMessage, setShareMessage] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.35
  }, [])

  const selectedIndex = selectedPhoto
    ? memoryPhotos.findIndex((photo) => photo.id === selectedPhoto.id)
    : -1

  const totalHeartsNeeded = 5
  const allHeartsFound = foundHearts.length === totalHeartsNeeded

  const sectionReveal = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.08 },
    transition: { duration: prefersReducedMotion ? 0.01 : 0.55, ease: 'easeOut' },
  }

  const toggleMusic = async () => {
    const source = birthday.song
    const audio = audioRef.current
    if (!audio) return
    if (audio.src !== window.location.origin + source) audio.src = source
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }
    try {
      await audio.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  const handleHeartClick = (heartId) => {
    setFoundHearts((current) => {
      if (current.includes(heartId)) return current
      return [...current, heartId]
    })
  }

  const handleCheckboxToggle = (item) => {
    setCheckedItems((current) => ({ ...current, [item]: !current[item] }))
  }

  const selectedMemories = futureMemories.filter((item) => checkedItems[item])
  const waMessage = selectedMemories.length > 0
    ? `Hey Vivek! My picks from your page:\n${selectedMemories.map((item) => `- ${item}`).join('\n')}`
    : ''

  const handleSendPicks = (event) => {
    if (selectedMemories.length === 0) {
      event.preventDefault()
      setShareMessage('Tick at least one thing first. 😊')
      return
    }
    setShareMessage('Opening WhatsApp... 💬')
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-bg text-ink">
      <audio ref={audioRef} preload="auto" loop />

      {/* Music button — smaller on mobile */}
      <button
        type="button"
        onClick={toggleMusic}
        className="music-button fixed bottom-4 right-4 z-40 rounded-full border border-[#ddc4ba] bg-[#fffaf7]/90 px-3 py-2 shadow-soft backdrop-blur-sm transition hover:bg-[#fff1ea]"
      >
        {isPlaying ? '❚❚ Alfaaz' : '♫ Alfaaz'}
      </button>

      {/* Opening screen */}
      <AnimatePresence>
        {!openingView && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.7 } }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#fff8f5]/95 px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -18 }}
              transition={{ duration: 0.4 }}
              className="paper-card w-full max-w-xl bg-[#fffdfb] p-6 sm:p-8 text-center"
            >
              <p className="font-handwriting text-4xl sm:text-5xl md:text-6xl text-ink">Hey, Jeel... 👀</p>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-taupe">Someone made something for you.</p>
              <button
                type="button"
                onClick={() => {
                  setOpeningView(true)
                  const audio = audioRef.current
                  if (!audio) return
                  audio.src = birthday.song
                  audio.volume = 0.35
                  audio.play().then(() => setIsPlaying(true)).catch(() => {})
                }}
                className="paper-button mt-6 sm:mt-8"
              >
                Open it ❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-8 lg:px-8 ${!openingView ? 'invisible h-0 overflow-hidden' : ''}`}
        aria-hidden={!openingView}
      >
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
          animate={openingView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, ease: 'easeOut', delay: 0.15 }}
          className="pt-2 sm:pt-6 md:pt-10"
        >
          {/* Stack on mobile, side-by-side on md+ */}
          <div className="grid items-center gap-6 sm:gap-8 md:grid-cols-[1.1fr_1fr]">
            <div className="paper-card bg-[#fffaf6] p-5 sm:p-8">
              <p className="font-handwriting text-4xl sm:text-5xl md:text-6xl text-ink">
                Happy Birthday,
                <br />
                {birthday.nickName} ❤️
              </p>
              <p className="mt-4 sm:mt-6 max-w-md text-sm sm:text-base leading-relaxed text-taupe sm:text-lg">
                This is not a wrapped gift. But it is something made with a lot of genuine feeling — just for you.
              </p>
            </div>
            <div>
              <PolaroidCard
                image="/Screenshot 2026-11-12 202149.png"
                caption="someone worth knowing"
                rotation={-4}
                title={birthday.herName}
              />
            </div>
          </div>
        </motion.header>

        {/* Letter */}
        <motion.section {...sectionReveal} className="mt-10 sm:mt-14 md:mt-20">
          <div className="notebook p-5 sm:p-8 lg:p-10">
            <div className="mb-5 sm:mb-6">
              <SectionHeading>A few honest words.</SectionHeading>
            </div>
            <div className="mx-auto max-w-3xl space-y-5 sm:space-y-6 text-base sm:text-[17px] leading-relaxed text-ink sm:text-lg">
              <p>I know this might feel a little unexpected. We have never met. We have never had a conversation. And yet, here I am — having made something for you on your birthday.</p>
              <p>I want to be honest: I like you. Not in an overwhelming way, not in a way that asks anything from you. Just quietly, genuinely — the kind of like that simply is what it is.</p>
              <p>There is something about the way you carry yourself, the way you seem to care about things, the small details that make you uniquely you — they stayed with me without me even trying.</p>
              <p>I never said anything. I probably never will in some dramatic way. But on your birthday, I thought the least I could do was let you know that someone out there sees you clearly — and thinks very highly of who you are.</p>
              <p>You deserve a good one, Jeel. I genuinely hope today is bright and kind to you.</p>
            </div>
            <p className="mt-8 sm:mt-10 text-right font-handwriting text-3xl sm:text-4xl text-ink">— Vivek ❤️</p>
          </div>
        </motion.section>

        {/* Photo memories grid */}
        <motion.section {...sectionReveal} className="mt-10 sm:mt-16 md:mt-20">
          <div className="mb-6 sm:mb-8">
            <SectionHeading>moments worth keeping</SectionHeading>
          </div>
          <div className="grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
            {memoryPhotos.map((photo, index) => (
              <motion.button
                key={photo.id}
                type="button"
                onClick={() => setSelectedPhoto(photo)}
                className="photo-grid-card group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeOut' }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="photo-grid-img-wrap">
                  <img src={photo.src} alt={photo.caption} className="photo-grid-img" loading="lazy" />
                </div>
                <span className="mt-2 sm:mt-3 block font-handwriting text-xl sm:text-[26px] text-ink leading-snug">{photo.caption}</span>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Video gallery */}
        <motion.section {...sectionReveal} className="mt-10 sm:mt-16 md:mt-20">
          <div className="mb-6 sm:mb-8">
            <SectionHeading>a little more of you</SectionHeading>
            <p className="mt-2 text-sm sm:text-base text-taupe">Videos — the moments I keep replaying.</p>
          </div>
          <MediaGallery items={jeelVideos} />
        </motion.section>

        {/* Things I love */}
        <motion.section {...sectionReveal} className="mt-10 sm:mt-16 md:mt-20">
          <div className="notebook p-5 sm:p-8 lg:p-10">
            <SectionHeading>Things I quietly love about you</SectionHeading>
            <ul className="mt-6 sm:mt-8 grid gap-2 sm:gap-3 text-base sm:text-lg sm:grid-cols-2">
              {loveList.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.06, duration: 0.3 }}
                  className="flex items-center gap-3 rounded-full border border-[#ead7d1] bg-[#fffaf6] px-4 py-2 sm:py-3"
                >
                  <span className="text-[#b94e6b]">♡</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Story timeline */}
        <motion.section {...sectionReveal} className="mt-10 sm:mt-16 md:mt-20">
          <div className="mb-5 sm:mb-6">
            <SectionHeading>how it went</SectionHeading>
          </div>
          <div className="story-board p-4 sm:p-6 md:p-8">
            <StoryTimeline items={storyItems} />
          </div>
        </motion.section>

        {/* Secret envelopes */}
        <motion.section {...sectionReveal} className="mt-10 sm:mt-16 md:mt-20">
          <div className="mb-5 sm:mb-6">
            <SectionHeading>secret envelopes</SectionHeading>
          </div>
          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
            {envelopeNotes.map((envelope) => (
              <EnvelopeCard key={envelope.label} label={envelope.label} note={envelope.note} />
            ))}
          </div>
        </motion.section>

        {/* Hidden hearts game */}
        <motion.section {...sectionReveal} className="mt-10 sm:mt-16 md:mt-20">
          <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-[#eed7cf] bg-[#fffaf7] p-5 sm:p-8 shadow-soft">
            <SectionHeading>One tiny game before you go.</SectionHeading>
            <p className="mt-2 text-sm sm:text-lg text-taupe">I hid 5 tiny hearts somewhere on this page.</p>

            <div className="mt-6 sm:mt-8 flex items-center justify-between gap-3">
              <p className="font-handwriting text-2xl sm:text-3xl text-ink">Found: {foundHearts.length} / {totalHeartsNeeded}</p>
              {allHeartsFound && (
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-sm italic text-rose">
                  You found all of them. 🎉
                </motion.p>
              )}
            </div>

            <div className="relative mt-6 sm:mt-8 h-[160px] sm:h-[180px] rounded-[1.2rem] sm:rounded-[1.5rem] border border-dashed border-[#d7c4bc] bg-[#fff2eb]">
              {[
                { id: 'heart-1', style: { left: '10%', top: '18%' }, label: 'Hidden heart one' },
                { id: 'heart-2', style: { right: '14%', top: '16%' }, label: 'Hidden heart two' },
                { id: 'heart-3', style: { left: '42%', bottom: '16%' }, label: 'Hidden heart three' },
                { id: 'heart-4', style: { left: '65%', top: '30%' }, label: 'Hidden heart four' },
                { id: 'heart-5', style: { left: '25%', bottom: '10%' }, label: 'Hidden heart five' },
              ].map(({ id, style, label }) => (
                <motion.button
                  key={id}
                  type="button"
                  onClick={() => handleHeartClick(id)}
                  className="heart-doodle"
                  style={style}
                  aria-label={label}
                  animate={foundHearts.includes(id) ? { scale: 1.4, backgroundColor: 'rgba(185,78,107,0.4)' } : {}}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  ♥
                </motion.button>
              ))}
            </div>

            {allHeartsFound && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 sm:mt-8 rounded-[1.2rem] sm:rounded-[1.5rem] border border-[#eaded7] bg-[#fffaf6] p-4 sm:p-5 text-center"
              >
                <p className="font-handwriting text-3xl sm:text-4xl text-ink">You found all of them.</p>
                <p className="mt-2 sm:mt-3 text-base sm:text-lg text-taupe">But honestly...</p>
                <p className="mt-2 font-handwriting text-4xl sm:text-5xl text-rose">I think I found the best one already. ❤️</p>
                <p className="mt-4 sm:mt-5 font-handwriting text-5xl sm:text-6xl text-ink">you.</p>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Starfield wish */}
        <motion.section {...sectionReveal} className="mt-10 sm:mt-16 md:mt-20">
          <div className="starfield rounded-[1.5rem] sm:rounded-[2rem] border border-[#c9a66b]/30 bg-[#4d2b30] p-5 sm:p-8 text-[#fffaf5] shadow-soft">
            <SectionHeading className="text-[#fff3eb]">Before you leave...</SectionHeading>
            <p className="mt-3 sm:mt-4 font-handwriting text-3xl sm:text-4xl text-[#f7d7db]">Close your eyes.</p>
            <p className="mt-1 sm:mt-2 font-handwriting text-3xl sm:text-4xl text-[#f7d7db]">Make one wish.</p>
            <div className="mt-6 sm:mt-8">
              {!wishMade ? (
                <button type="button" onClick={() => setWishMade(true)} className="paper-button bg-[#fffaf5] text-[#4d2b30]">
                  I made my wish ✨
                </button>
              ) : (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 sm:space-y-3">
                  <p className="font-handwriting text-4xl sm:text-5xl text-[#fff3eb]">I hope it comes true.</p>
                  <p className="text-sm sm:text-base text-[#f6e7e7]">And if it doesn&apos;t...</p>
                  <p className="font-handwriting text-3xl sm:text-4xl text-[#f6d9dc]">we&apos;ll make another wish next year.</p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Things we haven't done yet */}
        <motion.section {...sectionReveal} className="mt-10 sm:mt-16 md:mt-20">
          <div className="mb-5 sm:mb-6">
            <SectionHeading>Things I&apos;d love to do someday...</SectionHeading>
            <p className="mt-2 text-sm sm:text-base text-taupe">Pick the ones you would want too. 😊</p>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {futureMemories.map((item) => (
              <label
                key={item}
                className="flex cursor-pointer items-center gap-3 rounded-[1.2rem] border border-[#e7d6cd] bg-[#fffaf6] p-3 sm:p-4 shadow-soft transition hover:-translate-y-0.5 hover:bg-[#fff4ef]"
              >
                <button
                  type="button"
                  onClick={() => handleCheckboxToggle(item)}
                  className={`checkbox-box ${checkedItems[item] ? 'checked' : ''}`}
                  aria-label={`Mark ${item}`}
                >
                  {checkedItems[item] && <span>✓</span>}
                </button>
                <span className="font-handwriting text-2xl sm:text-[27px] text-ink leading-tight">{item}</span>
              </label>
            ))}
          </div>
          <div className="mt-5 sm:mt-6 text-center">
            <a
              href={`https://wa.me/919106129458?text=${encodeURIComponent(waMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSendPicks}
              className="paper-button"
            >
              💬 Send picks on WhatsApp
            </a>
            <p className="mt-3 min-h-6 text-sm text-taupe" role="status" aria-live="polite">
              {shareMessage}
            </p>
          </div>
        </motion.section>

        {/* Final letter */}
        <motion.section {...sectionReveal} className="mt-10 pb-8 sm:mt-16 sm:pb-10 md:mt-20">
          <div className="mx-auto flex max-w-2xl justify-center">
            {!finalOpened ? (
              <motion.div layout className="paper-card paper-letter relative w-full max-w-xl bg-[#fffaf6] p-6 sm:p-8 text-center">
                <SectionHeading>One last thing...</SectionHeading>
                <button type="button" onClick={() => setFinalOpened(true)} className="paper-button mt-5 sm:mt-7">
                  Open it
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="paper-card relative w-full max-w-2xl overflow-hidden bg-[#fffaf6] p-6 sm:p-8 shadow-soft"
              >
                <div className="mx-auto max-w-xl space-y-4 sm:space-y-5 text-base sm:text-[17px] leading-relaxed text-ink">
                  <SectionHeading>Happy Birthday, {birthday.nickName}. ❤️</SectionHeading>
                  <p>You do not know me. And that is completely okay. I did not make this to make things weird — I made it because I think you are genuinely a good person, and good people deserve to be celebrated properly.</p>
                  <p>I hope this year brings you exactly the kind of joy you deserve. I hope you smile more, feel lighter, do the things you have been putting off, and find little moments that make everything feel worth it.</p>
                  <p>You have made an impression on someone who has never even had the chance to say hello. That, honestly, says a lot about who you are.</p>
                  <p>Happy Birthday, {birthday.nickName}. Genuinely.</p>
                  <p className="font-handwriting text-3xl sm:text-4xl text-ink">— Vivek ❤️</p>
                  <p className="pt-3 sm:pt-4 font-handwriting text-2xl sm:text-3xl text-rose">PS: I spent way too long on this. 😂</p>
                </div>
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                  {Array.from({ length: 16 }).map((_, index) => (
                    <span
                      key={index}
                      className="confetti"
                      style={{ left: `${(index * 13) % 100}%`, top: `${(index * 19) % 100}%`, animationDelay: `${index * 0.06}s` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>
      </div>

      <MemoryViewer
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onPrev={() => setSelectedPhoto(memoryPhotos[(selectedIndex - 1 + memoryPhotos.length) % memoryPhotos.length])}
        onNext={() => setSelectedPhoto(memoryPhotos[(selectedIndex + 1) % memoryPhotos.length])}
      />
    </main>
  )
}

export default App
