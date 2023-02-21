import { VariantProps, cva } from "class-variance-authority";
import { ForwardedRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { forwardRef } from "react";
import { ChangeEvent } from "react";
import { SelectHTMLAttributes } from "react";

const variants = cva(
  ["rounded focus-within:outline-none bg-slate-300 dark:bg-slate-600"],
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

interface SelectProps
  extends Omit<
      SelectHTMLAttributes<HTMLSelectElement>,
      "children" | "onChange"
    >,
    VariantProps<typeof variants> {
  options: Record<string, string>;
  value?: string;
  onChange?: (value: string) => void;
}

export const Select = forwardRef(
  (
    { className, options, onChange, density, ...props }: SelectProps,
    ref: ForwardedRef<HTMLSelectElement>,
  ) => {
    const [value, setValue] = useState(props.value);
    useEffect(() => {
      setValue(props.value);
    }, [props.value]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
      onChange && onChange(e.target.value);
    };

    return (
      <select
        ref={ref}
        value={value}
        className={variants({ class: className, density })}
        onChange={handleChange}
        {...props}
      >
        {Object.keys(options).map((key) => (
          <option key={key} value={key}>
            {options[key]}
          </option>
        ))}
      </select>
    );
  },
);
