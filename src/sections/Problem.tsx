import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

const problems = [
  ['Silent changes', 'Third-party APIs change behavior or interfaces without warning.'],
  ['Reactive work', 'Teams lose time debugging breakage after users feel the impact.'],
  ['Unclear impact', 'Generic alerts do not identify every repo, client, or workflow affected.'],
]

export default function Problem() {
  return (
    <section id="problem" className="mx-auto max-w-6xl px-6 py-20 sm:px-12 sm:py-28">
      <Reveal>
        <SectionHeading
        eyebrow="The problem"
        title="API drift stays hidden until it becomes an outage."
        description="Most teams discover upstream changes through failing tests or customer reports."
        />
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {problems.map(([title, copy], index) => (
          <Reveal key={title} delay={index * 0.08}>
          <article
            key={title}
            className={`card-chai p-6 transition-transform duration-300 hover:-translate-y-1 ${index === 0 ? 'md:-translate-y-3' : ''}`}
          >
            <p className="mb-8 font-mono text-xs text-neutral-600">0{index + 1}</p>
            <h3 className="font-montserrat text-xl font-medium tracking-tight">{title}</h3>
            <p className="mt-3 text-neutral-600 dark:text-neutral-400">{copy}</p>
          </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
