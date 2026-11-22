import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

const faqs = [
  ['What does Driftlock monitor?', 'Driftlock focuses on external third-party APIs and the production code they can silently change.'],
  ['How is it different from API monitoring?', 'It turns a drift signal into a mapped impact and a proposed pull request, not just an alert.'],
  ['Do we need an OpenAPI spec?', 'No. Driftlock can learn from observed traffic without requiring every API to have a formal specification.'],
  ['Who should use it first?', 'Platform teams that manage many third-party integrations and need to prevent integration surprises.'],
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="mx-auto max-w-6xl px-6 py-20 sm:px-12 sm:py-28">
      <Reveal>
      <SectionHeading
        eyebrow="FAQ"
        title="Answers before you start."
        description="A quick overview of Driftlock's workflow and fit."
      />
      </Reveal>
      <Reveal className="mt-10" delay={0.08}>
      <div className="grid border-t border-amber-900/10 dark:border-orange-50/10">
        {faqs.map(([question, answer], index) => (
          <div key={question} className="group border-b border-amber-900/10 dark:border-orange-50/10">
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
              className="grid w-full cursor-pointer grid-cols-[3rem_1fr_auto] items-center gap-3 py-5 text-left font-montserrat font-medium transition-colors duration-200 hover:text-neutral-500 sm:grid-cols-[4.5rem_1fr_auto] sm:py-6"
            >
              <span className="font-mono text-xs text-neutral-400">0{index + 1}</span>
              <span>{question}</span>
              <span className={`grid size-9 place-items-center rounded-full border border-amber-900/15 transition-all duration-300 dark:border-orange-50/15 ${openIndex === index ? 'rotate-180 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950' : ''}`}>
                <ChevronDown className="size-4" />
              </span>
            </button>
            {openIndex === index && (
              <p className="ml-[3rem] max-w-2xl pb-6 pr-12 text-sm leading-6 text-neutral-600 sm:ml-[4.5rem] dark:text-neutral-400">{answer}</p>
            )}
          </div>
        ))}
      </div>
      </Reveal>
    </section>
  )
}
