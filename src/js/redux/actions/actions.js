'use strict';

import { START_SESSION, DROP_SESSION, UPLOAD_TODO, ADD_TODO, EDIT_TODO, DELETE_TODO, LOG_IN, LOG_OUT, LOAD_TODOS, ERROR, RESET_ERROR } from './types';

// Action creators

const startSession = credentials => {
  return {
    type: START_SESSION,
    payload: credentials,
  }
}

const dropSession = sessionId => {
  return {
    type: DROP_SESSION,
    payload: sessionId,
  }
}

const loadTodos = todos => {
  return {
    type: LOAD_TODOS,
    todos,
  }
}

const uploadTodo = (todo, sessionId) => {
  return {
    type: UPLOAD_TODO,
    payload: {
      todo,
      sessionId,
    },
  }
}

const addTodo = todo => {
  return {
    type: ADD_TODO,
    payload: todo,
  }
}

const editTodo = (todo) => {
  return {
    type: EDIT_TODO,
    todo
  }
}

const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id
  }
}

const logIn = (user) => {
  return {
    type: LOG_IN ,
    user
  }
}

const logOut = sessionId => {
  return {
    type: LOG_OUT,
  }
}

// Error used only for login error handling. Can be extended to other errors later
const error = () => {
  return {
    type: ERROR
  }
}

const resetError = () => {
  return {
    type: RESET_ERROR
  }
}

export { startSession, dropSession, uploadTodo, addTodo, editTodo, deleteTodo, logIn, logOut, loadTodos, error, resetError };
