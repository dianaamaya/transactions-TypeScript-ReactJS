import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react';
import {within} from '@testing-library/dom'
import { server } from './__mocks__/server'
import App from '../App';

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('should show a confirmation modal when clicking on delete transaction button',  async () => {

  render(<App />)
  const user = userEvent.setup()
  await waitFor(() => screen.getByTestId("transactionsTable"))

  const transactionsTable = screen.getByTestId("transactionsTable")
  const buttons = within(transactionsTable).getAllByRole("button")

  await user.click(buttons[0])
  await waitFor(() => screen.getByTestId("modal"))

  expect(screen.getByTestId("modal")).toBeInTheDocument()
})

test('should show no data found when the only transaction was deleted',  async () => {

    window.scrollTo = jest.fn()

    render(<App />)
    const user = userEvent.setup()
    await waitFor(() => screen.getByTestId("transactionsTable"))
  
    const transactionsTable = screen.getByTestId("transactionsTable")
    const buttons = within(transactionsTable).getAllByRole("button")
  
    await user.click(buttons[0])
    await waitFor(() => screen.getByTestId("modal"))

    const modal = screen.getByTestId("modal")
    const confirmButton = within(modal).getAllByRole("button", { name: /yes/i })
    
    await user.click(confirmButton[0])
    expect(screen.getByText(/no data found/i)).toBeInTheDocument()
  })