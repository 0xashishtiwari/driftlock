import { motion, useReducedMotion } from 'motion/react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

export default function Features() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20 sm:px-12 sm:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Capabilities"
          title="Everything needed to close the API drift loop."
          description="From first signal to a reviewable change, Driftlock keeps the workflow focused."
        />
      </Reveal>

      <div className="mt-12 grid gap-3 md:grid-cols-12">
        <Reveal className="md:col-span-7" delay={0.05}>
          <motion.article
            whileHover={reduceMotion ? undefined : { y: -3 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="group min-h-[330px] overflow-hidden rounded-xl border border-neutral-800/70 bg-[#0d0d0d]"
          >
            <div className="grid h-full sm:grid-cols-[0.78fr_1.22fr]">
              <div className="flex flex-col justify-between p-5 sm:p-7">
                <div>
                  <p className="font-mono text-[11px] text-neutral-500">01 / Detection</p>
                  <h3 className="mt-6 font-montserrat text-2xl font-medium tracking-tight">Drift detection</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-400">
                    Monitor external APIs and flag behavior or interface changes early.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-xs text-neutral-500">
                  <span className="size-1.5 rounded-full bg-orange-100" />
                  Monitoring active
                </div>
              </div>
              <div className="border-t border-neutral-800/70 p-4 sm:border-l sm:border-t-0 sm:p-5">
                <div className="flex h-full flex-col justify-between rounded-lg border border-neutral-800/70 bg-black/20 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-neutral-500">billing.provider.com</span>
                    <span className="border-l border-red-400/40 pl-2 text-[10px] text-red-300">Changed</span>
                  </div>
                  <div className="mt-8 space-y-3">
                    <div>
                      <p className="font-mono text-sm text-neutral-200">GET /v2/invoices</p>
                      <p className="mt-1 text-[11px] text-neutral-500">Response schema</p>
                    </div>
                    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-neutral-800 bg-neutral-800">
                      <div className="bg-[#0d0d0d] p-3">
                        <p className="text-[10px] text-neutral-500">Status</p>
                        <p className="mt-2 font-mono text-sm text-neutral-300">200</p>
                      </div>
                      <div className="bg-[#0d0d0d] p-3">
                        <p className="text-[10px] text-neutral-500">Response</p>
                        <p className="mt-2 font-mono text-sm text-neutral-300">184 ms</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-5 border-t border-neutral-800/70 pt-3 font-mono text-[10px] text-neutral-500">
                    currency: string → object
                  </p>
                </div>
              </div>
            </div>
          </motion.article>
        </Reveal>

        <Reveal className="md:col-span-5" delay={0.12}>
          <motion.article
            whileHover={reduceMotion ? undefined : { y: -3 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-[330px] rounded-xl border border-neutral-800/70 bg-[#0d0d0d] p-5 sm:p-7"
          >
            <p className="font-mono text-[11px] text-neutral-500">02 / Impact</p>
            <h3 className="mt-5 font-montserrat text-xl font-medium tracking-tight">Impact mapping</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-400">
              Connect upstream changes to affected repositories and code paths.
            </p>
            <div className="mt-7">
              <div className="flex items-center">
                <span className="rounded-md border border-neutral-800 px-2.5 py-2 font-mono text-[10px] text-neutral-300">
                  billing-client
                </span>
                <span className="h-px flex-1 bg-neutral-800" />
                <span className="rounded-md border border-neutral-800 px-2.5 py-2 font-mono text-[10px] text-neutral-300">
                  invoice-api
                </span>
              </div>
              <div className="ml-[24%] h-5 w-px bg-neutral-800" />
              <div className="grid grid-cols-2 gap-2">
                {['src/clients/billing.ts', 'app/api/invoices/route.ts'].map((file) => (
                  <div key={file} className="rounded-md border border-neutral-800/70 px-2.5 py-2 font-mono text-[9px] text-neutral-500">
                    {file}
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        </Reveal>

        <Reveal className="md:col-span-5" delay={0.16}>
          <motion.article
            whileHover={reduceMotion ? undefined : { y: -3 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-[300px] rounded-xl border border-neutral-800/70 bg-[#0d0d0d] p-5 sm:p-7"
          >
            <p className="font-mono text-[11px] text-neutral-500">03 / Remediation</p>
            <h3 className="mt-5 font-montserrat text-xl font-medium tracking-tight">PR generation</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-400">
              Create a focused fix for developers to review and approve.
            </p>
            <div className="mt-6 overflow-hidden rounded-md border border-neutral-800 font-mono text-[10px] leading-6">
              <div className="border-b border-neutral-800/70 px-3 py-1.5 text-neutral-500">
                fix/currency-shape
              </div>
              <div className="bg-red-950/20 px-3 text-red-300">- const code = invoice.currency</div>
              <div className="bg-green-950/20 px-3 text-green-300">+ const code = invoice.currency.code</div>
              <div className="px-3 text-neutral-400">  return formatCurrency(code)</div>
            </div>
          </motion.article>
        </Reveal>

        <Reveal className="md:col-span-7" delay={0.2}>
          <motion.article
            whileHover={reduceMotion ? undefined : { y: -3 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-[300px] rounded-xl border border-neutral-800/70 bg-[#0d0d0d] p-5 sm:p-7"
          >
            <p className="font-mono text-[11px] text-neutral-500">04 / Integration</p>
            <h3 className="mt-5 font-montserrat text-xl font-medium tracking-tight">Enterprise fit</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-neutral-400">
              Fit remediation into existing platform and engineering workflows.
            </p>
            <div className="mt-8 grid grid-cols-[1fr_44px_1fr_44px_1fr] items-center">
              {[
                ['Repositories', 'GitHub'],
                ['Checks', 'CI / tests'],
                ['Review', 'Pull request'],
              ].map(([label, value], index) => (
                <div key={label} className="contents">
                  {index > 0 && <span className="h-px bg-neutral-800" />}
                  <div className="min-w-0 rounded-md border border-neutral-800/70 px-3 py-3">
                    <p className="text-[10px] text-neutral-500">{label}</p>
                    <p className="mt-1 truncate font-mono text-[11px] text-neutral-300">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.article>
        </Reveal>
      </div>
    </section>
  )
}
