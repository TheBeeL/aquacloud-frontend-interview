import { themeAtom } from "@/components/ThemeSelect";
import { useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";

/**
 * `useDarkMode` will apply the `dark` class to the html tag when needed
 */
const useDarkMode = () => {
  const theme = useAtomValue(themeAtom);
  const [preferDark, setPreferDark] = useState(false);
  const darkMedia = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)");
    }
  }, []);

  useEffect(() => {
    const handle = (e: MediaQueryListEvent) => setPreferDark(e.matches);
    if (darkMedia) {
      darkMedia.addEventListener(`change`, handle);
      if (darkMedia.matches) {
        setPreferDark(true);
      }
    }
    return () => darkMedia?.removeEventListener("change", handle);
  }, [darkMedia]);

  useEffect(() => {
    if (theme === "dark" || (theme === "system" && preferDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, preferDark]);
};

export default useDarkMode;
