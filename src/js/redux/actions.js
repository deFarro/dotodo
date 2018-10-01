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

const dropSession = sessionID => {
  return {
    type: DROP_SESSION,
    payload: sessionID,
  }
}

const loadTodos = todos => {
  return {
    type: LOAD_TODOS,
    payload: todos,
  }
}

const uploadTodo = (todo, sessionID) => {
  return {
    type: UPLOAD_TODO,
    payload: {
      todo,
      sessionID,
    },
  }
}

const flushTodo = (todo, sessionID) => {
  return {
    type: FLUSH_TODO,
    payload: {
      todo,
      sessionID,
    },
  }
}

const modifyTodo = (todo, sessionID) => {
  return {
    type: MODIFY_TODO,
    payload: {
      todo,
      sessionID,
    },
  }
}

const addTodo = todo => {
  return {
    type: ADD_TODO,
    payload: todo,
  }
}

const deleteTodo = todo => {
  return {
    type: DELETE_TODO,
    payload: todo,
  }
}

const updateTodo = todo => {
  return {
    type: UPDATE_TODO,
    payload: todo,
  }
}

const logIn = user => {
  return {
    type: LOG_IN ,
    payload: user,
  }
}

const logOut = () => {
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
  resetError,
};
