import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark'),
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav
        className={`mx-auto flex max-w-3xl items-center justify-between rounded-full border px-3 py-2.5 transition-all duration-300 sm:px-4 ${
          scrolled
            ? 'border-amber-900/15 bg-white/80 shadow-none backdrop-blur-xl dark:border-orange-50/20 dark:bg-neutral-950/80'
            : 'border-amber-900/10 bg-white/55 backdrop-blur-md dark:border-orange-50/10 dark:bg-neutral-950/40'
        }`}
        aria-label="Main navigation"
      >
        <a href="#top" className="flex items-center gap-2.5" aria-label="Driftlock home">
          <img
            src="/driftlock-logo.svg"
            alt=""
            className="size-8 rounded-lg"
            width="32"
            height="32"
          />
          <span className="font-brand text-base font-semibold tracking-[-0.02em]">Driftlock</span>
        </a>

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
            className="font-montserrat hidden items-center gap-2 rounded-none rounded-tr-lg rounded-bl-lg bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 dark:bg-white dark:text-neutral-950 sm:inline-flex"
          >
            Book a demo
            <ArrowUpRight className="size-4" />
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

        {menuOpen && (
          <div className="absolute left-3 right-3 top-[calc(100%+8px)] rounded-xl border border-amber-900/15 bg-white/95 p-2 backdrop-blur-xl dark:border-orange-50/15 dark:bg-neutral-950/95 md:hidden">
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
              className="mt-2 flex items-center justify-between rounded-none rounded-tr-lg rounded-bl-lg bg-white px-3 py-3 text-sm font-semibold text-neutral-950"
            >
              Book a demo
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}
