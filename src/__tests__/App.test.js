import '@testing-library/jest-dom'
import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'

import App from '../App';

import Cookies from 'universal-cookie';

const server = setupServer(
  rest.get('/question/all', (req, res, ctx) => {
    //get stored in local storage door Login comp
    return res(
      ctx.status(200),
      ctx.json([
        {
          "id": 1,
          "question": "Wie is het lastigste met drank op?",
          "firstAnnotation": "%s, ik hoop dat dit goed gaat, maar drink nog maar %d slokken",
          "lastBestAnnotation": "%s, dan kun jij nog prima %d slokken erbij hebben!"
        },
        {
          "id": 2,
          "question": "Wie kan het beste mannen / vrouwen versieren?",
          "firstAnnotation": "Gelooft %s in liefde na de eerste slok? Nee wacht... drink maar %d slokken",
          "lastBestAnnotation": "%s, deed het pijn toen je uit de hemel viel? Drink maar %d slokken..."
        },
        {
          "id": 3,
          "question": "Wie is de grootste slet?",
          "firstAnnotation": "%s valt in de smaak! Ik hoop de %d slokken ook",
          "lastBestAnnotation": "Heilige %s, drink maar %d slokken..."
        },
        {
          "id": 4,
          "question": "Wie zou als eerste in de gevangenis terecht komen?",
          "firstAnnotation": "WANTED: %s. Straf afkopen met %d slokken",
          "lastBestAnnotation": "%s komt gewoon overal onder uit! Je komt in ieder geval niet onder de %d slokken uit!"
        },
        {
          "id": 5,
          "question": "Wie is de ideale schoonzoon/dochter?",
          "firstAnnotation": "%s is de perfecte partij voor je zoon/dochter. Jij hebt %d slokken verdient",
          "lastBestAnnotation": "%s, misschien helpen %d slokken je meer in de richting?"
        }
      ]))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())



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



test('if jwt is set loading process is triggerd', () => {
  AddGoodJwt();

  render(<App />);
  const loadingHeader = screen.getByText(/Loading questions/i);
  expect(loadingHeader).toBeInTheDocument();
});

test('if loading is done editpage is shown', async () => {
  AddGoodJwt();

  render(<App />);
  const loadingHeader = await screen.findByText(/Edit page/i);
  expect(loadingHeader).toBeInTheDocument();
});



