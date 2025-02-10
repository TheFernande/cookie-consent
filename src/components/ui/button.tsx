// src/components/ui/button.tsx
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, cloneElement, forwardRef } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex items-center font-medium justify-center transition-all",
  {
    variants: {
      variant: {
        primary: [
          "bg-indigo-700 fill-white text-white",
          "shadow-[0_1px_3px_rgba(0,0,0,0.10),0_1px_2px_rgba(0,0,0,0.06)]",
          "hover:bg-indigo-800 hover:shadow-[0_1px_3px_rgba(0,0,0,0.10),0_1px_2px_rgba(0,0,0,0.06)]",
          "focus:bg-indigo-800 focus:shadow-[0_0px_0px_4px_rgba(68,76,231,0.12)]",
          "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:fill-neutral-400 disabled:text-neutral-400"
        ],
        secondary: [
          "border-[0.5px] border-neutral-200 bg-white fill-neutral-900 text-neutral-900",
          "shadow-[0_1px_3px_rgba(0,0,0,0.10),0_1px_2px_rgba(0,0,0,0.06)]",
          "hover:border hover:border-neutral-200 hover:bg-neutral-50",
          "hover:shadow-[0_1px_3px_rgba(0,0,0,0.10),0_1px_2px_rgba(0,0,0,0.06)]",
          "focus:border focus:border-neutral-200 focus:bg-neutral-50",
          "focus:shadow-[0_0px_0px_4px_rgba(68,76,231,0.12)]",
          "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:fill-neutral-400 disabled:text-neutral-400"
        ],
        tertiary: [
          "bg-transparent fill-indigo-700 text-indigo-700",
          "focus:bg-neutral-50 focus:shadow-[0_0px_0px_4px_rgba(68,76,231,0.12)]",
          "disabled:cursor-not-allowed disabled:fill-neutral-400 disabled:text-neutral-400"
        ],
        linkColor: [
          "bg-transparent fill-indigo-700 text-indigo-700",
          "hover:bg-transparent hover:fill-indigo-800 hover:text-indigo-800",
          "focus:fill-indigo-800 focus:text-indigo-800",
          "focus:shadow-[0_0px_0px_4px_rgba(68,76,231,0.12)]",
          "disabled:cursor-not-allowed disabled:fill-neutral-400 disabled:text-neutral-400"
        ],
        linkGray: [
          "bg-transparent fill-neutral-600 text-neutral-600",
          "hover:bg-transparent hover:fill-neutral-900 hover:text-neutral-900",
          "focus:text-neutral-900 focus:shadow-[0_0px_0px_4px_rgba(68,76,231,0.12)]",
          "disabled:cursor-not-allowed disabled:fill-neutral-400 disabled:text-neutral-400"
        ],
        destructive: [
          "bg-red-600 fill-white text-white",
          "hover:bg-red-700 focus:bg-red-700",
          "focus:shadow-[0_0px_0px_1px_rgba(217,45,32,1),0_0px_0px_4px_rgba(217,45,32,0.12)]",
          "disabled:cursor-not-allowed disabled:bg-neutral-400"
        ]
      },
      size: {
        md: "gap-1 rounded px-4 py-[10px] text-sm",
        lg: "gap-[6px] rounded px-[18px] py-[10px] text-base",
        xl: "gap-[6px] rounded px-[22px] py-3 text-base",
        "2xl": "gap-[10px] rounded px-[26px] py-4 text-lg",
        "icon-2xl": "gap-[10px] rounded p-4 text-lg",
        "md-link": "gap-1 rounded text-sm",
        "lg-link": "gap-[6px] rounded text-base",
        "xl-link": "gap-[6px] rounded text-base",
        "2xl-link": "gap-[10px] rounded text-lg"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  textContent?: string;
  icon?: React.ReactElement;
  iconPosition?: "left" | "right";
  iconSize?: number;
  isDisabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      textContent,
      isDisabled = false,
      icon,
      iconPosition = "left",
      iconSize,
      variant,
      size,
      className,
      ...props
    },
    ref
  ) => {
    // Clone the icon if it exists and iconSize is provided
    const renderedIcon = icon && iconSize
      ? cloneElement(icon, { size: iconSize })
      : icon;

    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {iconPosition === "left" && renderedIcon}
        {textContent}
        {iconPosition === "right" && renderedIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
