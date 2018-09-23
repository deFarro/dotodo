'use strict';

// Libs
import React from 'react';
import { PropTypes } from 'prop-types';

// Style
import '../../scss/ToDo.scss';

// Container
import { default as container } from '../redux/container';

// Passing data fo drag-and-drop from here
const ToDoShow = props => {
  const { todo, editMode, user, flushTodo } = props;
  const remove = () => flushTodo(todo.id, user.sessionID)

  // If logged in user is not an author of the todo, control buttons are hidden
  const readOnly = todo.author.id !== user.id;

  return (
    <div
      draggable
      className="todo show"
      onDragStart={event => event.dataTransfer.setData('todo', JSON.stringify(todo))}
      // Keep option for testing use
      onDoubleClick={readOnly ? null : props.edit || editMode}>
      { /* Disable doubleclick and hide controls if logged in user is not an author of the todo */ }
      { readOnly
        ? null
        : (
          <div className="controls">
            <i
              className="fa fa-pencil"
              aria-hidden="true"
              onClick={props.edit || editMode} />

            <i
              className="fa fa-times"
              aria-hidden="true"
              // Keep option for testing use
              onClick={props.remove || remove } />
          </div>
        )
      }
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
}

export default container(ToDoShow);
