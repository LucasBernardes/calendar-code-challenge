import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
function AddEventModal(props) {
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      console.log(e)
    }
    console.log(e)
    e.preventDefault();
      e.stopPropagation();
    props.setAddNewEventVisible(false);
  }
  
  return (
    <Modal show={props.addNewEventVisible} onHide={() => props.setAddNewEventVisible(false)}>
      <Modal.Header closeButton/>
        {/* <Modal.Title>Modal heading</Modal.Title> */}
      {/* </Modal.Header> */}
      <Modal.Body>
        <Form onSubmit={handleSubmit} >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              {props.selectedElement && props.selectedElement.hour}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" >
          Close
        </Button>
        <Button variant="primary">
          Save Changes
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default AddEventModal;