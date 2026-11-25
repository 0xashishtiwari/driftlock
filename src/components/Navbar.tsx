import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, Moon, Plane, Sun, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { createPortal } from 'react-dom'

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const reduceMotion = useReducedMotion()
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark'),
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [flight, setFlight] = useState<{ id: number; left: number; top: number } | null>(null)
  const flightId = useRef(0)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
    try {
      localStorage.setItem('driftlock-theme', isDark ? 'dark' : 'light')
    } catch {
      // Theme state still works for the current session if storage is unavailable.
    }
  }, [isDark])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!flight) return
    const timeout = window.setTimeout(() => setFlight(null), 2900)
    return () => window.clearTimeout(timeout)
  }, [flight])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-3 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled
            ? 'border-amber-900/15 bg-amber-50/90 shadow-none backdrop-blur-xl dark:border-orange-50/20 dark:bg-neutral-950/80'
            : 'border-transparent bg-transparent'
        }`}
        aria-label="Main navigation"
      >
        <a
          href="#top"
          className="flex items-center gap-2.5"
          aria-label="Driftlock home"
          onClick={(event) => {
            const bounds = event.currentTarget.querySelector('img')?.getBoundingClientRect()
              ?? event.currentTarget.getBoundingClientRect()
            setFlight({
              id: ++flightId.current,
              left: bounds.left + bounds.width / 2 - 24,
              top: bounds.top + bounds.height / 2 - 24,
            })
          }}
        >
          <img
            src="/driftlock-logo.svg"
            alt=""
            className="h-[52px] w-[42px] object-contain"
            width="42"
            height="52"
          />
          <span className="font-brand text-base font-semibold tracking-[-0.02em]">Driftlock</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm text-neutral-500 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-neutral-500 after:transition-all hover:text-neutral-950 hover:after:w-full dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsDark((current) => !current)}
            className="grid size-9 place-items-center rounded-full border border-neutral-300 text-neutral-600 transition-colors hover:border-neutral-500 hover:text-neutral-950 dark:border-neutral-700/60 dark:text-neutral-300 dark:hover:text-white"
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <a
            href="#demo"
            className="hidden items-center rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white sm:inline-flex"
          >
            Book a demo
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="grid size-9 place-items-center rounded-lg border border-neutral-300 dark:border-neutral-700/60 md:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
              className="absolute left-3 right-3 top-[calc(100%+8px)] rounded-xl border border-amber-900/15 bg-amber-50/95 p-2 backdrop-blur-xl dark:border-orange-50/15 dark:bg-neutral-950/95 md:hidden"
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#demo"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex items-center justify-between rounded-none rounded-tr-lg rounded-bl-lg border border-neutral-300 px-3 py-3 text-sm font-medium text-neutral-950 dark:border-neutral-700 dark:text-white"
              >
                Book a demo
                <ArrowUpRight className="size-4" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {flight && !reduceMotion && createPortal(
        <motion.div
          key={flight.id}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[60] text-amber-900 dark:text-orange-100"
          initial={{ x: flight.left, y: flight.top, opacity: 0, rotate: -10, scale: 0.65 }}
          animate={{
            x: [
              flight.left,
              flight.left + window.innerWidth * 0.2,
              flight.left + window.innerWidth * 0.7,
              window.innerWidth + 48,
            ],
            y: [flight.top, flight.top + 110, flight.top + 72, flight.top + 22],
            opacity: [0, 1, 1, 0],
            rotate: [-20, -30, -44, -55],
            scale: [0.65, 1.05, 1, 0.8],
          }}
          transition={{
            duration: 2.8,
            times: [0, 0.28, 0.78, 1],
            ease: ['easeOut', 'easeInOut', 'easeIn'],
          }}
        >
          <span className="absolute left-[-62px] top-1/2 h-px w-14 -translate-y-1/2 bg-gradient-to-l from-amber-900/70 to-transparent dark:from-orange-100/70" />
          <Plane className="relative size-12 rotate-45" strokeWidth={1.75} />
        </motion.div>,
        document.body,
      )}
      {flight && createPortal(
        <motion.span
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full border border-orange-50/20 bg-neutral-950/90 px-4 py-2 text-sm text-neutral-100 backdrop-blur-md"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 1, 1, 0], y: [8, 0, 0, -4] }}
          transition={reduceMotion ? { duration: 0 } : {
            duration: 2.8,
            times: [0, 0.15, 0.8, 1],
          }}
        >
          <Plane className="size-4 text-orange-100" />
          Back to the top
        </motion.span>,
        document.body,
      )}
    </header>
  )
}
