import { render, screen } from '@testing-library/react';
import Alert from '../components/Alert';

test('checking alert component: class and content', () => {
  const { container } = render(<Alert message='Success!' type='success' />);
  expect(screen.getByText(/Success!/i)).toBeInTheDocument();
  expect(container.className.includes("success")) 
});


