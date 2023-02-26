import { Select } from "@aquacloud/ui";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type DisplayType = "scroll" | "paginated";

export const displayAtom = atomWithStorage<DisplayType>("display", "scroll");

interface DisplaySelectorProps {
  className?: string;
}

const DisplaySelector = ({ className = "" }: DisplaySelectorProps) => {
  const [display, setDisplay] = useAtom(displayAtom);

  const handleChange = (value: string) => {
    setDisplay(value as DisplayType);
  };

  return (
    <div className={className}>
      <label htmlFor="display">Display: </label>
      <Select
        id="display"
        options={{ scroll: "Infinite Scroll", paginated: "Paginated" }}
        onChange={handleChange}
        value={display}
      />
    </div>
  );
};

export default DisplaySelector;
