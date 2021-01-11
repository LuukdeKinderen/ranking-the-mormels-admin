import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner'

export default function EditTalbe(props) {

    const [quesitons, setQuestions] = useState(undefined);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_QUESTION_DOMAIN}/question/all`)
            .then(response => response.json())
            .then(data => {
                setQuestions(data);
                console.log(data);
            });
    }, [])


    if (quesitons !== undefined) {
        return (
            <Card>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Question</th>
                                <th>First person annotation</th>
                                <th>Last best annotation</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {(quesitons || []).map(q => (
                                //console.log(q);
                                <tr key={q}>
                                    <td>{q.id}</td>
                                    <td>{q.question}</td>
                                    <td>{q.firstAnnotation}</td>
                                    <td>{q.lastBestAnnotation}</td>
                                    <td>actions</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
    else {
        return (
            <Card>
                <Card.Body>
                    <Spinner animation="border" variant="primary" />
                </Card.Body>
            </Card>
        );
    }
}
