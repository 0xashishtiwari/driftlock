import { ArrowUpRight, GitPullRequest, ShieldCheck } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { REPOSITORY_URL } from '../constants'

const headlineContainer = {
  hidden: {},
  visible: { transition: { delayChildren: 0.08, staggerChildren: 0.075 } },
}

const headlineWord = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const headlineColorWord = {
  hidden: { opacity: 0, y: 20, color: 'var(--foreground)' },
  visible: {
    opacity: 1,
    y: 0,
    color: ['var(--foreground)', 'var(--highlight)', 'var(--foreground)'],
  },
}

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <header id="top" className="relative mx-auto max-w-6xl px-6 pb-20 pt-36 sm:px-12 sm:pb-28 sm:pt-44">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.5 }}
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
            Artifact-only MVP · Execution disabled
          </motion.span>
        </motion.div>
        <motion.h1
          className="font-montserrat text-[42px] font-semibold leading-[1.02] tracking-[-0.055em] md:text-6xl lg:text-7xl"
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.7 }}
          variants={headlineContainer}
        >
          <motion.span variants={headlineColorWord}>Catch </motion.span>
          <motion.span variants={headlineWord} className="highlight">API drift</motion.span>{' '}
          <motion.span variants={headlineColorWord}>before </motion.span>
          <motion.span variants={headlineColorWord}>it </motion.span>
          <motion.span variants={headlineColorWord}>breaks </motion.span>
          <motion.span variants={headlineColorWord}>production.</motion.span>
        </motion.h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-600 md:text-xl dark:text-neutral-400">
          Phase 1 gate blocked until A06/Q06 acceptance evidence exists. Driftlock is currently scoped to artifacts;
          {' '}<span className="highlight">execution is disabled.</span>
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={REPOSITORY_URL}
            target="_blank"
            rel="noreferrer"
            className="font-montserrat inline-flex w-full items-center justify-center gap-2 rounded-none rounded-tr-lg rounded-bl-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 dark:bg-white dark:text-neutral-950 sm:w-auto"
          >
            View Repository
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduceMotion ? 0 : 0.15, duration: reduceMotion ? 0 : 0.6 }}
        className="mx-auto mt-14 max-w-4xl"
      >
        <p className="mb-3 text-center font-mono text-[11px] text-neutral-500">
          Illustrative workflow preview · synthetic data · not a live system
        </p>
        <div className="grid grid-cols-1 gap-3 text-left sm:grid-cols-6 sm:grid-rows-2">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.25, duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="card-chai min-h-44 p-5 sm:col-span-4 sm:row-span-1"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] text-neutral-500">Drift timeline</p>
              <span className="text-[11px] text-neutral-500">Synthetic data</span>
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
                  initial={reduceMotion ? { height: `${height}%` } : { height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{
                    delay: reduceMotion ? 0 : 0.45 + index * 0.045,
                    duration: reduceMotion ? 0 : 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.35, duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="card-chai min-h-44 p-5 sm:col-span-2"
          >
            <ShieldCheck className="size-5 text-green-600 dark:text-green-400" />
            <motion.p
              className="mt-10 font-montserrat text-4xl font-medium tracking-tight"
              initial={reduceMotion ? false : { y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: reduceMotion ? 0 : 0.65, duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-neutral-950 dark:text-neutral-100">14</span>
            </motion.p>
            <p className="mt-2 text-sm text-neutral-500">Example APIs</p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.45, duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="card-chai p-5 sm:col-span-3"
          >
            <p className="font-mono text-[11px] text-neutral-500">Latest change</p>
            <motion.div
              className="mt-5 flex items-end justify-between"
              initial={reduceMotion ? false : { y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: reduceMotion ? 0 : 0.7, duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <p className="font-mono text-sm">GET /v2/invoices</p>
                <p className="mt-1 text-xs text-neutral-500">Example response change</p>
              </div>
              <span className="text-xs text-red-600 dark:text-red-300">Breaking</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.55, duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="card-chai p-5 sm:col-span-3"
          >
            <p className="font-mono text-[11px] text-neutral-500">Remediation</p>
            <motion.div
              className="mt-5 flex items-end justify-between"
              initial={reduceMotion ? false : { y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: reduceMotion ? 0 : 0.78, duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <p className="font-mono text-sm">billing-client</p>
                <p className="mt-1 text-xs text-neutral-500">Illustrative fix</p>
              </div>
              <GitPullRequest className="size-4 text-neutral-500" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </header>
  )
}
