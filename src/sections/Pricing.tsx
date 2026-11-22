import { ArrowUpRight, Check } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

const plans = [
  { name: 'Starter', copy: 'For small teams starting API monitoring.', items: ['Core drift detection', 'Impact summaries', 'Email alerts'] },
  { name: 'Growth', copy: 'For teams managing many integrations.', items: ['Expanded API coverage', 'PR generation', 'Repository mapping'] },
  { name: 'Enterprise', copy: 'For platform teams with custom workflows.', items: ['Advanced controls', 'Dedicated support', 'Custom integrations'] },
]

export default function Pricing() {
  return (
    <section id="pricing" className="border-y border-neutral-800/30">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-12 sm:py-28">
        <Reveal>
        <SectionHeading
          eyebrow="Pricing"
          title="Choose the level of coverage your team needs."
          description="Every plan is tailored to your API surface and workflow."
        />
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.08}>
            <article className={`card-chai flex min-h-96 flex-col p-6 sm:p-8 transition-transform duration-300 hover:-translate-y-1 ${index === 1 ? 'lg:-translate-y-3' : ''}`}>
              <div className="mb-8">
                <h3 className="font-montserrat text-xl font-medium tracking-tight">{plan.name}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{plan.copy}</p>
              </div>
              <p className="font-montserrat text-2xl font-medium tracking-tight">Custom</p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <Check className="size-4 text-green-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#demo"
                className="font-montserrat mt-8 flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                {plan.name === 'Enterprise' ? 'Contact sales' : 'Book a demo'}
                <ArrowUpRight className="size-4" />
              </a>
            </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
