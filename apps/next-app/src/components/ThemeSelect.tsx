import { Select } from "@aquacloud/ui";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const themeAtom = atomWithStorage("theme", "system");

const ThemeSelect = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  const handleChange = (value: string) => {
    setTheme(value);
  };

  return (
    <Select
      options={{ system: "Adapt to System", dark: "Dark", light: "Light" }}
      onChange={handleChange}
      value={theme}
    />
  );
};

export default ThemeSelect;
