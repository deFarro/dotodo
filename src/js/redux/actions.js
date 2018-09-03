'use strict';

import {
  START_SESSION,
  DROP_SESSION,
  LOAD_TODOS,

  UPLOAD_TODO,
  FLUSH_TODO,
  MODIFY_TODO,
  
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  
  LOG_IN,
  LOG_OUT,
  
  ERROR,
  RESET_ERROR
} from './types';

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

const flushTodo = (id, sessionId) => {
  return {
    type: FLUSH_TODO,
    payload: {
      id,
      sessionId,
    },
  }
}

const modifyTodo = (todo, sessionId) => {
  return {
    type: MODIFY_TODO,
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

const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id
  }
}

const updateTodo = (todo) => {
  return {
    type: UPDATE_TODO,
    todo
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

export {
  startSession,
  dropSession,
  loadTodos,

  uploadTodo,
  flushTodo,
  modifyTodo,

  addTodo,
  deleteTodo,
  updateTodo,

  logIn,
  logOut,

  error,
  resetError };
