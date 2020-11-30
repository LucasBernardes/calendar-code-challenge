import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import EventDisplayer from './EventDisplayer';
import './styles.css';
import CreateEvent from './CreatEvent';


function AddEventModal(props) {
  const { setAddNewEventVisible, addNewEventVisible } = props;
  const selectedDate = useSelector(state => state.selectedDate);
  const selectedEvent = useSelector(state => state.selectedEvent);
  const modalMode = useSelector(state => state.modalMode); 

  const hideModalEvent = () => {
    props.setAddNewEventVisible(false)
    // cleanField()
  }

  const ModalContentSelector = () => {
    console.log(modalMode)
    switch(modalMode) {
      case('VIEW_EVENT_MODAL_STYLE'):
        return(<EventDisplayer selectedEvent={selectedEvent} hideModalEvent={hideModalEvent}/>);
      case('CREATE_MODAL_STYLE'):
      case('EDIT_MODAL_STYLE'):
        console.log('ta esse')
        return(<CreateEvent selectedDate={selectedDate} addNewEventVisible={addNewEventVisible} setAddNewEventVisible={setAddNewEventVisible}/>);
      default:
        return null;
    }
  }

  

  // const handleRemove = (data) => {
  //   dispatch({
  //     type: 'REMOVE_EVENT',
  //     data
  //   })
  // }
  
  return (
    <Modal show={addNewEventVisible} onHide={hideModalEvent} centered>
      <ModalContentSelector />   
    </Modal>
  );
}

export default AddEventModal;