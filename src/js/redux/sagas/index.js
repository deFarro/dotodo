import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { ADD_TODO, EDIT_TODO, DELETE_TODO, LOG_IN, LOG_OUT, LOAD_TODOS, ERROR, RESET_ERROR } from '../actions/types';
import { addTodo, editTodo, deleteTodo, logIn, logOut, loadTodos, error, resetError } from '../actions/actions';

function* authenticate(action) {
    yield logIn(action.payload);
};

export default function* rootSaga() {
    yield takeLatest(LOG_IN, authenticate);
};
