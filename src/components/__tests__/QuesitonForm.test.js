import QuestionForm from '../QuestionForm'

import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const quesitonToEdit =
{
    "id": 1,
    "question": "Wie is het lastigste met drank op?",
    "firstAnnotation": "%s, ik hoop dat dit goed gaat, maar drink nog maar %d slokken",
    "lastBestAnnotation": "%s, dan kun jij nog prima %d slokken erbij hebben!"
}
const testName = "luuk de Kinderen"
const testDrinkCount = 3;

const goBack = () => { }
const setAlert = () => { }


const server = setupServer(
    rest.post('/cud', (req, res, ctx) => {
        //get stored in local storage door Login comp
        return res(
            ctx.status(200),
            ctx.json({ jwt: 'mocked_jwt_token' }))
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('shows error if annotation is not correct', async () => {
    render(<QuestionForm
        testName={testName}
        testDrinkCount={testDrinkCount}
        goBack={goBack}
        setAlert={setAlert}
    />)
    userEvent.type(
        screen.getByTestId('question-form-question'),
        'luuk de kinderen',
    )
    userEvent.type(
        screen.getByTestId('question-form-fpa'),
        '%s %d correct',
    )
    userEvent.type(
        screen.getByTestId('question-form-lba'),
        'incorrect',
    )

    const alert = await screen.findByTestId('annotation-error')

    expect(alert).toBeInTheDocument()
})

test('shows no error if annotation is correct', async () => {
    render(<QuestionForm
        testName={testName}
        testDrinkCount={testDrinkCount}
        goBack={goBack}
        setAlert={setAlert}
    />)
    userEvent.type(
        screen.getByTestId('question-form-question'),
        'luuk de kinderen',
    )
    userEvent.type(
        screen.getByTestId('question-form-fpa'),
        '%s %d correct',
    )
    userEvent.type(
        screen.getByTestId('question-form-lba'),
        '%s %d correct',
    )

    expect(screen.findByTestId('annotation-error')).toBeTruthy()
})
