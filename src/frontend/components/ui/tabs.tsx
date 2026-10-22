"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/frontend/lib/utils"
import { Tabs as TabsPrimitive } from "radix-ui"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-full p-1 text-muted-foreground group-data-[orientation=horizontal]/tabs:h-10 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type IndicatorBox = { x: number; y: number; width: number; height: number }

// Design system: a single white pill slides behind the active trigger instead of each trigger
// painting its own background, so switching tabs animates (docs/design-system.md → Motion).
function TabsList({
  className,
  variant = "default",
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  const listRef = React.useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = React.useState<IndicatorBox | null>(null)

  React.useLayoutEffect(() => {
    const list = listRef.current
    if (!list || variant !== "default") return
    const measure = () => {
      const active = list.querySelector<HTMLElement>('[data-slot="tabs-trigger"][data-state="active"]')
      setIndicator(
        active
          ? { x: active.offsetLeft, y: active.offsetTop, width: active.offsetWidth, height: active.offsetHeight }
          : null
      )
    }
    measure()
    const stateChanges = new MutationObserver(measure)
    stateChanges.observe(list, { subtree: true, attributes: true, attributeFilter: ["data-state"] })
    const resizes = new ResizeObserver(measure)
    resizes.observe(list)
    return () => {
      stateChanges.disconnect()
      resizes.disconnect()
    }
  }, [variant])

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), "relative", className)}
      {...props}
    >
      {indicator && (
        <span
          aria-hidden
          data-slot="tabs-indicator"
          className="pointer-events-none absolute top-0 left-0 rounded-full bg-background shadow-hairline transition-[transform,width,height] duration-300 ease-out-expo dark:bg-card"
          style={{
            width: indicator.width,
            height: indicator.height,
            transform: `translate(${indicator.x}px, ${indicator.y}px)`,
          }}
        />
      )}
      {children}
    </TabsPrimitive.List>
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-full border border-transparent px-3 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent",
        "data-[state=active]:text-foreground dark:data-[state=active]:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none data-[state=active]:animate-in data-[state=active]:duration-300 data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
