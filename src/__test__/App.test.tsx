import { render, screen } from '@testing-library/react'
import { server } from './__mocks__/server'
import App from '../App';

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

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



