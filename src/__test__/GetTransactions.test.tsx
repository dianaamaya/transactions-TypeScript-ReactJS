import { render, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from '../App'


const GET_TRANSACTION_API = process.env.REACT_APP_GET_TRANSACTION_API || ''

const server = setupServer(
  rest.get(GET_TRANSACTION_API, (req, res, ctx) => {
    return res(ctx.json([{
      id: 0,
      amount: -2008.75,
      beneficiary: "Callie Nieves",
      account: "PL10104092290785174000000000",
      address: "185 Berkeley Place, Brady, West Virginia, 7409",
      date: "2021-12-15T01:05:42",
      description: "Amet amet qui proident sint esse adipisicing amet."
    }]))
  }),
)

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