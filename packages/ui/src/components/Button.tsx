import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react";

const variants = cva(["rounded select-none"], {
  variants: {
    intent: {
      default: "bg-slate-400 dark:bg-slate-600",
      info: "bg-sky-400 dark:bg-sky-800",
      success: "bg-green-400 dark:bg-green-800",
      warning: "bg-orange-400 dark:bg-orange-800",
      error: "bg-red-400 dark:bg-red-800",
    },
    density: {
      default: "p-2",
      comfortable: "p-1",
      compact: "p-0",
    },
    disabled: {
      true: "bg-slate-400 text-slate-600 dark:bg-slate-600 dark:text-slate-400",
    },
  },
  defaultVariants: { intent: "default", density: "default" },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof variants>, "disabled"> {}

export const Button = forwardRef(
  (
    { className, children, disabled, intent, ...props }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <button
        ref={ref}
        className={variants({ class: className, disabled, intent })}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);
