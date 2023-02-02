import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';

test('checking nav app: rendering/navigating', async () => {
    render(<App />)
    const user = userEvent.setup()

    expect(screen.getByText(/Balance/i)).toBeInTheDocument()

    const descriptionLink = screen.getByRole("link", { name: 'Description' })
    await user.click(descriptionLink)

    expect(screen.getByText(/INSTALATION/i)).toBeInTheDocument()
})