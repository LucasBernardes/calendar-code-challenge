import { Badge, Button, Col, Row, Form, Modal, ButtonGroup, ToggleButton, Container } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { radios } from './static';

function CreateEvent(props) {
  const { selectedDate } = props;
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState(selectedDate && selectedDate.date ? selectedDate.date : '');
  const [hour, setHour] = useState('');
  const dispatch = useDispatch();
  const [radioValue, setRadioValue] = useState('0');
  // const hourRegex = /^[0-9][0-9][:][0-9][0-9]$/;

  useEffect(() => {
    if (props.addNewEventVisible) {
      if (selectedDate && selectedDate.date) {
        setDate(selectedDate.date)
      }
    }
    
  },[props.addNewEventVisible])

const handleSubmit = (event) => {
  const form = event.currentTarget;
  console.log('valide:', form.checkValidity)
  event.preventDefault();
  
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
  } 
  else {
    dispatch({
      type: 'ADD_NEW_EVENT',
      data: {
        [date]: [{
          title,
          city,
          date,
          hour,
          color: radios[radioValue].color
        }],
      },
    })
    setValidated(false);
    props.setAddNewEventVisible(false)
    cleanField()
    // cleanField()
  }
  
  // setValidated(true);
};

const cleanField = () => {
  setTitle('');
  setCity('');
  setDate('');
  setHour('');
  setRadioValue('0')
  setValidated(false);
}

  return(
    <>
    <Modal.Header className="header-color" closeButton>
      <Modal.Title>Creating Event</Modal.Title>
    </Modal.Header>
    <Container>
      <Row className="justify-content-md-center mt-1">
        <h1>{console.log(`${date} ${hour}`)}
          <Badge variant="secondary" style={{ backgroundColor: radios[radioValue].color }}>{moment(`${date} ${hour}`).format('DD/MM/YYYY HH:mm').toString()}</Badge>
        </h1>
      </Row>
    </Container>
    
    <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ margin: '5px 40px 40px 40px' }}> 
      <Form.Label>Title</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Name for the event"
          onChange={e => setTitle(e.target.value)}
          isInvalid={title.length >= 30}
          isValid={title}
        />
        <Form.Control.Feedback type="invalid">
          Provide a non-empty title with less than 30 chars.
        </Form.Control.Feedback>
    <Form.Row>
      <Form.Group as={Col} md="5" controlId="validationCustom03">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="(Ex: Tampa)"
          required
          onChange={e => setCity(e.target.value)}
          // isInvalid={city.length >= 30}
          isValid={city}/>
        <Form.Control.Feedback type="invalid">
          Please provide a valid City.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="4" controlId="validationCustom04">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="text"
          placeholder="State" 
          value={date}
          onChange={e => setDate(e.target.value)}
          required
          isInvalid={date && !moment(date, 'DD/MM/YYYY', true).isValid()}
          isValid={moment(date, 'DD/MM/YYYY', true).isValid()}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid Date(Ex: 20/12/2020).
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="3" controlId="validationCustom05">
        <Form.Label>Hour</Form.Label>
        {console.log(moment(hour, 'HH:mm', true))}
        <Form.Control
          isInvalid={hour && !moment(hour, 'HH:mm', true).isValid()}
          isValid={moment(hour, 'HH:mm', true).isValid()}
          // isInvalid={hour.match("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$") === null}
          type="text" placeholder="(Ex 10:00)" required onChange={e => setHour(e.target.value)}/>
        <Form.Control.Feedback type="invalid">
          Please provide a valid Hour (Ex: 13:00).
        </Form.Control.Feedback>
      </Form.Group>
    </Form.Row>
    <Row>
      <Container>
        <Form.Label>Color code</Form.Label>
          <ButtonGroup toggle>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                style={{ backgroundColor: radio.value === radioValue ? radio.color : 'lightGray' }}
                type="radio"
                variant="secondary"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Container>
      </Row>
        <div className="submit-form-button">
          <Button size="lg" block type="submit">Create</Button>
        </div>
      </Form>
    </>
  );
}

export default CreateEvent;