/**
 * Mock `window` with `matchMedia` with `matches`, `addEventListner`, `removeEventListner `
 * @param dark value to assing to `matches`, default is `true`
 */
const prefersDarkScheme = (dark: boolean = true) => {
  Object.defineProperty(window, "matchMedia", {
    value: vi.fn().mockImplementation(() => ({
      matches: dark,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
};

export default prefersDarkScheme;
