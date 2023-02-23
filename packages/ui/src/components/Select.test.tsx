import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Select } from "./Select";

test("Select is visible with options", () => {
  render(<Select options={{ first: "one", second: "two" }} />);
  const select = screen.getByTestId("select");
  expect(select).toBeVisible();
  expect(select).toHaveTextContent("one");
  expect(select).toHaveTextContent("two");
  const options: HTMLOptionElement[] = screen.getAllByTestId("option");
  expect(options.length).toBe(2);
  expect(options[0]?.selected).toBeTruthy();
  expect(options[1]?.selected).toBeFalsy();
});

test("Select onChange event", () => {
  const onChange = vi.fn();
  render(
    <Select onChange={onChange} options={{ first: "one", second: "two" }} />,
  );
  const select = screen.getByTestId("select");
  fireEvent.change(select, {
    target: { value: "second" },
  });
  expect(select).toHaveValue("second");
  const options: HTMLOptionElement[] = screen.getAllByTestId("option");
  expect(options[0]?.selected).toBeFalsy();
  expect(options[1]?.selected).toBeTruthy();
  expect(onChange).toBeCalled();
});
