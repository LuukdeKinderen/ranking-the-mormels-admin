import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'

import App from '../App';

import Cookies from 'universal-cookie';

function ClearJwtCookies() {
  const cookies = new Cookies();

  cookies.remove('jwt', { path: '/' });
}

function AddGoodJwt() {
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



test('if jwt is set edit page is shown', () => {
  AddGoodJwt();

  render(<App />);
  const editPage = screen.getByTestId('edit-page');
  expect(editPage).toBeInTheDocument();
});




