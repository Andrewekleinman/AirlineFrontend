import { render, screen } from '@testing-library/react';
import App from './App';
import Component1 from './components/Component1';

test('renders learn react link', () => {
  render(<Component1 />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
