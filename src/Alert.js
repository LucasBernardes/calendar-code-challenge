
import { Row, Toast, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Alert() {
    const events = useSelector(state => state.data);
    const [showA, setShowA] = useState(true);
    const [showB, setShowB] = useState(true);
  
    const toggleShowA = () => setShowA(!showA);
    const toggleShowB = () => setShowB(!showB);
    
    useEffect(() => {
        toggleShowA()
    }, [events])

    return (
      <Row>
        <Col xs={6}>
          <Toast show={showA} onClose={toggleShowA}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
          </Toast>
        </Col>
        
        <Col xs={6} className="my-1">
          <Toast onClose={toggleShowB} show={showB} animation={false}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
          </Toast>
        </Col>
      </Row>
    );
  }
export default Alert;