import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../components/Modal';

test('checking modal: component content', () => {
  render(<Modal  title="Are you sure?" okFunction={() => {}} cancelFunction={() => {}}  />);
  expect(screen.getByText(/Are you sure/)).toBeInTheDocument();
});