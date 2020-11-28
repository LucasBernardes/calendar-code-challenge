import { createStore } from 'redux';

const INITIAL_STATE = {
  data: {
    '11/11/2020': [{
      title: 'Consulta médico',
      hour: '13:00',
    }],
    '12/11/2020': [{
      title: 'Lavar carro',
      hour: '18:00',
    }],
  },
}

function events(state =  INITIAL_STATE, action) {
    switch(action.type) {
      case 'SELECTED_DATE':
        return {...state, selectedDate: action.data}
      case 'REMOVE_EVENT':
        console.log(action.data)
        const dateString = action.data.date;
        const index = action.data.index;
        state.data[dateString].splice(index, 1);
        return state
      case 'ADD_NEW_EVENT':
        const date = Object.keys(action.data)[0];
        const event = action.data[date];
        let isEmptyDate = true;
        Object.keys(state.data).map(element => {
          if (element === date) {
            state.data[element].push(action.data[element][0])
            console.log(state.data)
            state.data[element].sort(function (a, b) {
              return a.hour.localeCompare(b.hour);
            });
            isEmptyDate = false;
          }
        });
        if (isEmptyDate) {
          console.log('tem nada nesse dia', action.data)
          return {...state, data: { ...state.data, ...action.data }}
        }
        return state
      default:
        return state;
    }
}

const store = createStore(events);

export default store;