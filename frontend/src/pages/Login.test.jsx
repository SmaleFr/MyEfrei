import { render, screen } from '@testing-library/react';
import Login from './Login';
test('Affiche le titre Connexion', () => {
  render(<Login />);
  expect(screen.getByText(/Connexion/i)).toBeInTheDocument();
});