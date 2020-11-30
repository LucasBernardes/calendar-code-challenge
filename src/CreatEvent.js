import { Badge, Button, Col, Row, Form, Modal, ButtonGroup, ToggleButton, Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { colors } from './static';

function CreateEvent(props) {
  const { selectedDate, addNewEventVisible } = props;
  const dispatch = useDispatch();
  const selectedEvent = useSelector(state => state.selectedEvent); 
  const modalMode = useSelector(state => state.modalMode); 
  const [validated, setValidated] = useState(false);
  const emptyNewEvent = {
    title: '',
    city: '',
    date: (selectedDate && selectedDate.date ? selectedDate.date : ''),
    hour: '',
    radioValue: '0',
  }
  const [newEventData, setNewEventData] = useState(emptyNewEvent)
  
  useEffect(() => {
    console.log('selectedEvent', selectedEvent)
  },[selectedEvent])

  useEffect(() => {
    if (props.addNewEventVisible) {
      if (selectedDate && selectedDate.date) {
        setNewEventData({...newEventData, date: selectedDate.date})
      }
    }
  },[addNewEventVisible])

  useEffect(() => {
    if (modalMode === 'EDIT_MODAL_STYLE') {
      console.log(selectedEvent)
      setNewEventData(selectedEvent)
    }
  },[modalMode])

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
        [newEventData.date]: [{
          title: newEventData.title,
          city: newEventData.city,
          date: newEventData.date,
          hour: newEventData.hour,
          color: colors[newEventData.radioValue].color
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
  setNewEventData(emptyNewEvent)
  setValidated(false);
}

  return(
    <>
    <Modal.Header className="header-color" closeButton>
      <Modal.Title>{modalMode === 'EDIT_MODAL_STYLE' ? 'Editing Event' : 'Creating Event'}</Modal.Title>
    </Modal.Header>
    <Container>
      <Row className="justify-content-md-center mt-1">
        {console.log(newEventData)}
        <h1>
          <Badge variant="secondary" style={{ backgroundColor: colors[newEventData.radioValue].color }}>
            {moment(`${newEventData.date ? newEventData.date : ''} ${newEventData.hour ? newEventData.hour : ''}`, 'DD/MM/YYYY HH:mm').format('DD/MM/YYYY HH:mm')}
          </Badge>
        </h1>
      </Row>
    </Container>
    
    <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ margin: '5px 40px 40px 40px' }}> 
      <Form.Label>Title</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Name for the event"
          onChange={e => setNewEventData({...newEventData, title: e.target.value})}
          isInvalid={newEventData.title.length >= 30}
          isValid={newEventData.title && newEventData.title.length < 30}
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
          onChange={e => setNewEventData({...newEventData, city: e.target.value})}
          // isInvalid={city.length >= 30}
          isValid={newEventData.city}/>
        <Form.Control.Feedback type="invalid">
          Please provide a valid City.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="4" controlId="validationCustom04">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="text"
          placeholder="State" 
          value={newEventData.date}
          onChange={e => setNewEventData({...newEventData, date: e.target.value})}
          required
          isInvalid={newEventData.date && !moment(newEventData.date, 'DD/MM/YYYY', true).isValid()}
          isValid={moment(newEventData.date, 'DD/MM/YYYY', true).isValid()}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid Date(Ex: 20/12/2020).
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="3" controlId="validationCustom05">
        <Form.Label>Hour</Form.Label>
        {console.log(moment(newEventData.hour, 'HH:mm', true))}
        <Form.Control
          isInvalid={newEventData.hour && !moment(newEventData.hour, 'HH:mm', true).isValid()}
          isValid={moment(newEventData.hour, 'HH:mm', true).isValid()}
          // isInvalid={hour.match("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$") === null}
          type="text" placeholder="(Ex 10:00)" required onChange={e => setNewEventData({...newEventData, hour: e.target.value})}/>
        <Form.Control.Feedback type="invalid">
          Please provide a valid Hour (Ex: 13:00).
        </Form.Control.Feedback>
      </Form.Group>
    </Form.Row>
    <Row>
      <Container>
        <Form.Label>Color code</Form.Label>
          <ButtonGroup toggle>
            {colors.map((radio, idx) => (
              <ToggleButton
                key={idx}
                style={{ backgroundColor: radio.value === newEventData.radioValue ? radio.color : 'lightGray' }}
                type="radio"
                variant="secondary"
                name="radio"
                value={radio.value}
                checked={newEventData.radioValue === radio.value}
                onChange={(e) => setNewEventData({...newEventData, radioValue: e.target.value})}
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