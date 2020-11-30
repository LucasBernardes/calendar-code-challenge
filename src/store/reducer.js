const INITIAL_STATE = {
  data: {
    '11/11/2020': [{
      title: 'Take car to car-wash',
      hour: '13:00',
      city: 'Sidney',
      radioValue: '3'
    }],
    '12/11/2020': [{
      title: 'Air plante trip',
      hour: '18:00',
      city: 'London',
      radioValue: '0'
    },{
      title: 'Walk the dog out',
      hour: '18:20',
      city: 'London',
      radioValue: '0'
    }],
  },
  modalMode: '',
}

function events(state =  INITIAL_STATE, action) {
  switch(action.type) {
    case 'EDIT_EVENT_MODE':
      return {
        ...state,
        selectedDate: null,
        selectedEvent: action.data,
        modalMode: 'EDIT_MODAL_STYLE',
      }
    case 'SELECTED_EVENT':
      return {
        ...state,
        selectedDate: null,
        selectedEvent: action.data,
        modalMode: 'VIEW_EVENT_MODAL_STYLE',
      }
    case 'SELECTED_DATE':
      return {
        ...state, 
        selectedDate: action.data,
        modalMode: 'CREATE_MODAL_STYLE',
      }
    case 'REMOVE_EVENT':
      return {...state, data: action.data}
    case 'ADD_NEW_EVENT':
      console.log(action.data)
      return {...state, data: {...action.data}}
    default:
      return state;
  }
}

export default events;