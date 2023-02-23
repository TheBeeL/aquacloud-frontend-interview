import { render, screen } from "@testing-library/react";
import List from "./List";

test("List is visible", () => {
  render(
    <List>
      <List.Item>Item</List.Item>
      <List.Item>Item2</List.Item>
    </List>,
  );
  const list = screen.getByRole("list");
  expect(list).toBeVisible();
  expect(list).toHaveTextContent("Item");
  expect(list).toHaveTextContent("Item2");
});
