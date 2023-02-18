import { fetchJokes } from "@/utils/fetchJokes";
import { List } from "@aquacloud/ui";
import { useQuery } from "@tanstack/react-query";

interface JokePageProps {
  page?: number;
}

const JokePage = ({ page = 1 }: JokePageProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["jokes", page],
    queryFn: () => fetchJokes(page),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Server error...</div>;
  }

  return (
    <div>
      {data && data.size > 0 ? (
        <List>
          {data.data.map((joke) => (
            <List.Item key={joke.id}>{joke.value}</List.Item>
          ))}
        </List>
      ) : (
        <p>No more jokes 🙊</p>
      )}
    </div>
  );
};

export default JokePage;
