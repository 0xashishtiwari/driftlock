import { ArrowRight, ArrowUpRight, GitPullRequest, ShieldCheck } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <header id="top" className="relative mx-auto max-w-6xl px-6 pb-20 pt-36 sm:px-12 sm:pb-28 sm:pt-44">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl text-center"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hero-border-light relative mb-7 inline-flex items-center gap-2 rounded-full border border-amber-900/15 bg-white/60 px-3 py-1.5 text-xs text-neutral-600 backdrop-blur-sm dark:border-orange-50/15 dark:bg-black/10 dark:text-neutral-400"
        >
          <motion.span
            className="relative size-1.5 rounded-full bg-neutral-800 dark:bg-orange-100"
            animate={reduceMotion ? { opacity: 1 } : { opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.span
              className="absolute inset-0 rounded-full bg-orange-200"
              animate={reduceMotion ? { opacity: 0 } : { scale: [1, 2.4], opacity: [0.5, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            />
          </motion.span>
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, x: 4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.28, duration: 0.4 }}
          >
            API reliability for modern teams
          </motion.span>
        </motion.div>
        <h1 className="font-montserrat text-[42px] font-semibold leading-[1.02] tracking-[-0.055em] md:text-6xl lg:text-7xl">
          Catch API drift before it breaks production.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-600 md:text-xl dark:text-neutral-400">
          Driftlock detects upstream API changes, explains the code impact, and opens a pull request with the fix.
          {' '}<span className="highlight">Monitor with confidence.</span>
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#demo"
            className="font-montserrat inline-flex w-full items-center justify-center gap-2 rounded-none rounded-tr-lg rounded-bl-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 dark:bg-white dark:text-neutral-950 sm:w-auto"
          >
            Book a demo
            <ArrowUpRight className="size-4" />
          </a>
          <a
            href="#solution"
            className="btn-asym-mirror inline-flex w-full items-center justify-center gap-2 border border-neutral-300 px-5 py-3 text-sm font-medium transition-colors hover:border-neutral-500 dark:border-neutral-700 sm:w-auto"
          >
            See how it works
            <ArrowRight className="size-4" />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="mx-auto mt-14 max-w-4xl"
      >
        <div className="grid grid-cols-1 gap-3 text-left sm:grid-cols-6 sm:grid-rows-2">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="card-chai min-h-44 p-5 sm:col-span-4 sm:row-span-1"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] text-neutral-500">Drift timeline</p>
              <span className="text-[11px] text-neutral-500">Last 24h</span>
            </div>
            <div className="mt-8 flex h-20 items-end gap-2" aria-label="API drift activity chart">
              {[42, 58, 36, 68, 52, 82, 48, 74, 64, 88, 56, 72].map((height, index) => (
                <motion.span
                  key={index}
                  className={`flex-1 rounded-t-sm ${
                    index === 9
                      ? 'bg-purple-500/70'
                      : 'bg-neutral-300/80 dark:bg-neutral-700/80'
                  }`}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.45 + index * 0.045, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="card-chai min-h-44 p-5 sm:col-span-2"
          >
            <ShieldCheck className="size-5 text-green-600 dark:text-green-400" />
            <motion.p
              className="mt-10 font-montserrat text-4xl font-medium tracking-tight"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-neutral-950 dark:text-neutral-100">14</span>
            </motion.p>
            <p className="mt-2 text-sm text-neutral-500">APIs monitored</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="card-chai p-5 sm:col-span-3"
          >
            <p className="font-mono text-[11px] text-neutral-500">Latest change</p>
            <motion.div
              className="mt-5 flex items-end justify-between"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <p className="font-mono text-sm">GET /v2/invoices</p>
                <p className="mt-1 text-xs text-neutral-500">Response shape changed</p>
              </div>
              <span className="text-xs text-red-600 dark:text-red-300">Breaking</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="card-chai p-5 sm:col-span-3"
          >
            <p className="font-mono text-[11px] text-neutral-500">Remediation</p>
            <motion.div
              className="mt-5 flex items-end justify-between"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.78, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <p className="font-mono text-sm">billing-client</p>
                <p className="mt-1 text-xs text-neutral-500">Fix generated</p>
              </div>
              <GitPullRequest className="size-4 text-neutral-500" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </header>
  )
}
