import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";

const title = "dolorem eum magni eos aperiam quia";
const body =
  "ut aspernatur corporis harum nihil quis provident sequi mollitia nobis aliquid molestiae perspiciatis et ea nemo ab reprehenderit accusantium quas voluptate dolores velit et doloremque molestiae";
const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/posts/1", (req, res, ctx) => {
    return res(ctx.json({ title: title, body: body }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("Should render APP", async () => {
  render(<App />);

  const inputelement = screen.getByPlaceholderText("Type");
  const button = screen.getByRole("button", { name: /Search/i });

  expect(inputelement).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});
it("Should Reach Post Page", async () => {
  render(<App />);
  const inputelement = screen.getByPlaceholderText("Type");
  const button = screen.getByRole("button", { name: /Search/i });
  userEvent.type(inputelement, "1");
  userEvent.click(button);
  expect(window.location.pathname).toBe("/post");
  screen.debug();
  await waitFor(() => screen.getByText(title));
  await waitFor(() => screen.getByText(body));
  expect(screen.getByText(title)).toHaveTextContent(title);
  expect(screen.getByText(body)).toHaveTextContent(body);
  const linkelement = screen.getByText(/back to home/i).closest("a");
  expect(linkelement).toBeInTheDocument();
  console.log(linkelement);
  fireEvent.click(linkelement);
  expect(window.location.pathname).toBe("/");
});
