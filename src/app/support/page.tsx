"use client";

import { Nav, Footer } from "../(ui)/components";
import Image from "next/image";
import { formatPrice as formatNle } from "@/lib/currency";
import { PhoneIcon, EnvelopeIcon, WrenchScrewdriverIcon, LifebuoyIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function SupportPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <Nav />

      {/* Hero (shop-style) */}
      <section id="hero" className="relative overflow-hidden min-h-[50svh] md:min-h-[60svh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/photo-1594344141311-8ea00ba55612.avif"
            alt="Support hero"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background/90" />
          <div className="absolute inset-0" style={{
            background:
              "radial-gradient(1200px 400px at 50% 10%, rgba(0,0,0,0.25), transparent 60%)"
          }} />
        </div>
        <div className="container-max pt-24 md:pt-28 pb-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[--accent]/10 text-[--accent] text-sm font-medium mb-4">
              <LifebuoyIcon className="h-4 w-4" />
              We’re here to help
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[--color-foreground]">Support</h1>
            <p className="text-base md:text-lg text-[--color-muted-foreground] mb-6">Guides, warranty, repairs, and contact options when you need us.</p>
            <div className="flex flex-wrap items-center justify-center gap-5 text-sm">
              <span className="inline-flex items-center gap-2 text-[--color-foreground]">
                <ClockIcon className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                <span className="opacity-90">2–3 day turnaround</span>
              </span>
              <span className="inline-flex items-center gap-2 text-[--color-foreground]">
                <WrenchScrewdriverIcon className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                <span className="opacity-90">Certified technicians</span>
              </span>
              <span className="inline-flex items-center gap-2 text-[--color-foreground]">
                <LifebuoyIcon className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                <span className="opacity-90">Priority support</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick help slab: SLA + Search + Tiles combined */}
      <section className="py-12" style={{ background: 'var(--muted)' }}>
        <div className="container-max">
          <div className="grid gap-6 md:grid-cols-3 items-center mb-6">
            <div className="md:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[--accent]/10 text-[--accent] text-sm font-medium">
                <ClockIcon className="h-4 w-4" /> Current turnaround: 2–3 business days
              </div>
              <div className="mt-3 text-[--color-muted-foreground] text-sm">Estimates vary by part availability and queue.</div>
            </div>
            <div>
              <label className="sr-only" htmlFor="kb">Search help</label>
              <input id="kb" className="w-full h-11 rounded-xl px-4 bg-[--color-card] border border-[--color-border]" placeholder="Search FAQs and guides..." />
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[{
            title: 'Repairs & Service', icon: WrenchScrewdriverIcon, desc: 'Book a repair or check device service options.' , href: '/repairs'
          },{
            title: 'Warranty', icon: ClockIcon, desc: 'Coverage details and how to claim warranty.' , href: '/warranty'
          },{
            title: 'Support Center', icon: LifebuoyIcon, desc: 'Browse FAQs and troubleshooting guides.' , href: '/support'
          },{
            title: 'Track repair', icon: ClockIcon, desc: 'Check the status of your ongoing repair.' , href: '#contact'
          },{
            title: 'Trade‑in', icon: ClockIcon, desc: 'Get credit for your old device towards a new one.', href: '/shop'
          },{
            title: 'Device care', icon: WrenchScrewdriverIcon, desc: 'Best practices to extend your device lifespan.', href: '#downloads'
          }].map(({title, icon: Icon, desc, href}) => (
            <a key={title} href={href} className="group rounded-2xl border border-[--color-border] hover:border-[--ring] transition-all duration-300 p-6 flex flex-col gap-2 hover:shadow-lg hover:scale-[1.02] bg-[--color-card]">
              <span className="h-10 w-10 rounded-full flex items-center justify-center bg-[--accent]/15" style={{ color: 'var(--accent)' }}>
                <Icon className="h-5 w-5" />
              </span>
              <div className="font-semibold text-[--color-foreground]">{title}</div>
              <p className="text-[--color-muted-foreground] text-sm">{desc}</p>
            </a>
          ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[--accent]/35 dark:via-[--accent]/70 to-transparent"></div>
      </div>

      {/* Pricing snapshot */}
      <section className="py-12" style={{ background: 'var(--background)' }}>
        <div className="container-max">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Common service pricing</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {n:'Diagnostics',p:'Free',img:'/assets/photo-1598094670018-abf669538033.avif'},
              {n:'Battery replacement',p:`From ${formatNle(49)}`,img:'/assets/photo-1585565804112-f201f68c48b4.avif'},
              {n:'Screen repair',p:`From ${formatNle(79)}`,img:'/assets/photo-1594344141311-8ea00ba55612.avif'},
              {n:'Data recovery',p:`From ${formatNle(99)}`,img:'/assets/photo-1598094670018-abf669538033.avif'},
              {n:'Storage upgrade',p:`From ${formatNle(79)}`,img:'/assets/photo-1585565804112-f201f68c48b4.avif'},
              {n:'Cleaning & thermal service',p:`From ${formatNle(39)}`,img:'/assets/photo-1594344141311-8ea00ba55612.avif'}
            ].map(({n,p,img}) => (
              <div key={n} className="group relative overflow-hidden rounded-2xl border border-[--color-border] hover:border-[--ring] transition-all duration-300 hover:shadow-xl">
                <div className="relative aspect-[4/3]">
                  <Image src={img} alt={n} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{n}</h3>
                      <p className="text-white/85 text-sm">Transparent, competitive pricing</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold" style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}>{p}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[--accent]/35 dark:via-[--accent]/70 to-transparent"></div>
      </div>

      {/* FAQs */}
      <section className="py-12" style={{ background: 'var(--muted)' }}>
        <div className="container-max max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">FAQs</h2>
          <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
            {[{
              q:'How long does a typical repair take?', a:'Most repairs are completed within 2–3 business days, subject to parts availability.'
            },{
              q:'Do you offer warranty on repairs?', a:'Yes. Most repairs include a 90‑day limited warranty on parts and labor.'
            },{
              q:'Do I need my original receipt?', a:'For warranty claims, proof of purchase is required. For paid repairs it helps us look up your device.'
            },{
              q:'Can you pick up my device?', a:'Contact us to arrange pickup options within Freetown for a small fee.'
            }].map(({q,a}) => (
              <details key={q} className="group py-4">
                <summary className="cursor-pointer font-medium text-[--color-foreground] flex items-center justify-between">
                  {q}
                  <span className="ml-4 text-[--color-muted-foreground] group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="mt-2 text-[--color-muted-foreground]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact options */}
      <section id="contact" className="py-16">
        <div className="container-max grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Contact us</h2>
            <p className="text-[--color-muted-foreground] mb-6">Reach out by phone, email, or visit us during business hours. We usually respond within one business day.</p>
            <div className="space-y-4 text-[--color-foreground]">
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5" style={{ color: 'var(--accent)' }} />
                <a href="tel:+23200000000" className="hover:underline">+232 00 000 000</a>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="h-5 w-5" style={{ color: 'var(--accent)' }} />
                <a href="mailto:support@houseofelectronics.sl" className="hover:underline">support@houseofelectronics.sl</a>
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon className="h-5 w-5" style={{ color: 'var(--accent)' }} />
                <span>Mon–Sat: 9:00am – 6:00pm</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="h-5 w-5" style={{ color: 'var(--accent)' }} />
                <a href="https://maps.google.com/?q=Freetown%20Sierra%20Leone" target="_blank" className="hover:underline">Freetown, Sierra Leone (Get directions)</a>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-[--color-border] bg-[--color-card] p-6">
            <h3 className="font-semibold mb-3">Send us a message</h3>
            <form className="grid gap-3">
              <input className="h-10 rounded-md px-3 bg-transparent border border-[--color-border]" placeholder="Your name" />
              <input className="h-10 rounded-md px-3 bg-transparent border border-[--color-border]" placeholder="Email or phone" />
              <select className="h-10 rounded-md px-3 bg-transparent border border-[--color-border]">
                <option>General question</option>
                <option>Repair booking</option>
                <option>Warranty</option>
                <option>Order support</option>
              </select>
              <textarea className="min-h-28 rounded-md p-3 bg-transparent border border-[--color-border]" placeholder="How can we help?" />
              <button className="h-10 rounded-md font-semibold" style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}>Send</button>
            </form>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[--accent]/50 dark:via-[--accent]/90 to-transparent"></div>
      </div>

      {/* CTA */}
      <section className="py-16" style={{ background: 'var(--muted)' }}>
        <div className="container-max text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">Need urgent help?</h2>
          <p className="text-[--color-muted-foreground] mb-6">Call us now or start a message and our team will reach out shortly.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+23200000000" className="inline-flex items-center justify-center px-6 h-11 rounded-xl font-semibold" style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}>
              <PhoneIcon className="h-5 w-5 mr-2" /> Call now
            </a>
            <a href="mailto:support@houseofelectronics.sl" className="inline-flex items-center justify-center px-6 h-11 rounded-xl font-semibold border" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
              <EnvelopeIcon className="h-5 w-5 mr-2" /> Email us
            </a>
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section id="downloads" className="py-12">
        <div className="container-max">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Downloads</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[{n:'Warranty terms (PDF)', href:'#'}, {n:'Device care checklist (PDF)', href:'#'}, {n:'Trade‑in guidelines (PDF)', href:'#'}].map(d => (
              <a key={d.n} href={d.href} className="rounded-xl border border-[--color-border] p-4 hover:border-[--ring] transition-colors">{d.n}</a>
            ))}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/23200000000" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}>
        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="currentColor"><path d="M19.11 17.39a5.63 5.63 0 0 1-2.41-.61 9.34 9.34 0 0 1-1.73-1.12 9.77 9.77 0 0 1-1.47-1.31 4.67 4.67 0 0 1-1-1.48 3 3 0 0 1-.2-1.07 1.84 1.84 0 0 1 .59-1.35 1.94 1.94 0 0 1 1.37-.56h.2a.46.46 0 0 1 .33.2l.5.75a.44.44 0 0 1 .06.38 1.65 1.65 0 0 1-.21.43 1.46 1.46 0 0 0-.18.39.5.5 0 0 0 0 .28 3.32 3.32 0 0 0 .35.59 6.49 6.49 0 0 0 .73.84 7.21 7.21 0 0 0 .93.78 4.45 4.45 0 0 0 .78.45.7.7 0 0 0 .32.07.5.5 0 0 0 .23-.05 1.62 1.62 0 0 0 .38-.22 1.73 1.73 0 0 1 .39-.2.42.42 0 0 1 .42.06l.73.49a.48.48 0 0 1 .2.34v.17a1.94 1.94 0 0 1-.55 1.33 1.84 1.84 0 0 1-1.35.59z"/><path d="M27 5a12.1 12.1 0 0 0-8.53-3.53h-.1a12.45 12.45 0 0 0-8.82 21l-1 3.75a1 1 0 0 0 1 1.29 1.07 1.07 0 0 0 .27 0l3.76-1A12.47 12.47 0 0 0 27 5zm-1.41 16.53a10.47 10.47 0 0 1-12.5 2.06.92.92 0 0 0-.73-.08l-2.15.6.6-2.16a1 1 0 0 0-.08-.73 10.46 10.46 0 1 1 14.86.31z"/></svg>
      </a>

      {/* FAQ JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
          { '@type': 'Question', name: 'How long does a typical repair take?', acceptedAnswer: { '@type': 'Answer', text: 'Most repairs are completed within 2–3 business days, subject to parts availability.' } },
          { '@type': 'Question', name: 'Do you offer warranty on repairs?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Most repairs include a 90‑day limited warranty on parts and labor.' } },
          { '@type': 'Question', name: 'Do I need my original receipt?', acceptedAnswer: { '@type': 'Answer', text: 'For warranty claims, proof of purchase is required. For paid repairs it helps us look up your device.' } },
          { '@type': 'Question', name: 'Can you pick up my device?', acceptedAnswer: { '@type': 'Answer', text: 'Contact us to arrange pickup options within Freetown for a small fee.' } },
        ]}) }} />

      <Footer />
    </main>
  );
}


