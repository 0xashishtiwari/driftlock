import { motion, useReducedMotion } from 'motion/react'

export default function Footer() {
  const reduceMotion = useReducedMotion()

  return (
    <footer className="border-t border-neutral-200/80 dark:border-neutral-800/30">
      <div className="mx-auto max-w-6xl px-6 pt-8 sm:px-12 sm:pt-10">
        <a
          href="#top"
          aria-label="Back to top"
          className="group relative block overflow-hidden border-t border-neutral-200/80 py-5 text-center dark:border-neutral-800/30"
        >
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-brand block whitespace-nowrap text-[23vw] font-semibold leading-[0.72] tracking-[-0.08em] text-neutral-950 transition-colors duration-500 group-hover:text-neutral-500 dark:text-neutral-100 dark:group-hover:text-neutral-500 sm:text-[16rem]"
          >
            Driftlock
          </motion.span>
          <motion.span
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: reduceMotion ? 0 : 0.35, duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-1 left-1/2 h-px w-[86%] origin-center -translate-x-1/2 bg-neutral-400/50 dark:bg-neutral-700/80"
          />
        </a>
        <div className="flex flex-col gap-2 py-5 text-xs text-neutral-500 dark:text-neutral-600 sm:flex-row sm:justify-between">
          <span>© 2026 Driftlock</span>
          <span>Detect, explain, fix, review</span>
        </div>
      </div>
    </footer>
  )
}
