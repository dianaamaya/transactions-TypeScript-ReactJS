import { render, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { rest } from 'msw'
import App from '../App'
import { server, GET_TRANSACTION_API } from './__mocks__/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("should show loading message when it is waiting for data", () => {
  render(<App />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument()
});

test("should show 2 rows in the table when data was loaded", async () => {
  render(<App />)
  await waitFor(() => screen.getAllByRole("row"))

  expect(screen.getAllByRole("row").length).toBe(2)
})

test("should show no data found message when no data was loaded from server", async () => {
  server.use(
    rest.get(GET_TRANSACTION_API, (req, res, ctx) => {
      return res(ctx.json([]))
    }),
  )
  render(<App />);
  await waitFor(() => screen.getByText(/no data found/i))

  expect(screen.getByText(/no data found/i)).toBeInTheDocument()
});

test("should show a error message when there is a problem getting transactions", async () => {
  server.use(
    rest.get(GET_TRANSACTION_API, (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )
  render(<App />);
  await waitFor(() => screen.getByTestId("alert"))

  expect(screen.getByTestId("alert")).toHaveTextContent(/Problem getting transactions/i);
});