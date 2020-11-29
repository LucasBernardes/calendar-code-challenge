import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Modal, Button } from 'react-bootstrap';

function EventDisplayer(props) { 
  const { selectedEvent, hideModalEvent } = props;
  const events = useSelector(state => state.data); 
  const dispatch = useDispatch()

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
    
    dispatch({
      type: 'SELECTED_EVENT',
      data: selectedEvent,
    })
  }

  return (
    <>
      {console.log(selectedEvent)}
      <Modal.Header className="header-color" closeButton>
      <Modal.Title>{selectedEvent.hour && selectedEvent.date ? moment(`${selectedEvent.date} ${selectedEvent.hour}`).format('DD/MM/YYYY HH:mm').toString() : ''}</Modal.Title>
      </Modal.Header>
      <Card>
        <Card.Body>
          <Card.Title>{selectedEvent.title && selectedEvent.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{selectedEvent.city && selectedEvent.city}</Card.Subtitle>
          <Card.Text>
            Weather:
          </Card.Text>
          <Button onClick={handleEditEvent} variant="primary">Edit</Button>{' '}
          <Button onClick={handleDeleteEvent}  variant="danger">Delete</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default EventDisplayer