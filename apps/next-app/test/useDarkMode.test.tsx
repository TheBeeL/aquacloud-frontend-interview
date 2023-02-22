import { render } from "@testing-library/react";
import { expect, test } from "vitest";

import TestProvider from "test/mock/TestProvider";
import prefersDarkScheme from "test/mock/prefersDarkScheme";

import { themeAtom } from "@/components/ThemeSelect";
import useDarkMode from "@/utils/useDarkMode";

const DarkModeContainer = () => {
  useDarkMode();
  return <></>;
};

const DarkModeProvider = ({ theme = "system" }: { theme?: string }) => {
  return (
    <TestProvider initialValues={[[themeAtom, theme]] as const}>
      <DarkModeContainer />
    </TestProvider>
  );
};

describe("Within a system that prefers a dark scheme", () => {
  beforeAll(() => {
    prefersDarkScheme();
  });

  test("default to darkmode", () => {
    const { baseElement: body } = render(<DarkModeProvider />);
    expect(body.className).toContain("dark");
  });

  test("force darkmode", () => {
    const { baseElement: body } = render(<DarkModeProvider theme="dark" />);
    expect(body.className).toContain("dark");
  });

  test("force to lightmode", () => {
    const { baseElement: body } = render(<DarkModeProvider theme="light" />);
    expect(body.className).not.toContain("dark");
  });
});

describe("Within a system that does not prefer a dark scheme", () => {
  beforeAll(() => {
    prefersDarkScheme(false);
  });

  test("default to light mode", () => {
    const { baseElement: body } = render(<DarkModeProvider />);
    expect(body.className).not.toContain("dark");
  });

  test("force to darkmode", () => {
    const { baseElement: body } = render(<DarkModeProvider theme="dark" />);
    expect(body.className).toContain("dark");
  });

  test("force to lightmode", () => {
    const { baseElement: body } = render(<DarkModeProvider theme="light" />);
    expect(body.className).not.toContain("dark");
  });
});
