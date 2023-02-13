import { render, screen, waitFor } from '@testing-library/react'
import { server, GET_TRANSACTION_API } from './__mocks__/server'
import { rest } from 'msw'
import App from '../App';

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('should show the current balance -2008.75',  async () => {

  render(<App />)
  await waitFor(() => screen.getByTestId("transactionsTable"))
  expect(screen.getByTestId("balance")).toHaveTextContent(/-2008.75/i)
})

test("should show 0 when there are no results", async () => {
    server.use(
      rest.get(GET_TRANSACTION_API, (req, res, ctx) => {
        return res(ctx.json([]))
      }),
    )
    render(<App />);
    await waitFor(() => screen.getByText(/no data found/i))
  
    expect(screen.getByTestId("balance")).toHaveTextContent(/0/i)
  });