import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

const useCases = [
  {
    title: 'Scheduled API migrations',
    copy: 'Platform teams preparing planned upstream API changes can review potential client impact before rollout.',
  },
  {
    title: 'One trusted team',
    copy: 'The MVP is scoped for a known platform team and its repositories, not arbitrary public code.',
  },
  {
    title: 'Artifact-first review',
    copy: 'Inspect the intended workflow through artifacts while runtime execution remains disabled.',
  },
]

export default function UseCases() {
  return (
    <section id="use-cases" className="border-y border-amber-900/10 bg-amber-50/25 dark:border-orange-50/10 dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-12 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Use cases"
            title={<>For platform teams running <span className="highlight">scheduled API migrations.</span></>}
            description={<>Driftlock is designed for one trusted team managing its own integrations—not arbitrary public code.</>}
          />
        </Reveal>

        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {useCases.map((useCase, index) => (
            <Reveal key={useCase.title} delay={index * 0.08}>
              <article className="card-chai h-full min-h-48 p-6 sm:p-7">
                <p className="font-mono text-[11px] text-neutral-500">0{index + 1} / Use case</p>
                <h3 className="mt-5 font-montserrat text-xl font-medium tracking-tight">{useCase.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">{useCase.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <p className="mt-5 border-l border-amber-900/30 pl-4 text-sm leading-6 text-neutral-600 dark:border-orange-50/30 dark:text-neutral-400">
            Real provider/runtime acceptance evidence (A06/Q06) is pending; synthetic platform workflow evidence is available in the repository.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
