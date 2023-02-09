import { render, screen } from '@testing-library/react';
import App from '../App';

describe("App", () => {
  test("should render App component without crashing", () => {
    render(<App />);
  });
});


test('should have required content', () => {
  render(<App />);
  expect(screen.getByRole("navigation")).toBeInTheDocument();
  expect(screen.getByRole("heading")).toBeInTheDocument();
  expect(screen.getByRole("main")).toBeInTheDocument();
});



