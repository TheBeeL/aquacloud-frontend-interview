import { PropsWithChildren, ReactNode } from "react";
import { VariantProps, cva } from "class-variance-authority";
import Item from "./Item";

const variants = cva(["flex flex-col rounded bg-slate-200 dark:bg-slate-800"], {
  variants: {
    density: {
      default: "gap-3 p-2",
      comfortable: "gap-2 p-1",
      compact: "gap-1 p-0",
    },
  },
  defaultVariants: { density: "default" },
});

export interface ListProps extends VariantProps<typeof variants> {
  children?: ReactNode;
  className?: string;
}

const List = ({ children, className, density }: ListProps) => {
  return (
    <ul className={variants({ class: className, density })}>{children}</ul>
  );
};

List.Item = Item;

export default List;
