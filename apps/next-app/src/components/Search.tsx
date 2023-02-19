import { Button, TextInput } from "@aquacloud/ui";
import { FormEvent, useState } from "react";

interface SearchProps {
  minLength?: number;
  onSearch?: (term: string) => void;
}

const Search = ({ minLength = 3, onSearch }: SearchProps) => {
  const [term, setTerm] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch && onSearch(term);
  };

  return (
    <form
      className="flex gap-2 md:flex-col md:items-center"
      onSubmit={handleSubmit}
    >
      <TextInput
        className="grow md:w-full"
        placeholder="Search..."
        minLength={minLength}
        value={term}
        onChange={(e) => setTerm(e.currentTarget.value)}
      />
      <Button type="submit" intent="info" disabled={term.length < minLength}>
        Search
      </Button>
    </form>
  );
};

export default Search;
