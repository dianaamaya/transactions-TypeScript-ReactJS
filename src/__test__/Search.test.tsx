import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react';
import { within } from '@testing-library/dom'
import { server } from './__mocks__/server'
import App from '../App';

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('should show no data found when there are no results',  async () => {

    render(<App />)
    const user = userEvent.setup()
   
    await waitFor(() => screen.getByTestId("transactionsTable"))
    expect(screen.getAllByRole("row").length).toBe(2)
    
    await user.type(screen.getByTestId("search"), 'some text')
    expect(screen.getByText(/no data found/i)).toBeInTheDocument()
  })

  test('should show 2 rows when searching for Callie Nieves',  async () => {

    render(<App />)
    const user = userEvent.setup()
   
    await waitFor(() => screen.getByTestId("transactionsTable"))
    expect(screen.getAllByRole("row").length).toBe(2)
    
    await user.type(screen.getByTestId("search"), 'Callie Nieves')
    expect(screen.getAllByRole("row").length).toBe(2)
  })