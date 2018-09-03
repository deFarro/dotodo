import CryptoJS from 'crypto-js';

import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { START_SESSION, DROP_SESSION, UPLOAD_TODO, FLUSH_TODO, MODIFY_TODO, ADD_TODO, EDIT_TODO, DELETE_TODO, LOG_IN, LOG_OUT, LOAD_TODOS, ERROR, RESET_ERROR } from '../actions/types';
import { dropSession, addTodo, updateTodo, deleteTodo, logIn, logOut, loadTodos, error, resetError } from '../actions/actions';

import { fetchData, generateFetchOptions } from './utils';

function* startSessionHandler({ payload }) {
    const { username, password } = payload;
   
    const encPass = CryptoJS.MD5(password).toString();
    const loginData = JSON.stringify({ username, password: encPass });

    try {
        const user = yield call(fetchData, 'user/auth', generateFetchOptions('POST', loginData));
        const todos = yield call(fetchData, `todos?sessionId=${user.sessionId}`, generateFetchOptions('GET'));

        yield put(logIn(user));
        yield put(loadTodos(todos));
    } catch (err) {
        yield put(error());

        yield delay(1500);
        yield put(resetError());
    }
};

function* dropSessionHandler({ payload }) {
    const { sessionId } = payload;

    yield call(fetchData, `user/logout?sessionId=${sessionId}`, generateFetchOptions('GET'));

    yield put(logOut());
};

function* uploadTodoHandler({ payload }) {
    const { todo, sessionId } = payload;

    try {
        const approvedTodo = yield call(fetchData, `todo?sessionId=${sessionId}`, generateFetchOptions('PUT', JSON.stringify(todo)));
        // TODO: change to approvedTodo in production
        todo._id = Math.random();
        yield put(addTodo(todo));
    } catch (err) {
        yield put(error());

        yield delay(1500);
        yield put(resetError());
    }
}

function* flushTodoHandler({ payload }) {
    const { id, sessionId } = payload;

    try {
        yield call(fetchData, `todo?sessionId=${sessionId}`, generateFetchOptions('DELETE', JSON.stringify({ id })));

        yield put(deleteTodo(id));
    } catch (err) {
        yield put(error());

        yield delay(1500);
        yield put(resetError());
    }
}

function* modifyTodoHandler({ payload}) {
    const { todo, sessionId } = payload;

    try {
        yield call(fetchData, `todo?sessionId=${sessionId}`, generateFetchOptions('PUT', JSON.stringify(todo)));

        yield put(updateTodo(todo))
    } catch (err) {
        yield put(error());

        yield delay(1500);
        yield put(resetError());
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(START_SESSION, startSessionHandler),
        takeLatest(DROP_SESSION, dropSessionHandler),
        takeEvery(UPLOAD_TODO, uploadTodoHandler),
        takeEvery(FLUSH_TODO, flushTodoHandler),
        takeEvery(MODIFY_TODO, modifyTodoHandler),
    ]);
};
