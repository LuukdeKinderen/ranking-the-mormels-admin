import { render, screen } from '@testing-library/react';
import App from './App';

import { setupWorker, rest } from 'msw'
import Cookies from 'universal-cookie';




function ClearJwtCookies(){
  const cookies = new Cookies();

  cookies.remove('jwt', { path: '/' });
}

function AddGoodJwt(){
  const cookies = new Cookies();
  var expires = new Date(Date.now() + 1000 * 60 * 60 * 10);
  cookies.set('jwt', "goodJwt", { path: '/', expires: expires });
}

test('if jwt is not set login page shows', () => {
  ClearJwtCookies();

  render(<App />);
  const login = screen.getByText(/Login/i);
  expect(login).toBeInTheDocument();
});



test('if jwt is set login page shows', () => {
  AddGoodJwt();

  render(<App />);
  const tableHeader = screen.getByText(/Loading questions/i);
  expect(tableHeader).toBeInTheDocument();
});
