'use strict';

// Libs
import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

// Style
import '../../scss/ToDo.scss';

// Container
import { default as container } from '../redux/container';

import { getNextStatus } from '../utils';

// Passing data fo drag-and-drop from here
const ToDoShow = props => {
  const {
    todo,
    editMode,
    user: { id, sessionID },
    flushTodo,
    modifyTodo,
  } = props;

  const remove = () => flushTodo(todo, sessionID);
  const promote = () => {
    todo.status = getNextStatus(todo.status);
    modifyTodo(todo, sessionID);
  }

  // If logged in user is not an author of the todo, control buttons are hidden
  const readOnly = todo.author.id !== id;

  return (
    <div
      draggable
      className="todo show"
      onDragStart={event => event.dataTransfer.setData('todo', JSON.stringify(todo))}
      // Keep option for testing use
      onDoubleClick={readOnly ? null : props.edit || editMode}>

      <div className={`controls ${todo.status}`}>
        {todo.status == 'completed'
          ? null
          : <i
            className={`fa fa-arrow-right ${readOnly ? 'readonly' : ''}`}
            aria-hidden="true"
            onClick={props.promote || promote} />
        }

        { /* Disable doubleclick and hide controls if logged in user is not an author of the todo */ }
        { readOnly
          ? null
          : (
            <Fragment>
              <i
                className="fa fa-pencil"
                aria-hidden="true"
                onClick={props.edit || editMode} />

              <i
                className="fa fa-times"
                aria-hidden="true"
                // Keep option for testing use
                onClick={props.remove || remove } />
            </Fragment>
          )
        }
      </div>

      <h4>{todo.title}</h4>
      <p>{todo.description}</p>
      <strong>{todo.author.username}</strong>
    </div>
  );
}

ToDoShow.propTypes = {
  todo: PropTypes.object.isRequired,
  editMode: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  flushTodo: PropTypes.func.isRequired,
  modifyTodo: PropTypes.func.isRequired,
}

export default container(ToDoShow);
