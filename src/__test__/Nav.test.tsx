import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';

test('should render the right content when changing navigation', async () => {
    render(<App />)
    const user = userEvent.setup()

    expect(screen.getByText(/Balance/i)).toBeInTheDocument()

    const descriptionLink = screen.getByRole("link", { name: 'Description' })
    await user.click(descriptionLink)

    expect(screen.getByText(/This application allows users to see/i)).toBeInTheDocument()
})