"use client";

import { Nav, Footer, BrandLogo } from "../(ui)/components";
import Image from "next/image";
import { 
  CursorArrowRaysIcon,
  UserGroupIcon,
  TrophyIcon,
  GlobeAltIcon,
  HeartIcon,
  CheckCircleIcon,
  StarIcon
} from "@heroicons/react/24/outline";

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <Nav />
      
      {/* Hero Section with Image */}
      <section id="hero" className="relative overflow-hidden min-h-[50svh] md:min-h-[60svh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/photo-1585565804112-f201f68c48b4.avif"
            alt="Devices and workspace"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Match shop page overlays for legibility while preserving image */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background/90" />
          <div className="absolute inset-0" style={{
            background:
              "radial-gradient(1200px 400px at 50% 10%, rgba(0,0,0,0.25), transparent 60%)"
          }} />
        </div>
        <div className="container-max pt-24 pb-14 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-[--color-foreground]">
            <p className="text-sm tracking-wider font-semibold mb-3" style={{ color: 'var(--accent)' }}>
              Sierra Leone • Est. 2018
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
              About House of Electronics
            </h1>
            <p className="text-base md:text-lg text-[--color-muted-foreground] mb-8" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.15)' }}>
              Founded in August 2018, we&apos;re Sierra Leone&apos;s premier electronics company,
              delivering world-class products and services with local expertise.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-[--color-muted-foreground]">
              <div className="flex items-center gap-2 text-sm">
                <TrophyIcon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                <span>Since 2018</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <GlobeAltIcon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                <span>Sierra Leone</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <UserGroupIcon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                <span>Local Expertise</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[--accent]/20 dark:via-[--accent]/40 to-transparent"></div>
      </div>

      {/* Company Story */}
      <section className="py-16" style={{ background: 'var(--background)' }}>
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[--color-foreground]">
                Our Story
              </h2>
              <div className="w-16 h-0.5 mx-auto rounded-full mb-8" style={{ background: 'var(--accent)' }} />
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[--color-foreground]">
                  Founded on Vision
                </h3>
                <p className="text-[--color-muted-foreground] leading-relaxed mb-4">
                  Type A House of Electronics (SL) Ltd. was founded in August 2018 as a Private Limited Company
                  through the foresight and vision of one director. It was formed as a tool with the 
                  director having identified a large potential market for their products and services.
                </p>
                <p className="text-[--color-muted-foreground] leading-relaxed">
                  For most of its initial existence, the company intends to utilize the large database 
                  and experience of its director in obtaining orders, with the intention of establishing 
                  close relationships with its clients.
                </p>
              </div>
              
              <div className="flex justify-center">
                <div className="relative flex items-center justify-center w-64 h-40 md:w-80 md:h-52 rounded-2xl overflow-hidden shadow-lg bg-[--color-card]">
                  <BrandLogo showWordmark={false} markClassName="h-24 md:h-32 w-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[--accent]/25 dark:via-[--accent]/50 to-transparent"></div>
      </div>

      {/* Leadership */}
      <section className="py-16" style={{ background: 'var(--muted)' }}>
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[--color-foreground]">
                Leadership
              </h2>
              <div className="w-16 h-0.5 mx-auto rounded-full mb-8" style={{ background: 'var(--accent)' }} />
            </div>

            <div className="p-0">
                <div className="grid md:grid-cols-3 gap-12 items-center">
                  <div className="text-center md:text-left">
                    <div className="relative w-40 h-56 md:w-56 md:h-72 mx-auto md:mx-0 overflow-hidden mb-4 shadow rounded-xl">
                      <Image
                        src="/assets/ib%20founder.jpeg"
                        alt="Ibrahim K. Bangura"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 200px, 240px"
                        style={{ objectPosition: '50% 20%' }}
                        priority
                      />
                    </div>
                    <h3 className="text-xl font-bold text-[--color-foreground] mb-2">
                      Ibrahim K. Bangura
                    </h3>
                    <p className="font-semibold mb-4" style={{ color: 'var(--accent)' }}>
                      Chief Executive Officer
                    </p>
                  </div>
                  
                  <div className="md:col-span-2 mt-4 md:mt-0 max-w-2xl mx-auto md:mx-0">
                    <div className="space-y-5 text-[--color-muted-foreground] leading-relaxed">
                      <p>
                        Mr. Ibrahim Komrabai Bangura is an accomplished Sierra Leonean professional 
                        with a wealth of knowledge and expertise in the field of Electronics and ICT services. 
                        He was born in Sierra Leone, raised in Sierra Leone, and currently resides in Sierra Leone.
                      </p>
                      <p>
                        With over a decade of experience, Mr. Bangura has consistently demonstrated his 
                        outstanding skill set in the realm of Electronic and general ICT products and services. 
                        His skills have been put to use in a number of diverse areas, providing support to a 
                        wide range of clients from various industries.
                      </p>
                      <p>
                        His passion for excellence and his commitment to delivering top-quality services has 
                        earned him a stellar reputation among his peers and customers alike. Mr. Bangura&apos;s 
                        distinctive blend of technical know-how, creativity, and interpersonal skills make him 
                        an exceptional asset to any organization that he works for.
                      </p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[--accent]/35 dark:via-[--accent]/70 to-transparent"></div>
      </div>

      {/* Values & Mission */}
      <section className="py-16" style={{ background: 'var(--background)' }}>
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[--color-foreground]">
                Our Values
              </h2>
              <div className="w-16 h-0.5 mx-auto rounded-full mb-8" style={{ background: 'var(--accent)' }} />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center shadow" style={{ background: 'var(--accent)' }}>
                    <CursorArrowRaysIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-[--color-foreground]">Excellence</h3>
                  <p className="text-sm text-[--color-muted-foreground]">
                    We are committed to delivering top-quality products and services that exceed 
                    customer expectations in every interaction.
                  </p>
              </div>

              <div className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center shadow" style={{ background: 'var(--accent)' }}>
                    <HeartIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-[--color-foreground]">Local Focus</h3>
                  <p className="text-sm text-[--color-muted-foreground]">
                    Born and raised in Sierra Leone, we understand our community&apos;s needs and 
                    are dedicated to serving them with authentic care and expertise.
                  </p>
              </div>

              <div className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center shadow" style={{ background: 'var(--accent)' }}>
                    <UserGroupIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-[--color-foreground]">Relationships</h3>
                  <p className="text-sm text-[--color-muted-foreground]">
                    We build lasting relationships with our clients through trust, transparency, 
                    and consistent delivery of exceptional service.
                  </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[--accent]/40 dark:via-[--accent]/80 to-transparent"></div>
      </div>

      {/* Image Gallery */}
      <section className="py-16" style={{ background: 'var(--background)' }}>
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-[--color-foreground] mb-3">A glimpse of our world</h2>
            <p className="text-[--color-muted-foreground]">Stores, service benches, and the people behind the work.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/assets/photo-1585565804112-f201f68c48b4.avif"
                alt="Showroom displays"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/assets/photo-1598094670018-abf669538033.avif"
                alt="Repair workspace"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden hidden md:block">
              <Image
                src="/assets/photo-1594344141311-8ea00ba55612.avif"
                alt="Customer service desk"
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[--accent]/50 dark:via-[--accent]/90 to-transparent"></div>
      </div>

      {/* Call to Action */}
      <section className="py-20" style={{ background: 'var(--muted)' }}>
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[--color-foreground]">
              Ready to Experience the Difference?
            </h2>
            <p className="text-base md:text-lg text-[--color-muted-foreground] mb-10">
              Discover our premium electronics, expert repairs, and personalized service 
              that has made us Sierra Leone&apos;s trusted electronics partner since 2018.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/shop" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-transform duration-300 hover:scale-105"
                style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}
              >
                <StarIcon className="w-4 h-4 mr-2" />
                Shop Now
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border-2 transition-transform duration-300 hover:scale-105"
                style={{ 
                  borderColor: 'var(--accent)', 
                  color: 'var(--accent)',
                  background: 'transparent'
                }}
              >
                <CheckCircleIcon className="w-4 h-4 mr-2" />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}


