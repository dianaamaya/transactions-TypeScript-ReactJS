import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from '../App';
import AddTransaction from '../components/transaction/AddTransaction';

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

test('should show a success message when adding a transaction',  async () => {

  render(<App />)
  const user = userEvent.setup()

  await user.type(screen.getByLabelText(/amount/i), '655.51')
  await user.type(screen.getByLabelText(/beneficiary/i), 'Earnestine Castillo')
  await user.type(screen.getByLabelText(/account/i), '10104415359647878000000000')
  await user.type(screen.getByLabelText(/address/i), '715 Bennet Court, Brogan, Arizona, 9202')
  await user.type(screen.getByLabelText(/description/i), 'Irure ut cillum mollit proident voluptate veniam.')

  await user.click(screen.getByRole('button', {name: /add transaction/i}))

  expect(screen.getByTestId("alert")).toHaveTextContent(/Transaction was added successfully!/i);
})

test('should show 3 table rows after adding new transaction',  async () => {

  render(<App />)
  const user = userEvent.setup()

  await user.type(screen.getByLabelText(/amount/i), '655.51')
  await user.type(screen.getByLabelText(/beneficiary/i), 'Earnestine Castillo')
  await user.type(screen.getByLabelText(/account/i), '10104415359647878000000000')
  await user.type(screen.getByLabelText(/address/i), '715 Bennet Court, Brogan, Arizona, 9202')
  await user.type(screen.getByLabelText(/description/i), 'Irure ut cillum mollit proident voluptate veniam.')

  await user.click(screen.getByRole('button', {name: /add transaction/i}))

  expect(screen.getAllByRole("row").length).toBe(3)
})

test('should show error message when amount input is not a number',  async () => {

  render(<AddTransaction />)
  const user = userEvent.setup()

  await user.type(screen.getByLabelText(/amount/i), 'some text here')
  await user.type(screen.getByLabelText(/beneficiary/i), 'Earnestine Castillo')
  await user.type(screen.getByLabelText(/account/i), '10104415359647878000000000')
  await user.type(screen.getByLabelText(/address/i), '715 Bennet Court, Brogan, Arizona, 9202')
  await user.type(screen.getByLabelText(/description/i), 'Irure ut cillum mollit proident voluptate veniam.')

  await user.click(screen.getByRole('button', {name: /add transaction/i}))

  expect(screen.getByText(/Amount quantity must be a number/i)).toBeInTheDocument()
})

test('should show error message when beneficiary input is empty',  async () => {

  render(<AddTransaction />)
  const user = userEvent.setup()

  await user.type(screen.getByLabelText(/amount/i), '655.51')
  await user.type(screen.getByLabelText(/account/i), '10104415359647878000000000')
  await user.type(screen.getByLabelText(/address/i), '715 Bennet Court, Brogan, Arizona, 9202')
  await user.type(screen.getByLabelText(/description/i), 'Irure ut cillum mollit proident voluptate veniam.')

  await user.click(screen.getByRole('button', {name: /add transaction/i}))
  
  expect(screen.getByText(/Beneficiary field must not be empty/i)).toBeInTheDocument()
})

test('should show error message when account input is not a number',  async () => {

  render(<AddTransaction />)
  const user = userEvent.setup()

  await user.type(screen.getByLabelText(/amount/i), '655.51')
  await user.type(screen.getByLabelText(/beneficiary/i), 'Earnestine Castillo')
  await user.type(screen.getByLabelText(/account/i), 'PL10104415359647878000000000')
  await user.type(screen.getByLabelText(/address/i), '715 Bennet Court, Brogan, Arizona, 9202')
  await user.type(screen.getByLabelText(/description/i), 'Irure ut cillum mollit proident voluptate veniam.')

  await user.click(screen.getByRole('button', {name: /add transaction/i}))
  
  expect(screen.getByText(/Account field must be only numbers/i)).toBeInTheDocument()
})

test('should show error message when address input is empty',  async () => {

  render(<AddTransaction />)
  const user = userEvent.setup()

  await user.type(screen.getByLabelText(/amount/i), '655.51')
  await user.type(screen.getByLabelText(/beneficiary/i), 'Earnestine Castillo')
  await user.type(screen.getByLabelText(/account/i), '10104415359647878000000000')
  await user.type(screen.getByLabelText(/description/i), 'Irure ut cillum mollit proident voluptate veniam.')

  await user.click(screen.getByRole('button', {name: /add transaction/i}))
  
  expect(screen.getByText(/Address field must not be empty/i)).toBeInTheDocument()
})

test('should show error message when description input is empty',  async () => {

  render(<AddTransaction />)
  const user = userEvent.setup()

  await user.type(screen.getByLabelText(/amount/i), '655.51')
  await user.type(screen.getByLabelText(/beneficiary/i), 'Earnestine Castillo')
  await user.type(screen.getByLabelText(/account/i), '10104415359647878000000000')
  await user.type(screen.getByLabelText(/address/i), '715 Bennet Court, Brogan, Arizona, 9202')

  await user.click(screen.getByRole('button', {name: /add transaction/i}))
  
  expect(screen.getByText(/Description field must not be empty/i)).toBeInTheDocument()
})

test('should clean the form after handling a new transaction', async () => {

  render(<AddTransaction />)
  const user = userEvent.setup()

  await user.type(screen.getByLabelText(/amount/i), '655.51')
  await user.type(screen.getByLabelText(/beneficiary/i), 'Earnestine Castillo')
  await user.type(screen.getByLabelText(/account/i), '10104415359647878000000000')
  await user.type(screen.getByLabelText(/address/i), '715 Bennet Court, Brogan, Arizona, 9202')
  await user.type(screen.getByLabelText(/description/i), 'Irure ut cillum mollit proident voluptate veniam.')

  await user.click(screen.getByRole('button', {name: /add transaction/i}))

  expect(screen.getByLabelText(/amount/i)).toHaveValue("")
  expect(screen.getByLabelText(/beneficiary/i)).toHaveValue("")
  expect(screen.getByLabelText(/account/i)).toHaveValue("")
  expect(screen.getByLabelText(/address/i)).toHaveValue("")
  expect(screen.getByLabelText(/description/i)).toHaveValue("")

})