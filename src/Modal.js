import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { radios } from './static';
import './styles.css';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios";
import { Col, Row, Form, ButtonGroup, ToggleButton, Container } from "react-bootstrap";

function AddEventModal(props) {
  const selectedDate = useSelector(state => state.selectedDate);
  console.log('data no modal', selectedDate)
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState(selectedDate && selectedDate.date ? selectedDate.date : '');
  const [hour, setHour] = useState('');
  

  const [radioValue, setRadioValue] = useState('1');
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.addNewEventVisible) {
      console.log(selectedDate.date)
      setDate(selectedDate.date)
      if (true) {
        // const options = {
        //   method: 'GET',
        //   url: 'https://community-open-weather-map.p.rapidapi.com/forecast/daily',
        //   params: {
        //     q: 'maringa,brazil',
        //     cnt: '16',
        //     units: 'metric'
        //   },
        //   headers: {
        //     'x-rapidapi-key': '99911a1476msh22ab3d3cde144f0p107d38jsna51a006db844',
        //     'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
        //   }
        // };
        
        // axios.request(options).then(function (response) {
        //   console.log(response.data);
        // }).catch(function (error) {
        //   console.error(error);
        // });
      }
    }
    
  },[props.addNewEventVisible])
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log('valide:', form.checkValidity)
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } 

    else {
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
            color: radios[radioValue].color
          }],
        },
      })
      props.setAddNewEventVisible(false)
    }
    
  };

  // const handleRemove = (data) => {
  //   dispatch({
  //     type: 'REMOVE_EVENT',
  //     data
  //   })
  // }
  
  return (
    <Modal show={props.addNewEventVisible} onHide={() => props.setAddNewEventVisible(false)} centered>
      <Modal.Header className="header-color" closeButton>
        <Modal.Title>Create Event</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ margin: 40 }}>
        
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
          <Form.Control type="text" placeholder="State" value={date} onChange={e => setDate(e.target.value)} required />
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
    </Modal>
  );
}

export default AddEventModal;