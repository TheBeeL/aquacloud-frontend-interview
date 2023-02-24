import { VariantProps, cva } from "class-variance-authority";
import { ForwardedRef, forwardRef } from "react";

const variants = cva(["rounded p-2 text-center"], {
  variants: {
    intent: {
      default: "bg-slate-400 dark:bg-slate-600",
      info: "bg-sky-400 dark:bg-sky-800",
      success: "bg-green-400 dark:bg-green-800",
      warning: "bg-orange-400 dark:bg-orange-800",
      error: "bg-red-400 dark:bg-red-800",
    },
  },
  defaultVariants: { intent: "default" },
});

interface AlertProps extends VariantProps<typeof variants> {
  className?: string;
  message: string;
}

export const Alert = forwardRef(
  (
    { className, message, intent }: AlertProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div
        ref={ref}
        className={variants({ class: className, intent })}
        role="alert"
      >
        {message}
      </div>
    );
  },
);
