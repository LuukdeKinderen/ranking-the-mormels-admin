import '@testing-library/jest-dom'
import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EditPage from '../EditPage'


var questions;

const server = setupServer(
    rest.get('/question/all', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(questions))
    }),
    rest.delete('/cud', (req, res, ctx) => {
        questions.shift();
        return res(
            ctx.status(200)
        )
    }),
)


beforeAll(() => {
    server.listen()

})
afterEach(() => {
    server.resetHandlers()
    questions = [
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
    ]
})
afterAll(() => server.close())

test('loading message is shown', () => {
    render(<EditPage />)
    const loadingHeader = screen.getByText(/Loading questions/i);
    expect(loadingHeader).toBeInTheDocument();
})

test('edit page is shown', async () => {
    render(<EditPage />)
    const editHeader = await screen.findByText(/Edit page/i);
    expect(editHeader).toBeInTheDocument();
})

test('question form is shown when clicked on new quesiton', async () => {
    render(<EditPage />)
    const newQuestionButton = await screen.findByTestId('new-question')
    userEvent.click(newQuestionButton)
    const questionForm = await screen.findByTestId('question-form-page')
    expect(questionForm).toBeInTheDocument();
})

test('question form is shown when clicked on edit quesiton', async () => {
    render(<EditPage />)
    const editQuestionButtons = await screen.findAllByTestId('edit-question')
    userEvent.click(editQuestionButtons[0])
    const questionForm = await screen.findByTestId('question-form-page')
    expect(questionForm).toBeInTheDocument();
})
