interface SectionHeadingProps {
  eyebrow: string
  title: string
  description: string
}

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-sm font-medium text-neutral-500">{eyebrow}</p>
      <h2 className="font-montserrat text-2xl font-medium tracking-[-0.035em] sm:text-[30px]">{title}</h2>
      <p className="mt-3 text-base text-neutral-600 md:text-lg dark:text-neutral-400">{description}</p>
    </div>
  )
}
