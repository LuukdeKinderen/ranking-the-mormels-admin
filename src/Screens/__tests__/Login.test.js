import '@testing-library/jest-dom'
import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../Login'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function setJwt(jwt){
    cookies.set('jwt', jwt, { path: '/'});
}

const server = setupServer(
    rest.post('/auth', (req, res, ctx) => {
        //get stored in cookies bij Login comp
        return res(
            ctx.status(200),
            ctx.json({ jwt: 'mocked_jwt_token' }))
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('allows the user to log in', async () => {
    cookies.remove("jwt");
    server.use(
        rest.post('/auth', (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({ jwt: 'mocked_jwt_token' }))
        }),
    )

    render(<Login setJwt={setJwt} />)
    userEvent.type(
        screen.getByLabelText(/Account/i),
        'luuk de kinderen',
    )
    userEvent.type(
        screen.getByLabelText(/Password/i),
        'correct password',
    )
    userEvent.click(screen.getByText(/Login/i))
    const alert = await screen.findByRole('alert')

    // Assert successful login state
    expect(alert).toHaveTextContent(/Logged in/i)
    expect(cookies.get('jwt')).toEqual('mocked_jwt_token')
})

test('handles login fail', async () => {
    cookies.remove("jwt");
    server.use(
        rest.post('/auth', (req, res, ctx) => {
            // Respond with "403 Forbidden" status for this test.
            return res(
                ctx.status(403),
            )
        }),
    )

    render(<Login />)
    userEvent.type(
        screen.getByLabelText(/Account/i),
        'luuk de kinderen',
    )
    userEvent.type(
        screen.getByLabelText(/Password/i),
        'false password',
    )
    userEvent.click(screen.getByText(/Login/i))
    const alert = await screen.findByRole('alert')

    // Assert unsuccessful login state
    expect(alert).toHaveTextContent(/Incorrect username or password/i)
    expect(cookies.get('jwt')).toEqual(undefined)
})


