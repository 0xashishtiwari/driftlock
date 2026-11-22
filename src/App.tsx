import './index.css'
import './App.css'
import { motion } from 'motion/react'
import { Button } from './components/ui/button'
import { AnimatedBadge } from './components/ui/animated-badge'
import { SectionHead } from './components/ui/section-head'
import { AlertCircle, Search, TrendingUp, ShieldCheck } from 'lucide-react'

export default function App() {
  return (
    <main className="relative z-10">
      <nav>
        <ul className="flex items-center gap-6 text-neutral-400 dark:text-neutral-500 text-sm font-medium">
          <li>
            <a href="#problem">Problem</a>
          </li>
          <li>
            <a href="#solution">Solution</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
          <li>
            <a href="#faq">FAQ</a>
          </li>
          <li>
            <a href="#demo" className="text-white dark:text-black">
              Book a demo
            </a>
          </li>
        </ul>
      </nav>

      <header className="pt-6 sm:pt-12">
        <AnimatedBadge>Trusted by enterprise platform teams</AnimatedBadge>
        <h1 className="text-[42px] font-semibold tracking-tight md:text-6xl lg:text-7xl">
          Catch API drift before it breaks production.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-neutral-400 dark:text-neutral-500">
          Driftlock detects upstream API changes, explains the code impact, and opens a pull request with the fix.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button variant="solid" className="btn-asym">
            Book a demo
            <ArrowUpRight className="-ml-1 size-4" aria-hidden />
          </Button>
          <Button variant="outline" className="btn-asym-mirror">
            See how it works
          </Button>
        </div>
      </header>
    </main>
  )
}