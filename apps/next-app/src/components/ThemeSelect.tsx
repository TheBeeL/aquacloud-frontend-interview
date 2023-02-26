import { Select } from "@aquacloud/ui";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const themeAtom = atomWithStorage("theme", "system");

interface ThemeSelectProps {
  className?: string;
}

const ThemeSelect = ({ className = "" }: ThemeSelectProps) => {
  const [theme, setTheme] = useAtom(themeAtom);

  const handleChange = (value: string) => {
    setTheme(value);
  };

  return (
    <div className={className}>
      <label htmlFor="theme">Theme: </label>
      <Select
        id="theme"
        options={{ system: "System", dark: "Dark", light: "Light" }}
        onChange={handleChange}
        value={theme}
      />
    </div>
  );
};

export default ThemeSelect;
