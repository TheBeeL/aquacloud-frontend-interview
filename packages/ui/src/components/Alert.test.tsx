import { render, screen } from "@testing-library/react";
import { Alert } from "./Alert";

test("Alert is visible", () => {
  render(<Alert message="Text" />);
  const alert = screen.getByRole("alert");
  expect(alert).toBeVisible();
  expect(alert).toHaveTextContent("Text");
});

test("Alert intent is styling", () => {
  render(<Alert intent="success" message="Text" />);
  expect(screen.getByRole("alert")).toHaveClass(
    "bg-green-400",
    "dark:bg-green-800",
  );
});
