import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

test('should have a specific title at footer', () => {

  render(<Footer />)

  expect(screen.getByText(/Millennium/i)).toBeInTheDocument()
});