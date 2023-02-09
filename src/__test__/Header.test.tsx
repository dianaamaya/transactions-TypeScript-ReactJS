import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import { BrowserRouter as Router} from 'react-router-dom'

test('should have specific navigation link text', () => {

  render(
    <Router>
        <Header />
    </Router>
  );

  expect(screen.getByText(/transactions/i)).toBeInTheDocument()
  expect(screen.getByText(/description/i)).toBeInTheDocument()
});


test('should have a specific title', () => {

  render(
    <Router>
        <Header />
    </Router>
  );

  expect(screen.getByText(/Millennium/)).toBeInTheDocument()
});



