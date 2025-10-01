"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { ComponentType, SVGProps } from "react"

type IconType = ComponentType<SVGProps<SVGSVGElement>>

interface NavItem {
  name: string
  url: string
  icon: IconType
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  leftSlot?: React.ReactNode
  rightSlot?: React.ReactNode
}

export function NavBar({ items, className, leftSlot, rightSlot }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  

  return (
    <div
      className={cn(
        "fixed top-3 left-1/2 -translate-x-1/2 z-50",
        className,
      )}
    >
      <div className="flex items-center gap-3 md:gap-4 bg-background/5 border border-border backdrop-blur-lg py-2 px-3 md:py-3 md:px-4 rounded-full shadow-lg">
        {leftSlot ? (
          <div className="hidden sm:flex items-center pl-1 pr-1">
            {leftSlot}
          </div>
        ) : null}
        <div className="flex items-center gap-3 md:gap-4">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-base md:text-[17px] font-semibold px-6 md:px-7 py-2.5 md:py-3 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon className="h-5 w-5" />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
        </div>
        {rightSlot ? (
          <div className="hidden sm:flex items-center pl-1 pr-1">
            {rightSlot}
          </div>
        ) : null}
      </div>
    </div>
  )
}


