import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import formatAnnotation from '../Functions/Formatter';
import { CreateOrUpdate } from '../Functions/Crud'

export default function Login(props) {


    const [question, setQuestion] = useState();
    const [firstPersAnnotation, setFirstPersAnnotation] = useState();
    const [lastBestAnnotation, setLastBestAnnotation] = useState();

    function save(e) {
        e.preventDefault();
        if (isValidAnnotation(firstPersAnnotation) && isValidAnnotation(lastBestAnnotation)) {
            var newQuesiton;
            if (props.question === undefined) {
                newQuesiton = {
                    "question": question,
                    "firstAnnotation": firstPersAnnotation,
                    "lastBestAnnotation": lastBestAnnotation
                }
            } else {
                newQuesiton = {
                    "id": props.question.id,
                    "question": question,
                    "firstAnnotation": firstPersAnnotation,
                    "lastBestAnnotation": lastBestAnnotation
                }
            }

            CreateOrUpdate(newQuesiton)
                .then(response => {
                    if (response.status === 200) {
                        props.setEditQuestion(undefined);
                        props.setForm(false);
                        props.setLoading(true);
                    }
                });


        } else {
            alert("Please check if all values are valid")
        }

    }

    useEffect(() => {
        if (props.question !== undefined) {
            setQuestion(props.question.question);
            setFirstPersAnnotation(props.question.firstAnnotation);
            setLastBestAnnotation(props.question.lastBestAnnotation);
        }
    }, [props.question])


    function isValidAnnotation(annotation) {
        if (annotation !== undefined) {
            return annotation.includes("%s") && annotation.includes("%d")
        }
    }

    function exampleText(annotation) {
        if (isValidAnnotation(annotation)) {
            return (
                <Form.Text className="text-muted">
                    Example: {formatAnnotation(
                    annotation,
                    props.testName,
                    props.testDrinkCount
                )}
                </Form.Text>
            )
        } else {
            return (
                <Form.Text className="text-danger">
                    Annotation must contian <b>%s</b> and <b>%d</b>!
                </Form.Text>
            )
        }
    }

    return (
        <Card>
            <Card.Body>
                <Form onSubmit={(e) => save(e)}>
                    <Form.Group >
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                            readOnly
                            type="text"
                            defaultValue={(props.question !== undefined) ? props.question.id : "ID"}
                        />
                    </Form.Group >
                    <Form.Group >
                        <Form.Label>Question</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={1}
                            type="text"
                            defaultValue={(props.question !== undefined) ? props.question.question : ""}
                            placeholder={(props.question !== undefined) ?
                                `Previous: '${props.question.question}'` :
                                "Question: question is asked on the beginning of the round"}
                            onChange={(e) => setQuestion(e.target.value)}
                        />

                    </Form.Group>
                    <Form.Group >
                        <Form.Label>First person annotation</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            type="text"
                            defaultValue={(props.question !== undefined) ? props.question.firstAnnotation : ""}
                            placeholder={(props.question !== undefined) ?
                                `Previous: '${props.question.firstAnnotation}'` :
                                "'%s' is replaced with a name, '%d' is replaced with the drinkcount."}
                            onChange={(e) => setFirstPersAnnotation(e.target.value)}
                        />
                        {exampleText(firstPersAnnotation)}
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Last best annotation</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            type="text"
                            defaultValue={(props.question !== undefined) ? props.question.lastBestAnnotation : ""}
                            placeholder={(props.question !== undefined) ?
                                `Previous: '${props.question.lastBestAnnotation}'` :
                                "'%s' is replaced with a name, '%d' is replaced with the drinkcount."}
                            onChange={(e) => setLastBestAnnotation(e.target.value)}
                        />
                        {exampleText(lastBestAnnotation)}
                    </Form.Group>
                    <Button variant="primary" type="submit">Save</Button>
                </Form>
            </Card.Body>
        </Card >
    );
}
