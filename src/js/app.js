'use strict';

// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk';

// Components
import MainWindow from './components/MainWindow';

// Reducers
import appData from './redux/reducers/appData';

// Sagas
// import rootSaga from './redux/sagas'
// const sagaMiddleware = createSagaMiddleware()

// Creating storage with applied middleware (for retch requests)

const store = createStore(appData,
  compose(
    applyMiddleware(thunk),
    // applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

// sagaMiddleware.run(rootSaga)

const App = () => {
  return (
    <Provider {...{ store }}>
      <MainWindow />
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
