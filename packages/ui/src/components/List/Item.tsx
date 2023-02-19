import { VariantProps, cva } from "class-variance-authority";
import { ReactNode } from "react";

const variants = cva(
  ["border rounded border-slate-800 dark:border-slate-200"],
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

export interface ListItemProps extends VariantProps<typeof variants> {
  children?: ReactNode;
  className?: string;
}

const Item = ({ children, className, density }: ListItemProps) => {
  return (
    <li className={variants({ class: className, density })}>{children}</li>
  );
};

export default Item;
