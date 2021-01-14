import { useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert';
import QuestionForm from '../components/QuestionForm';

import { Cud } from '../Functions/Crud'
import { formatedUrl } from '../Functions/Formatter';
import QuestionTable from '../components/QuestionTable';


export default function EditPage(props) {

    const [questions, setQuestions] = useState(undefined);
    const [loading, setLoading] = useState(true);

    const [testName, setTestName] = useState("John Doe");
    const [testDrinkCount, setTestDrinkCount] = useState(3);

    const [form, setForm] = useState(false);
    const [editQuestion, setEditQuestion] = useState(undefined);

    const [alertMessage, setAlert] = useState();



    useEffect(() => {
        if (loading === true) {
            fetch(formatedUrl('/question/all'))
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response;
                })
                .then(response => response.json())
                .then(data => {
                    setQuestions(data);
                    setLoading(false);
                    setAlert(undefined);
                }).catch((error) => {
                    setLoading(false);
                    alert("Something went wrong, try again?");
                    setLoading(true);
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
        Cud(question, "DELETE")
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(response => {
                if (response.status === 200) {
                    setLoading(true);
                    setAlert(undefined);
                }
            }).catch(function (error) {
                setAlert(
                    <Alert variant={'danger'}>Something went wrong</Alert>
                )
            });
    }

    function goBack(){
        setLoading(true);
        setEditQuestion(undefined);
        setForm(false);
        setAlert(undefined);
    }

    if (!loading) {
        return (
            <Card>
                <Card.Body>
                    <h1>Edit page</h1>
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
                        goBack={goBack}
                        setAlert={setAlert}
                    /> :
                        <QuestionTable
                            testName={testName}
                            testDrinkCount={testDrinkCount}
                            questions={questions}
                            edit={edit}
                            remove={remove}
                            create={create}
                        />

                    }
                </Card.Body>
                <Card.Body>
                    {alertMessage}
                </Card.Body>
            </Card>
        );
    }
    else {
        return (
            <Card>
                <Card.Body>
                    <h1>Loading questions</h1>
                    <Spinner animation="border" variant="primary" />
                </Card.Body>
            </Card>
        );
    }
}
