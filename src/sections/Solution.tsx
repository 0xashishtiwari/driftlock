import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

const steps = [
  {
    title: 'Detect',
    copy: 'Monitor external APIs and behavior continuously.',
  },
  {
    title: 'Explain',
    copy: 'Map each change to the code paths it can affect.',
  },
  {
    title: 'Fix',
    copy: 'Generate a focused remediation for the impacted repository.',
  },
  {
    title: 'Review',
    copy: 'Open a pull request ready for your team to approve.',
  },
] as const

function Preview({ active }: { active: number }) {
  return (
    <div className="relative min-h-[340px] overflow-hidden rounded-lg border border-neutral-800/70 bg-[#0d0d0d] sm:min-h-[360px]">
      <div className="flex h-11 items-center justify-between border-b border-neutral-800/70 px-4">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-neutral-600" />
          <span className="size-1.5 rounded-full bg-neutral-700" />
          <span className="size-1.5 rounded-full bg-neutral-800" />
        </div>
        <span className="font-mono text-[10px] text-neutral-500">
          driftlock / {active === 3 ? 'pull-request' : 'incident'}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {active === 0 && (
          <motion.div
            key="detect"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="p-5 sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] text-neutral-500">External incident</p>
                <p className="mt-2 font-mono text-sm text-neutral-100">GET /v2/invoices</p>
              </div>
              <span className="border-l border-red-400/40 pl-3 text-xs text-red-300">422 to 200</span>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-neutral-800 bg-neutral-800">
              <div className="bg-[#0d0d0d] p-4">
                <p className="text-[11px] text-neutral-500">Response time</p>
                <p className="mt-2 font-mono text-xl text-neutral-200">184 ms</p>
                <p className="mt-1 text-xs text-neutral-500">Baseline 96 ms</p>
              </div>
              <div className="bg-[#0d0d0d] p-4">
                <p className="text-[11px] text-neutral-500">Schema</p>
                <p className="mt-2 font-mono text-sm text-neutral-200">currency</p>
                <p className="mt-1 text-xs text-red-300">Type changed</p>
              </div>
            </div>
          </motion.div>
        )}

        {active === 1 && (
          <motion.div
            key="explain"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="p-5 sm:p-6"
          >
            <p className="font-mono text-[11px] text-neutral-500">Affected dependency map</p>
            <div className="mt-5 space-y-px overflow-hidden rounded-md border border-neutral-800 bg-neutral-800">
              {[
                ['billing-client', 'src/clients/billing.ts', 'Direct'],
                ['invoice-api', 'app/api/invoices/route.ts', 'Indirect'],
                ['checkout-service', 'src/services/checkout.ts', 'Indirect'],
              ].map(([repo, file, relation]) => (
                <div key={repo} className="grid grid-cols-[0.8fr_1.2fr] gap-3 bg-[#0d0d0d] px-4 py-3 sm:grid-cols-[1fr_1.4fr_auto]">
                  <span className="text-xs text-neutral-300">{repo}</span>
                  <span className="truncate font-mono text-[11px] text-neutral-500">{file}</span>
                  <span className="hidden text-[11px] text-neutral-600 sm:block">{relation}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 border-l border-orange-100/60 pl-3">
              <p className="text-xs text-neutral-300">2 repositories and 3 code paths affected</p>
            </div>
          </motion.div>
        )}

        {active === 2 && (
          <motion.div
            key="fix"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="p-5 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] text-neutral-500">src/clients/billing.ts</p>
              <span className="text-[11px] text-neutral-500">+3 −1</span>
            </div>
            <div className="mt-5 overflow-hidden rounded-md border border-neutral-800 font-mono text-[11px] leading-6">
              <div className="border-b border-neutral-800/70 px-4 py-1 text-neutral-600">126</div>
              <div className="bg-red-950/20 px-4 text-red-300">- const code = invoice.currency</div>
              <div className="bg-green-950/20 px-4 text-green-300">+ const code = invoice.currency.code</div>
              <div className="px-4 text-neutral-300">  return formatCurrency(code)</div>
              <div className="border-t border-neutral-800/70 px-4 py-1 text-neutral-600">129</div>
            </div>
          </motion.div>
        )}

        {active === 3 && (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="p-5 sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] text-neutral-500">Pull request</p>
                <p className="mt-2 text-sm font-medium text-neutral-100">Handle nested currency response</p>
              </div>
              <span className="text-xs text-green-400">Ready</span>
            </div>
            <div className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-neutral-800 bg-neutral-800">
              {[
                ['Branch', 'fix/currency-shape'],
                ['Files', '2 changed'],
                ['Status', 'Review needed'],
              ].map(([label, value]) => (
                <div key={label} className="bg-[#0d0d0d] p-3">
                  <p className="text-[10px] text-neutral-500">{label}</p>
                  <p className="mt-2 truncate text-[11px] text-neutral-300">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 border-t border-neutral-800 pt-4">
              <span className="size-5 rounded-full border border-neutral-700 bg-neutral-900" />
              <p className="text-xs text-neutral-500">driftlock opened this pull request</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Solution() {
  const [active, setActive] = useState(0)
  const reduceMotion = useReducedMotion()

  return (
    <section id="solution" className="border-y border-neutral-800/30 bg-neutral-900/20">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-12 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="From signal to shipped fix"
            title="Detect, explain, fix, review."
            description="Driftlock turns an upstream API change into a pull request your team can review."
          />
        </Reveal>

        <Reveal className="mt-12" delay={0.08}>
          <div className="grid overflow-hidden rounded-lg border border-neutral-800/70 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="relative border-b border-neutral-800/70 lg:border-b-0 lg:border-r">
              <div className="absolute bottom-0 left-[27px] top-0 hidden w-px bg-neutral-800 lg:block" />
              {steps.map((step, index) => (
                <button
                  key={step.title}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  aria-pressed={active === index}
                  className={`relative grid w-full grid-cols-[54px_1fr] items-start text-left transition-colors duration-200 ${
                    index !== steps.length - 1 ? 'border-b border-neutral-800/70' : ''
                  } ${active === index ? 'bg-white/[0.035]' : 'hover:bg-white/[0.018]'}`}
                >
                  <span className="relative z-10 flex h-full min-h-24 items-start justify-center pt-6">
                    <span
                      className={`grid size-7 place-items-center rounded-full border font-mono text-[10px] transition-colors ${
                        active === index
                          ? 'border-orange-100/70 bg-orange-900/40 text-orange-100'
                          : 'border-neutral-700 bg-[#101010] text-neutral-500'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </span>
                  <span className="py-5 pr-5 sm:py-6">
                    <span className="font-montserrat text-lg font-medium">{step.title}</span>
                    <span className="mt-1 block max-w-sm text-sm leading-6 text-neutral-500">{step.copy}</span>
                  </span>
                  {active === index && (
                    <motion.span
                      layoutId="workflow-progress"
                      className="absolute bottom-0 left-0 top-0 w-px bg-orange-100/70"
                      transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="p-3 sm:p-4">
              <Preview active={active} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
