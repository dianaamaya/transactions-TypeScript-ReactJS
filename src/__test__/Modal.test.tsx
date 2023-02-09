import { render, screen } from '@testing-library/react';
import Modal from '../components/Modal';

test('should show the message received as a parameter', () => {
  
  render(<Modal  
          title="Are you sure?" 
          okFunction={() => {}} 
          cancelFunction={() => {}}  
        />);

  expect(screen.getByText(/Are you sure/)).toBeInTheDocument();
});