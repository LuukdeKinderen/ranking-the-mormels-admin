
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';

import { BsPencil } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BsFileEarmarkPlus } from "react-icons/bs";

import { formatAnnotation } from '../Functions/Formatter'



export default function QuestionTable(props) {
    return (
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

                    {(props.questions || []).map(q => (
                        //console.log(q);
                        <tr key={q.id}>
                            <td>{q.id}</td>
                            <td>{q.question}</td>
                            <td>{formatAnnotation(q.firstAnnotation, props.testName, props.testDrinkCount)}</td>
                            <td>{formatAnnotation(q.lastBestAnnotation, props.testName, props.testDrinkCount)}</td>
                            <td>
                                <Container>
                                    <Button style={{ marginBottom: '15px' }} variant="warning" onClick={() => props.edit(q)}>
                                        <BsPencil />
                                    </Button>
                                    <Button variant="danger" onClick={() => props.remove(q)}>
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
                <Button variant="primary" onClick={() => props.create()}>
                    <BsFileEarmarkPlus />
                </Button>
            </OverlayTrigger>
        </>
    );
}
