import { VariantProps, cva } from "class-variance-authority";
import {
  ForwardedRef,
  HTMLAttributes,
  HTMLProps,
  InputHTMLAttributes,
  forwardRef,
} from "react";

const variants = cva(
  [
    "rounded placeholder:italic focus-within:outline-none",
    "bg-slate-300",
    "dark:bg-slate-600",
  ],
  {
    variants: {
      density: {
        default: "p-2",
        comfortable: "p-1",
        compact: "p-0",
      },
    },
    defaultVariants: { density: "default" },
  },
);

interface TextInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof variants> {}

export const TextInput = forwardRef(
  (
    { className, ...props }: TextInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <input
        ref={ref}
        type="text"
        className={variants({ class: className })}
        {...props}
      />
    );
  },
);
