'use strict';

import { ADD_TODO, EDIT_TODO, DELETE_TODO, LOG_IN, LOG_OUT, LOAD_TODOS, ERROR, RESET_ERROR } from './types';

// Action creators
const addTodo = (todo) => {
  return {
    type: ADD_TODO,
    todo
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

const logOut = () => {
  return {
    type: LOG_OUT
  }
}

const loadTodos = (todos) => {
  return {
    type: LOAD_TODOS,
    todos
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

export { addTodo, editTodo, deleteTodo, logIn, logOut, loadTodos, error, resetError };
