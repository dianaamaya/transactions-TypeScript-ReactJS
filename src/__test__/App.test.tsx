import { render, screen } from '@testing-library/react';
import App from '../App';

describe("App", () => {
  test("rendering App component without crashing", () => {
    render(<App />);
  });
});

test('checking header content', () => {
  render(<App />);
  expect(screen.getByText(/transactions/i)).toBeInTheDocument();
  expect(screen.getByRole("heading")).toHaveTextContent(/Millennium/);
});




