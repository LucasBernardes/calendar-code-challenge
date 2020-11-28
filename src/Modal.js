import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Col, Row, Form, ButtonGroup } from "react-bootstrap";

function AddEventModal(props) {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');

  const selectedDate = useSelector(state => state.selectedDate);
  const dispatch = useDispatch();
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log('valide:', form.checkValidity)
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } 

    setValidated(true);
    event.preventDefault();
    event.stopPropagation();
    console.log(event)
    console.log({
      title,
      city,
      date,
      hour,
    })
    dispatch({
      type: 'ADD_NEW_EVENT',
      data: {
        [date]: [{
          title,
          city,
          date,
          hour,
        }],
      },
    })
  };

  // const handleRemove = (data) => {
  //   dispatch({
  //     type: 'REMOVE_EVENT',
  //     data
  //   })
  // }
  
  return (
    <Modal show={props.addNewEventVisible} onHide={() => props.setAddNewEventVisible(false)} centered>
      <Modal.Header closeButton/>
      <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ margin: 20 }}>
        
        <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name for the event"
            onChange={e => setTitle(e.target.value)}
            partern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
            isInvalid={title.length >= 30}
            isValid={title && title.length < 30}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City (Ex: Tampa)" required onChange={e => setCity(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid City.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Date</Form.Label>
          <Form.Control type="text" placeholder="State" onChange={e => setDate(e.target.value)} required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Date.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Hour</Form.Label>
          <Form.Control
            isValid={hour.match("/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/") != null}
            // isInvalid={hour.match("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$") === null}
            type="text" placeholder="Hour (10:00)" required onChange={e => setHour(e.target.value)}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid Hour (Ex: 13:00).
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Group as={Col} md="3" controlId="validationCustom06">
        <Form.Label>Color</Form.Label>
        <ButtonGroup aria-label="Color">
          <Button style={{ backgroundColor: 'red' }} variant="secondary">Red</Button>
          <Button variant="primary">Blue</Button>
          <Button style={{ backgroundColor: 'green' }}variant="secondary">Green</Button>
        </ButtonGroup>
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
    </Modal>
  );
}

export default AddEventModal;