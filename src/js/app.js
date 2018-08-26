'use strict';

// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// Reducers
import appData from './reducers/appData';

// Components
import MainWindow from './components/MainWindow';

// Creating storage with applied middleware (for retch requests)
const store = createStore(appData,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f)
  );

const App = () => {
  return (
    <Provider store={store}>
      <MainWindow />
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
