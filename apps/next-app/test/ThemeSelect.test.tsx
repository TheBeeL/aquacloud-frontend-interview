import ThemeSelect, { themeAtom } from "@/components/ThemeSelect";
import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { useAtomValue } from "jotai";

test("ThemeSelect is visible and has select", () => {
  render(<ThemeSelect />);
  const { result } = renderHook(() => useAtomValue(themeAtom));
  const select = screen.getByTestId("select");
  expect(select).toBeVisible();
  expect(select).toHaveTextContent(/system/i);
  expect(select).toHaveTextContent(/dark/i);
  expect(select).toHaveTextContent(/light/i);
  expect(result.current).toBe("system");
});

test("ThemeSelect set to dark mode", () => {
  render(<ThemeSelect />);
  const { result } = renderHook(() => useAtomValue(themeAtom));
  const select = screen.getByTestId("select");
  fireEvent.change(select, { target: { value: "dark" } });
  expect(result.current).toBe("dark");
});

test("ThemeSelect set to light mode", () => {
  render(<ThemeSelect />);
  const { result } = renderHook(() => useAtomValue(themeAtom));
  const select = screen.getByTestId("select");
  fireEvent.change(select, { target: { value: "light" } });
  expect(result.current).toBe("light");
});
