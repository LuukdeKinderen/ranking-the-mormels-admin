import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export default function Login(props) {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

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
        fetch(`${process.env.REACT_APP_QUESTION_DOMAIN}/auth`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.jwt != null){
                    props.setJwt(data.jwt);
                }else{
                    alert("Incorrect username or password");
                }
            });
    }

    return (
        <Card>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicLogin">
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" onChange={(e) => setLogin(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Login</Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
