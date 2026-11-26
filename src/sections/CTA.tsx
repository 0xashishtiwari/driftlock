import Cal from '@calcom/embed-react'
import { useEffect, useRef, useState } from 'react'
import Reveal from '../components/Reveal'

export default function CTA() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (bookingOpen && !dialog.open) {
      dialog.showModal()
    } else if (!bookingOpen && dialog.open) {
      dialog.close()
    }
  }, [bookingOpen])

  return (
    <section id="schedule" className="mx-auto max-w-6xl px-6 pb-20 sm:px-12 sm:pb-28">
      <Reveal>
        <div className="cta-grid relative overflow-hidden rounded-[28px] bg-neutral-950 text-white">
          <div className="relative z-10 px-6 py-10 sm:px-12 sm:py-14">
            <p className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.12em] text-neutral-300">
              <span className="h-px w-7 bg-neutral-500" />
              Schedule a meeting
            </p>
            <h2 className="font-montserrat max-w-xl text-[34px] font-semibold leading-[1.02] tracking-[-0.055em] sm:text-5xl">
              Find a time to <span className="highlight text-orange-100">talk with Nerdev.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-neutral-400">
              Open the scheduler to choose a time and book without leaving the site.
            </p>
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="font-montserrat mt-8 inline-flex items-center gap-2 rounded-none rounded-tr-lg rounded-bl-lg bg-white px-5 py-3.5 text-sm font-semibold text-neutral-950 transition-transform duration-200 hover:-translate-y-0.5"
            >
              Schedule a meeting
            </button>
          </div>
        </div>

        <dialog
          ref={dialogRef}
          aria-labelledby="booking-dialog-title"
          onClose={() => setBookingOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setBookingOpen(false)
          }}
          className="m-auto max-h-[92vh] w-[min(96vw,960px)] max-w-none overflow-hidden rounded-xl border border-neutral-200 bg-white p-0 text-neutral-950 backdrop:bg-black/70"
        >
          <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
            <h3 id="booking-dialog-title" className="font-montserrat text-lg font-medium">
              Schedule a meeting with Nerdev
            </h3>
            <button
              type="button"
              onClick={() => setBookingOpen(false)}
              aria-label="Close scheduler"
              className="rounded-md px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
            >
              Close
            </button>
          </div>
          {bookingOpen && (
            <div className="h-[min(78vh,720px)] bg-white">
              <Cal
                calLink="nerdev"
                config={{
                  layout: 'month_view',
                  theme: 'auto',
                  iframeAttrs: { title: 'Schedule a meeting with Nerdev' },
                }}
                style={{ width: '100%', height: '100%', overflow: 'scroll' }}
              />
            </div>
          )}
        </dialog>
      </Reveal>
    </section>
  )
}
