import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/frontend/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  // Design system: every button is a pill (9999px); blue fill only for the primary action, an outlined
  // Steel pill for secondary actions, no shadows. See docs/design-system.md.
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm font-normal whitespace-nowrap transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline: "bg-transparent text-foreground shadow-outline hover:bg-muted",
        secondary: "bg-secondary text-secondary-foreground hover:bg-control",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "h-auto px-0 text-link underline-offset-4 hover:underline has-[>svg]:px-0",
        ink: "bg-foreground text-background hover:bg-foreground/85",
      },
      size: {
        default: "h-9 px-5 has-[>svg]:px-4",
        xs: "h-6 gap-1 px-2.5 text-xs has-[>svg]:px-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-4 text-xs has-[>svg]:px-3",
        lg: "h-11 px-7 text-body has-[>svg]:px-6",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
