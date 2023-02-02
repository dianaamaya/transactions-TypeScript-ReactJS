import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react';
import AddTransaction from '../components/transaction/AddTransaction'

test('rendering and submitting: add transaction form', async () => {

  render(<AddTransaction />)
  const user = userEvent.setup()

  await user.type(screen.getByLabelText(/amount/i), '1200')
  await user.type(screen.getByLabelText(/beneficiary/i), 'beneficiary name')
  await user.type(screen.getByLabelText(/account/i), '123456')
  await user.type(screen.getByLabelText(/address/i), 'address')
  await user.type(screen.getByLabelText(/description/i), 'description')

  await user.click(screen.getByRole('button', {name: /add transaction/i}))

  expect(screen.getByText(/Transaction was added successfully!|Something was wrong.../i)).toBeInTheDocument();
  
})