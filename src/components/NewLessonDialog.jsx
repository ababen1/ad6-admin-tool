import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import '../styles/NewLessonDialog.css'



export default function NewLessonDialog(props) {

    const [lessonData, setLessonData] = useState({
        name: '',
        sound: 'mixed',
        letters: [],
        exam: false,
        shuffle: false,
    })

    const form = (
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    שם השיעור
                </Form.Label>
                <Col sm={10}>
                    <Form.Control 
                    required 
                    type="text" 
                    placeholder="" 
                    onChange={(e) => setLessonData({...lessonData, name: e.target.value})}/>
                </Col>
            </Form.Group>
    
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    צליל השיעור
                </Form.Label>
                <Col sm={10}>
                    <Form.Select onChange={(e) => setLessonData({...lessonData, sound: e.target.value})}>
                        <option value="mixed">מעורב</option>
                        <option value="a">קמץ, פתח</option>
                        <option value="e">חיריק</option>
                        <option value="i">חולם</option>
                        <option value="o">קובוץ, שורוק</option>
                        <option value="u">סגול, צירה</option>
                    </Form.Select>
                </Col>
            </Form.Group>
    
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    אותיות
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" placeholder="" />
                </Col>
            </Form.Group>
    
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    מבחן
                </Form.Label>
                <Col sm={10} className="switch-container">
                    <Form.Check
                        type="switch"
                        id="is_test"
                        onChange={(e) => setLessonData({...lessonData, exam: e.target.checked})}
                    />
                </Col>
            </Form.Group>
    
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    ערבוב שאלות
                </Form.Label>
                <Col sm={10} className="switch-container">
                    <Form.Check
                        type="switch"
                        id="is_shuffle"
                        onChange={(e) => setLessonData({...lessonData, shuffle: e.target.checked})}
                    />
                </Col>
            </Form.Group>
            <center>
            <Button type='submit'>שמירה</Button>
            </center>
        </Form>
    )

    return (
        <>
            <Modal
                show={props.visible}
                onHide={props.onHide}
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>שיעור חדש</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {form}
                </Modal.Body>
            </Modal>
        </>
    );
}