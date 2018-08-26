'use strict';

// Libs
import React from 'react';
import { PropTypes } from 'prop-types';

// Style
import '../../scss/ToDo.scss';

// Passing data fo drag-and-drop from here
const ToDoShow = ({todo, editMode, remove, user}) => {
  // If logged in user is not an author of the todo, control buttons are hidden
  const readOnly = todo.author._id !== user._id;
  return (
    <div className="todo show" draggable
      onDragStart={event => event.dataTransfer.setData('todo', JSON.stringify(todo))}
      onDoubleClick={readOnly ? null : editMode}>
      { /* Disable doubleclick and hide controls if logged in user is not an author of the todo */ }
      { readOnly ?
        null :
        <div className="controls">
          <i className="fa fa-pencil" aria-hidden="true" onClick={editMode}></i>
          <i className="fa fa-times" aria-hidden="true" onClick={() => remove(todo._id, user.sessionId)}></i>
        </div>
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
  remove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default ToDoShow;
