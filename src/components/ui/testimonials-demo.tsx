"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
  ReviewStars,
} from "@/components/ui/animated-cards-stack"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const TESTIMONIALS = [
  {
    id: "testimonial-1",
    name: "Sarah Johnson",
    profession: "Tech Enthusiast",
    rating: 5,
    description:
      "TopNotch Electronics has completely transformed my tech experience. The quality and customer service are absolutely outstanding!",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "testimonial-2",
    name: "Michael Chen",
    profession: "Software Engineer",
    rating: 4.5,
    description:
      "The attention to detail and user experience in their products is exceptional. I'm thoroughly impressed with the final quality.",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "testimonial-3",
    name: "Emily Rodriguez",
    profession: "Product Manager",
    rating: 5,
    description:
      "Working with TopNotch was a game-changer for our project. Their expertise and professionalism exceeded our expectations.",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "testimonial-4",
    name: "David Kim",
    profession: "Designer",
    rating: 4.5,
    description:
      "The quality of work and communication throughout the project was outstanding. They delivered exactly what we needed.",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]

function getSectionClass(theme: string | undefined) {
  return theme === "dark"
    ? "bg-muted/30 text-secondary py-16"
    : "bg-muted/30 py-16"
}

function getReviewStarsClass(theme: string | undefined) {
  return theme === "dark" ? "text-primary" : "text-teal-500"
}

function getTextClass(theme: string | undefined) {
  return theme === "dark" ? "text-primary-foreground" : ""
}

function getAvatarClass(theme: string | undefined) {
  return theme === "dark"
    ? "!size-12 border border-stone-700"
    : "!size-12 border border-stone-300"
}

function getCardVariant(theme: string | undefined) {
  return "light"
}

export function TestimonialsVariant() {
  const { theme } = useTheme()

  return (
    <section className={getSectionClass(theme)}>
      <div className="container-max">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Customer Reviews</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear what our satisfied customers have to say about their TopNotch Electronics experience.
          </p>
        </div>
        <ContainerScroll className="h-[300vh]">
          <div className="sticky left-0 top-0 h-svh w-full py-12">
            <CardsContainer className="mx-auto size-full h-[450px] w-[350px]">
            {TESTIMONIALS.map((testimonial, index) => (
              <CardTransformed
                arrayLength={TESTIMONIALS.length}
                key={testimonial.id}
                variant={getCardVariant(theme)}
                index={index + 2}
                role="article"
                aria-labelledby={`card-${testimonial.id}-title`}
                aria-describedby={`card-${testimonial.id}-content`}
              >
                <div className="flex flex-col items-center space-y-4 text-center">
                  <ReviewStars
                    className={getReviewStarsClass(theme)}
                    rating={testimonial.rating}
                  />
                  <div className={`mx-auto w-4/5 text-lg ${getTextClass(theme)}`}>
                    <blockquote cite="#">{testimonial.description}</blockquote>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className={getAvatarClass(theme)}>
                    <AvatarImage
                      src={testimonial.avatarUrl}
                      alt={`Portrait of ${testimonial.name}`}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="block text-lg font-semibold tracking-tight md:text-xl">
                      {testimonial.name}
                    </span>
                    <span className="block text-sm text-muted-foreground ">
                      {testimonial.profession}
                    </span>
                  </div>
                </div>
              </CardTransformed>
            ))}
            </CardsContainer>
          </div>
        </ContainerScroll>
      </div>
    </section>
  )
}
