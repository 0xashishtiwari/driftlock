import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { motion, useReducedMotion } from 'motion/react'

const problems = [
  ['Silent changes', 'Third-party APIs change behavior or interfaces without warning.'],
  ['Reactive work', 'Teams lose time debugging breakage after users feel the impact.'],
  ['Unclear impact', 'Generic alerts do not identify every repo, client, or workflow affected.'],
]

export default function Problem() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="problem" className="mx-auto max-w-6xl px-6 py-20 sm:px-12 sm:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="The problem"
          title="API drift stays hidden until it becomes an outage."
          description="Most teams discover upstream changes through failing tests or customer reports."
          titleClassName="lg:whitespace-nowrap"
          containerClassName="max-w-full"
        />
      </Reveal>
      <div className="relative mt-14">
        <svg
          aria-hidden="true"
          className="absolute left-0 right-0 top-[8px] hidden h-[18px] w-full overflow-visible md:block"
          viewBox="0 0 100 18"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0 9 H13 M20 9 H47 M53 9 H80 M86 9 H100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.35"
            vectorEffect="non-scaling-stroke"
            className="text-neutral-800"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            d="M83 9 C88 9 88 14 93 14 H100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.28"
            vectorEffect="non-scaling-stroke"
            className="text-neutral-800/70"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.48, ease: 'easeOut' }}
          />
        </svg>

        <div className="absolute bottom-0 left-[4px] top-[9px] w-px bg-neutral-800/80 md:hidden" />

        <div className="grid gap-10 md:grid-cols-3 md:gap-0">
          {problems.map(([title, copy], index) => (
            <Reveal key={title} delay={index * 0.1} className="md:px-7 first:md:pl-0 last:md:pr-0">
              <article className="relative pl-5 md:pl-0">
                <motion.span
                  aria-hidden="true"
                  initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: reduceMotion ? 0 : 0.28, delay: reduceMotion ? 0 : 0.16 + index * 0.18 }}
                  className="absolute -left-[1px] top-0 size-[9px] rounded-full border border-neutral-500 bg-[#0a0a0a] md:-top-[1px] md:left-0 dark:bg-neutral-950"
                />
                {index === 2 && (
                  <span className="absolute -left-[1px] top-0 hidden size-[9px] md:block">
                    <span className="absolute left-[8px] top-[10px] h-px w-5 bg-neutral-800/70" />
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <p className="font-mono text-[11px] text-neutral-600">0{index + 1}</p>
                  {index === 1 && <span className="h-px w-7 bg-neutral-700/60" />}
                </div>
                <h3 className="mt-7 font-montserrat text-xl font-medium tracking-tight">{title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-neutral-600 dark:text-neutral-400">{copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
