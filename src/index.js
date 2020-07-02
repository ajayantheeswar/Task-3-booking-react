import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore , applyMiddleware , compose , combineReducers} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import dashboard from './store/reducers/dashboard';
import auth from './store/reducers/auth';
import customer from './store/reducers/customer';
import bookticket from './store/reducers/bookTicket';
import { BrowserRouter as Router } from 'react-router-dom';
import YourTickets from './Containers/YourTickets/YourTickets';
import yourtickets from './store/reducers/YourTickets';
import bustrips from './store/reducers/busTrips';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  dashboard : dashboard,
  auth : auth,
  customer:customer,
  bookticket : bookticket,
  yourtickets : yourtickets,
  bustrips : bustrips
});
const store = createStore(rootReducer,composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
