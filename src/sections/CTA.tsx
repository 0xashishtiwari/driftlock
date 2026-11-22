import { ArrowUpRight } from 'lucide-react'
import { useState, type FormEvent } from 'react'

export default function CTA() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="demo" className="mx-auto max-w-6xl px-6 pb-20 sm:px-12 sm:pb-28">
      <div className="cta-grid relative grid overflow-hidden rounded-[28px] bg-neutral-950 text-white md:grid-cols-[1.08fr_0.72fr]">
        <div className="relative z-10 px-6 py-10 sm:px-12 sm:py-14">
          <p className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.12em] text-orange-100">
            <span className="h-px w-7 bg-orange-100/70" />
            Get started
          </p>
          <h2 className="font-montserrat max-w-xl text-[34px] font-semibold leading-[1.02] tracking-[-0.055em] sm:text-5xl">
            Stop firefighting third-party API changes.
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-neutral-400">
            See how Driftlock turns drift detection into a fixable pull request.
          </p>
          <div className="mt-8 space-y-3 text-sm text-neutral-300">
            {['Detect drift across external dependencies', 'Map impact to exact code paths', 'Review a proposed fix in a pull request'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="grid size-5 place-items-center rounded-full border border-orange-100/20 text-xs text-orange-100">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center px-6 pb-10 md:px-8 md:pb-0 md:pr-10">
          <div className="w-full rounded-2xl border border-white/10 bg-neutral-900/95 p-5 sm:p-6">
          {submitted ? (
            <div className="flex min-h-64 flex-col justify-center">
              <p className="font-montserrat text-xl font-medium text-white">Thanks. We'll be in touch.</p>
              <p className="mt-2 text-sm text-neutral-400">A member of the Driftlock team will follow up shortly.</p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 self-start text-sm text-orange-100 underline decoration-orange-100/40 underline-offset-4 hover:text-white"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-white" htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Alex Morgan"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-orange-100/50"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-white" htmlFor="work-email">Work email</label>
                <input
                  id="work-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="alex@company.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-orange-100/50"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-white" htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  autoComplete="organization"
                  placeholder="Company name"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-orange-100/50"
                />
              </div>
              <button type="submit" className="font-montserrat mt-2 flex w-full items-center justify-center gap-2 rounded-none rounded-tr-lg rounded-bl-lg bg-white px-5 py-3.5 text-sm font-semibold text-neutral-950 transition-transform duration-200 hover:-translate-y-0.5">
                Book a demo
                <ArrowUpRight className="size-4" />
              </button>
            </form>
          )}
          </div>
        </div>
      </div>
    </section>
  )
}
