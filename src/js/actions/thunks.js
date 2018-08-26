'use strict';
// Thunk functions to operate with action creators

// Libs
import CryptoJS from 'crypto-js';

// HTTP setup
import { URL, HEADERS } from '../http';

// Actions
import { ADD_TODO, EDIT_TODO, DELETE_TODO, LOG_IN, LOG_OUT, LOAD_TODOS, ERROR, RESET_ERROR } from './actions';
import { addTodo, editTodo, deleteTodo, logIn, logOut, loadTodos, error, resetError } from './actions';

// Universal function to get/send any data
const fetchData = (url, method, contents) => {
  const options = {
    method: method,
    credentials: 'include',
    body: contents,
    headers: HEADERS
  }
  return fetch(URL + url, options)
    .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Network error occured.');
      })
    .catch(err => err);;
}

// Thunk function to authenticate user
const authenticate = (username, password) => {
  return dispatch => {
    // Encrypting password
    const encPass = CryptoJS.MD5(password).toString();
    const loginData = JSON.stringify({username, password: encPass});
    // Sending data to server
    fetchData('user/auth', 'POST', loginData)
      .then(response => {
        if (response.status === 'success') {
          dispatch(logIn({username: response.username, sessionId: response.sessionId, _id: response._id}));
          // Getting list of todos from server right here
          dispatch(getTodos(response.sessionId));
        }
        // Handling wrong username/password
        else {
          dispatch(error());
          setTimeout(() => {
            dispatch(resetError());
          }, 1500);
        }
      })
      .catch(err => console.error(err));
  }
}

// Thunk function to log out
const dropAuthentication = (sessionId) => {
  return dispatch => {
    fetchData(`user/logout?sessionId=${sessionId}`, 'GET')
      .then(response => {
        if (response.status === 'success') {
            dispatch(logOut());
          }
      })
      .catch(err => console.error(err));
  }
}

// Thunk function to load todos from server
const getTodos = (sessionId) => {
  return dispatch => {
    fetchData(`todos?sessionId=${sessionId}`, 'GET')
      .then(response => {
        if (response.status === 'success') {
          dispatch(loadTodos(response.data));
        }
      })
      .catch(err => console.error(err));
  }
}

// Thunk function to add new todo
const pushTodo = (todo, user) => {
  const serializedTodo = JSON.stringify(todo);
  return dispatch => {
    fetchData(`todo?sessionId=${user.sessionId}`, 'PUT', serializedTodo)
      .then(response => {
        if (response.status === 'success') {
          // Server returns only id in 'author' prop. Adding username manually
          const todoToAdd = response.data;
          todoToAdd.author = {_id: response.data.author, username: todo.author.username}
          dispatch(addTodo(todoToAdd));
        }
      })
      .catch(err => console.error(err));
  }
}

// Thunk function to edit todo
const updateTodo = (todo, user) => {
  const todoToSend = {id: todo._id, status: todo.status};
  // Only author can update title and description fields
  todoToSend.title = todo.author._id === user._id ? todo.title : undefined;
  todoToSend.description = todo.author._id === user._id ? todo.description : undefined;
  return dispatch => {
    fetchData(`todo?sessionId=${user.sessionId}`, 'PUT', JSON.stringify(todoToSend))
      .then(response => {
        if (response.status === 'success') {
          dispatch(editTodo(todo));
        }
      })
      .catch(err => console.error(err));
  }
}

// Thunk function to remove todo
const removeTodo = (id, sessionId) => {
  return dispatch => {
    fetchData(`todo?sessionId=${sessionId}`, 'DELETE', JSON.stringify({id}))
      .then(response => {
        if (response.status === 'success') {
          dispatch(deleteTodo(response.data._id));
        }
      })
      .catch(err => console.error(err));
  }
}

export { pushTodo, updateTodo, removeTodo, authenticate, dropAuthentication, getTodos };
