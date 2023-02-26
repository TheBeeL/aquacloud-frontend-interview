import { Button } from "@aquacloud/ui";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface PaginationControlsProps {
  current: number;
  total: number;
  onNavigate?: (page: number) => void;
}

const PaginationControls = ({
  current,
  total,
  onNavigate = () => {},
}: PaginationControlsProps) => {
  const range = Array.from({ length: 5 }, (_, i) => current - 2 + i);

  return (
    <nav className="flex items-center justify-between gap-2">
      <Button disabled={current === 1} onClick={() => onNavigate(current - 1)}>
        <ChevronLeftIcon className="h-6 w-6" />
      </Button>
      <div className="flex items-center gap-2">
        {range.map((i) => (
          <Button
            key={i}
            link
            invisible={i < 1 || i > total}
            disabled={current === i}
            onClick={() => onNavigate(i)}
          >
            {i}
          </Button>
        ))}
      </div>
      <Button
        disabled={current === total}
        onClick={() => onNavigate(current + 1)}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </Button>
    </nav>
  );
};

export default PaginationControls;
