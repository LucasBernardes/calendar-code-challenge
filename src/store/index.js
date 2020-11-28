import { createStore } from 'redux';

const INITIAL_STATE = {
  data: {
    '11/11/2020': [{
      name: 'Consulta médico',
      hour: '13:00',
    }],
    '12/11/2020': [{
      name: 'Lavar carro',
      hour: '18:00',
    }],
  },
}

function events(state =  INITIAL_STATE, action) {
    switch(action.type) {
        case 'ADD_NEW_EVENT':
          const date = Object.keys(action.data)[0];
          const event = action.data[date]
          Object.keys(state.data).map(element => {
            if (element === date) {
              state.data[element].push(event)
              state.data[element].sort(function (a, b) {
                return a.hour.localeCompare(b.hour);
              });
            }
          });
          return state
        default:
          return state;
    }
}

const store = createStore(events);

export default store;