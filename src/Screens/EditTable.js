import { useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';

import { BsPencil } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BsFileEarmarkPlus } from "react-icons/bs";

import QuestionForm from '../components/QuestionForm';

import { remove as dbRemove} from '../Functions/Crud'
import formatAnnotation from '../Functions/Formatter';


export default function EditTalbe(props) {

    const [quesitons, setQuestions] = useState(undefined);
    const [loading, setLoading] = useState(true);

    const [testName, setTestName] = useState("John Doe");
    const [testDrinkCount, setTestDrinkCount] = useState(3);

    const [form, setForm] = useState(false);
    const [editQuestion, setEditQuestion] = useState(undefined);



    useEffect(() => {
        if (loading === true) {
            fetch(`${process.env.REACT_APP_QUESTION_DOMAIN}/question/all`)
                .then(response => response.json())
                .then(data => {
                    setQuestions(data);
                    setLoading(false);
                });
        }
    }, [loading])



    function create() {
        setEditQuestion(undefined);
        setForm(true);
    }

    function edit(question) {
        setEditQuestion(question);
        setForm(true);
    }

    function remove(question) {
        dbRemove(question)
            .then(response => {
                if (response.status === 200) {
                    setLoading(true);
                }
            });

    }

    if (!loading) {
        return (
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <Form.Label>Test name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                onChange={(e) => setTestName(e.target.value)}
                                value={testName}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Test drink count</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Drink count"
                                onChange={(e) => setTestDrinkCount(e.target.value)}
                                value={testDrinkCount}
                            />
                        </Col>


                    </Row>

                </Card.Body>
                <Card.Body>
                    {form ? <QuestionForm
                        question={editQuestion}
                        testName={testName}
                        testDrinkCount={testDrinkCount}
                        setLoading={setLoading}
                        setEditQuestion={setEditQuestion}
                        setForm={setForm}
                    /> :
                        <>
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
                                        <tr key={q.id}>
                                            <td>{q.id}</td>
                                            <td>{q.question}</td>
                                            <td>{formatAnnotation(q.firstAnnotation, testName, testDrinkCount)}</td>
                                            <td>{formatAnnotation(q.lastBestAnnotation, testName, testDrinkCount)}</td>
                                            <td>
                                                <Container>
                                                    <Button style={{ marginBottom: '15px' }} variant="warning" onClick={() => edit(q)}>
                                                        <BsPencil />
                                                    </Button>
                                                    <Button variant="danger" onClick={() => remove(q)}>
                                                        <BsTrash />
                                                    </Button>
                                                </Container>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip>
                                    Create a new Question
                                </Tooltip>}
                            >
                                <Button variant="primary" onClick={() => create()}>
                                    <BsFileEarmarkPlus />
                                </Button>
                            </OverlayTrigger>
                        </>
                    }
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
