import { motion, useReducedMotion } from 'motion/react'

const nodes = [
  { left: '8%', top: '18%', x: 12, y: -8, delay: 0.2, speed: 14 },
  { left: '18%', top: '52%', x: -10, y: 14, delay: 0.7, speed: 16 },
  { left: '29%', top: '24%', x: 8, y: 12, delay: 0.4, speed: 13 },
  { left: '39%', top: '64%', x: -14, y: -10, delay: 0.9, speed: 18 },
  { left: '48%', top: '31%', x: 14, y: 8, delay: 0.5, speed: 15 },
  { left: '58%', top: '57%', x: -8, y: -14, delay: 1.1, speed: 17 },
  { left: '68%', top: '20%', x: 12, y: 10, delay: 0.3, speed: 14 },
  { left: '78%', top: '49%', x: -12, y: 8, delay: 0.8, speed: 16 },
  { left: '88%', top: '27%', x: 8, y: -12, delay: 0.6, speed: 13 },
]

export default function NetworkBackground() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[760px] overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full opacity-25 dark:opacity-35" viewBox="0 0 100 100" preserveAspectRatio="none">
        <g fill="none" stroke="currentColor" strokeWidth=".08" className="text-neutral-400 dark:text-neutral-600">
          <path d="M8 18L29 24L48 31L68 20L88 27" />
          <path d="M18 52L39 64L58 57L78 49" />
          <path d="M29 24L18 52M48 31L39 64M48 31L58 57M68 20L78 49M58 57L88 27" />
        </g>
      </svg>
      {nodes.map((node, index) => (
        <motion.span
          key={index}
          className="absolute size-1.5 rounded-full bg-neutral-400/70 ring-4 ring-neutral-300/20 dark:bg-neutral-500/60 dark:ring-neutral-500/10"
          style={{ left: node.left, top: node.top }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={reduceMotion ? { opacity: 0.65 } : {
            opacity: [0.45, 0.9, 0.45],
            scale: [1, 1.35, 1],
            x: [0, node.x, 0],
            y: [0, node.y, 0],
          }}
          transition={{
            duration: node.speed,
            delay: node.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
