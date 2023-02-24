import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Button } from "./Button";

test("Button is visible", () => {
  render(<Button>Text</Button>);
  const button = screen.getByRole("button");
  expect(button).toBeVisible();
  expect(button).toHaveTextContent("Text");
});

test("Button onClick triggers", () => {
  const onClick = vi.fn();
  render(<Button onClick={onClick}>Text</Button>);
  fireEvent(
    screen.getByRole("button"),
    new MouseEvent("click", { bubbles: true }),
  );
  expect(onClick).toBeCalled();
});

test("Button intent is styling", () => {
  render(<Button intent="success">Text</Button>);
  expect(screen.getByRole("button")).toHaveClass(
    "bg-green-400",
    "dark:bg-green-800",
  );
});
