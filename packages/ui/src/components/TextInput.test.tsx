import { fireEvent, render, screen } from "@testing-library/react";
import { TextInput } from "./TextInput";

test("TextInput is visible", () => {
  render(<TextInput placeholder="Text" />);
  const textInput = screen.getByRole("textbox");
  expect(textInput).toBeVisible();
  expect(textInput).toHaveValue("");
});

test("TextInput value can be set", () => {
  render(<TextInput defaultValue="Value" />);
  expect(screen.getByRole("textbox")).toHaveValue("Value");
});

test("TextInput value set with event", () => {
  render(<TextInput />);
  const textInput = screen.getByRole("textbox");
  fireEvent.change(textInput, { target: { value: "input" } });
  expect(screen.getByRole("textbox")).toHaveValue("input");
});
