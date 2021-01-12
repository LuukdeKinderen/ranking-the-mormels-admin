import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { formatedUrl } from '../Functions/Formatter'

export default function Login(props) {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [alert, setAlert] = useState();

    useEffect(() => {
        setAlert(undefined);
    }, [login, password])

    const handleSubmit = (e) => {
        e.preventDefault();

        const creds = {
            username: login,
            password: password
        }

        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(creds)
        };
        fetch(formatedUrl('/auth'), requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(response => response.json())
            .then(data => {
                if (data.jwt != null) {
                    setAlert(
                        <Alert variant={'primary'}>
                            Logged in
                          </Alert>
                    )
                    props.setJwt(data.jwt);

                }
            }).catch(function (error) {
                setAlert(
                    <Alert variant={'danger'}>
                        Incorrect username or password
                          </Alert>
                )
            });
    }

    return (
        <Card>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicLogin">
                        <Form.Label>Account</Form.Label>
                        <Form.Control type="text" placeholder="Enter account" onChange={(e) => setLogin(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    {alert}
                    <Button variant="primary" type="submit">Login</Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
