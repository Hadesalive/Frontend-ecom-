import React from "react";
import { CircularTestimonials } from '@/components/ui/circular-testimonials';

const testimonials = [
  {
    quote:
      "TopNotch Electronics has completely transformed my tech experience! Their products are incredibly reliable and the customer service is outstanding. I've been a loyal customer for over 3 years.",
    name: "Sarah Johnson",
    designation: "Tech Enthusiast",
    src:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The quality of electronics from TopNotch is absolutely exceptional. Every product I've purchased has exceeded my expectations. Their attention to detail and innovation is unmatched in the industry.",
    name: "Michael Chen",
    designation: "Software Engineer",
    src:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Working with TopNotch Electronics has been a game-changer for our business. Their products are cutting-edge and their support team is incredibly knowledgeable. Highly recommended!",
    name: "Emily Rodriguez",
    designation: "Product Manager",
    src:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The customer service and product quality at TopNotch Electronics is simply outstanding. They've helped me find the perfect solutions for all my tech needs. I wouldn't shop anywhere else!",
    name: "David Kim",
    designation: "Designer",
    src:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const CircularTestimonialsDemo = () => (
  <section>
    {/* Light testimonials section */}
    <div className="bg-[#f7f7fa] p-20 rounded-lg min-h-[300px] flex flex-wrap gap-6 items-center justify-center relative">
      <div
        className="items-center justify-center relative flex"
        style={{ maxWidth: "1456px" }}
      >
        <CircularTestimonials
          testimonials={testimonials}
          autoplay={true}
          colors={{
            name: "#0a0a0a",
            designation: "#454545",
            testimony: "#171717",
            arrowBackground: "#141414",
            arrowForeground: "#f1f1f7",
            arrowHoverBackground: "#00A6FB",
          }}
          fontSizes={{
            name: "28px",
            designation: "20px",
            quote: "20px",
          }}
        />
      </div>
    </div>

    {/* Dark testimonials section */}
    <div className="bg-[#060507] p-16 rounded-lg min-h-[300px] flex flex-wrap gap-6 items-center justify-center relative">
      <div
        className="items-center justify-center relative flex"
        style={{ maxWidth: "1024px" }}
      >
        <CircularTestimonials
          testimonials={testimonials}
          autoplay={true}
          colors={{
            name: "#f7f7ff",
            designation: "#e1e1e1",
            testimony: "#f1f1f7",
            arrowBackground: "#0582CA",
            arrowForeground: "#141414",
            arrowHoverBackground: "#f7f7ff",
          }}
          fontSizes={{
            name: "28px",
            designation: "20px",
            quote: "20px",
          }}
        />
      </div>
    </div>
  </section>
);

// Electronics-focused testimonials for homepage integration
export const ElectronicsTestimonials = () => {
  return (
    <section className="py-16">
      <div className="container-max">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">What Our Customers Say</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover why thousands of customers trust TopNotch Electronics for their tech needs.
          </p>
        </div>
        <div className="flex justify-center">
          <CircularTestimonials
            testimonials={testimonials}
            autoplay={true}
            colors={{
              name: "var(--foreground)",
              designation: "var(--muted-foreground)",
              testimony: "var(--foreground)",
              arrowBackground: "var(--accent)",
              arrowForeground: "var(--accent-contrast)",
              arrowHoverBackground: "var(--foreground)",
            }}
            fontSizes={{
              name: "1.75rem",
              designation: "1rem",
              quote: "1.125rem",
            }}
          />
        </div>
      </div>
    </section>
  );
};
