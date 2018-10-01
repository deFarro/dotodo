// Action types
import { ADD_TODO, UPDATE_TODO, DELETE_TODO, LOG_IN, LOG_OUT, LOAD_TODOS, ERROR, RESET_ERROR } from '../types';

import { findNestedTodo } from '../../utils';

const rootReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TODO:
      const todosToExtend = [...state.todos[payload.status]];
      todosToExtend.push(action.payload);
      
      return {
        user: state.user,
        todos: Object.assign(
          {},
          state.todos,
          { [payload.status]: todosToExtend }
        ),
      };

    case UPDATE_TODO:
      const todosToUpdate = [...state.todos[payload.status]];
      const [currentStatus, index] = findNestedTodo(payload, state.todos);

      if (currentStatus === null) {
        return state;
      }

      // If status changed we delete it in one list and add to another
      if (currentStatus !== payload.status) {
        const todosToClear = [...state.todos[currentStatus]];
        todosToClear.splice(index, 1);
        todosToUpdate.push(payload);

        return {
          user: state.user,
          todos: Object.assign(
            {},
            state.todos,
            {
              [currentStatus]: todosToClear,
              [payload.status]: todosToUpdate
            }
          ),
        };
      }
      // If status didn't change, we update it
      else {
        todosToUpdate[index] = payload;

        return {
          user: state.user,
          todos: Object.assign(
            {},
            state.todos,
            {
              [payload.status]: todosToUpdate
            }
          ),
        };
      }

    case DELETE_TODO:
      return {
        user: state.user,
        todos: Object.assign(
          {},
          state.todos,
          { [payload.status]: state.todos[payload.status].filter(todo => todo.id !== payload.id) }
        ),
      };

    case LOG_IN:
      return { todos: state.todos, user: payload };

    case LOG_OUT:
      return {};

    case LOAD_TODOS:
      const newState = Object.assign({}, state);
      newState.todos = payload;

      return newState;

    case ERROR:
      return { ...state, error: true };

    case RESET_ERROR:
      return { todos: state.todos, user: state.user };

    default:
      return state;
  }
}

export default rootReducer;
