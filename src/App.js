import logo from './logo.svg';
import Calendar from './Calendar/Calendar';
import { Provider } from 'react-redux'
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Calendar />
      </Provider>
    </div>
  );
}

export default App;
