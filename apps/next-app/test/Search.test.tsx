import Search from "@/components/Search";
import { fireEvent, render, screen } from "@testing-library/react";

test("Search component is visible and has input and button", () => {
  render(<Search />);
  const form = screen.getByRole("form");
  expect(form).toBeVisible();
  expect(form).toHaveTextContent("Search");
  const button = screen.getByRole("button");
  expect(button).toBeVisible();
  expect(button).toHaveTextContent("Search");
  expect(button).toBeDisabled();
  const input = screen.getByRole("textbox");
  expect(input).toBeVisible();
  expect(input).toHaveAttribute("placeholder");
  expect(button).toHaveValue("");
});

test("Search button is enabled when text has length >= 3", () => {
  render(<Search />);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "yes" } });
  expect(screen.getByRole("button")).not.toBeDisabled();
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "no" } });
  expect(screen.getByRole("button")).toBeDisabled();
});

test("onSearch is called when button is clicked", () => {
  const onSearch = vi.fn();
  render(<Search onSearch={onSearch} />);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "yes" } });
  fireEvent.click(screen.getByRole("button"));
  expect(onSearch).toBeCalled();
});
