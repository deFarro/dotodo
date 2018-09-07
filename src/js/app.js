'use strict';

// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'

// Components
import MainWindow from './components/MainWindow';

// Reducers
import rootReducer from './redux/reducers';

// Sagas
import rootSaga from './redux/sagas'
const sagaMiddleware = createSagaMiddleware()

// Creating storage with applied middleware (for retch requests)

const store = createStore(rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

sagaMiddleware.run(rootSaga)

const App = () => {
  return (
    <Provider {...{ store }}>
      <MainWindow />
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
