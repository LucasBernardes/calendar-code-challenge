import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Modal, Button, ListGroup, Accordion, Alert, Badge } from 'react-bootstrap';
import moment from 'moment';
import axios from "axios";


function EventDisplayer(props) { 
  const { selectedEvent, hideModalEvent, addNewEventVisible } = props;
  const [weather, setWeather] = useState([])
  const [isLoadingWeaher, setIsLoadingWeaher] = useState(false)
  const events = useSelector(state => state.data); 
  const dispatch = useDispatch()

  useEffect(() => {
    setWeather('')
    setIsLoadingWeaher(true)
    const options = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/forecast/daily',
      params: {
        q: selectedEvent.city && selectedEvent.city,
        cnt: '16',
        units: 'metric'
      },
      headers: {
        'x-rapidapi-key': '99911a1476msh22ab3d3cde144f0p107d38jsna51a006db844',
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      console.log(response.data)
      if (response.data && response.data.list) {
        setWeather(response.data.list)
      }
      setIsLoadingWeaher(false)
    }).catch(function (error) {
      console.error(error);
      setWeather('Error finding weather')
      setIsLoadingWeaher(false)
    });
  },[])

  // useEffect(() => {
  //   if (!addNewEventVisible) {
  //     setWeather([])
  //   }
  // },[addNewEventVisible])

  const handleDeleteEvent = () => {
    const newDate = {...events};
    newDate[selectedEvent.date].splice(selectedEvent.index, 1)
    dispatch({
      type: 'REMOVE_EVENT',
      data: newDate,
    })
    hideModalEvent()
  }

  const handleEditEvent = () => {
    console.log(selectedEvent)
    dispatch({
      type: 'EDIT_EVENT_MODE',
      data: selectedEvent,
    })
  }

  const HandleWeather = () => {

    console.log('weatjer', weather)
    // if (weather === 'Error finding weather') {
    //   return(
    //     <>
    //   )
    // }
    if (isLoadingWeaher) {
      return (
        <Alert variant="primary">
          Loading weather from server
        </Alert>
      );
    }
    if (weather && weather.constructor === Array) {
      const listWeather = weather.map((day) => {
        if (day.weather) {
          const dayWeather = day.weather.map((actualWeather) => {
            return actualWeather.description;
          })
          return dayWeather;
        }
        return null
      })

      return(
        // <Card.Text>
           
          <Accordion>
           <Card>
            <Card.Header>
           <Accordion.Toggle as={Button} variant="link" eventKey="0">
              {`Weather for Next 16 Days`}
            </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <ListGroup>
              {
                listWeather.map((weatherList, index) => {
                  const day = moment().add(index, 'days').format('DD/MM/YYYY');
                  return (
                    <div key={index}>
                      <ListGroup.Item >
                        {`${day} - ${weatherList.join(', ')}`}
                        {selectedEvent.date ===  day ? (
                          <>
                            {' '}<Badge variant="primary">Your event day!</Badge>
                          </>
                        ) : null }
                      </ListGroup.Item>
                    </div>
                  );
                })
              }
              </ListGroup>
            </Accordion.Collapse>
            </Card>
          </Accordion>
        // </Card.Text>
      )
      // console.log(listWeather)
    }
    return (
      <Alert variant="warning">
        No weather found for this location
      </Alert>
    );
    


    
  }

  return (
    <>
      {console.log(selectedEvent)}
      <Modal.Header className="header-color" closeButton>
      <Modal.Title>{selectedEvent.hour && selectedEvent.date ? moment(`${selectedEvent.date} ${selectedEvent.hour}`,'DD/MM/YYYY HH:mm').format('DD/MM/YYYY HH:mm').toString() : ''}</Modal.Title>
      </Modal.Header>
      <Card>
        <Card.Body>
          <Card.Title>{selectedEvent.title && selectedEvent.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{selectedEvent.city && selectedEvent.city}</Card.Subtitle>
          <HandleWeather />
          <Button onClick={handleEditEvent} variant="primary mt-4">Edit</Button>{' '}
          <Button onClick={handleDeleteEvent}  variant="danger mt-4">Delete</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default EventDisplayer