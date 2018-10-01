'use strict';

// Libs
import React from 'react';
import { PropTypes } from 'prop-types';

// Style
import '../../scss/ToDo.scss';

// Container
import { default as container } from '../redux/container';

import { testCall } from '../utils';

class ToDoEdit extends React.Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    showMode: PropTypes.func.isRequired,
    mission: PropTypes.string,
    user: PropTypes.object.isRequired,
    uploadTodo: PropTypes.func.isRequired,
    modifyTodo: PropTypes.func.isRequired,
    flushTodo: PropTypes.func.isRequired,
  }

  // Create state to hold todo info, so it is possible to update it directly on fly
  constructor(props) {
    super();
    this.state = {
      todo: props.todo
    }
  }

  // Method to update contents of todo's fields 'title' and 'description'
  updateTodo(event) {
    const updatedTodo = Object.assign({}, this.state.todo);
    updatedTodo[event.target.id] = event.target.value;
    this.setState({todo: updatedTodo});
  }

  // Method to send updated info to server
  confirmUpdate() {
    const {
      mission,
      showMode,
      user: { id, username, sessionID },
      uploadTodo,
      modifyTodo,
    } = this.props;

    // Check if fields aren't empty
    if (this.state.todo.title && this.state.todo.description) {
      // Check if this is a form submition, not editing an existing todo
      // If so, 'add' action is triggered
      if (mission === 'addNew') {
        const newTodo = Object.assign({}, this.state.todo);
        newTodo.author = {...{ id, username }}
        newTodo.status = 'upcoming';

        // Passing constructed todo with user's info to action creater
        testCall(this.props.add) || uploadTodo(newTodo, sessionID);

        // Clear the form fields
        this.setState({todo: {title: '', description: ''}});
        this.title.value = '';
        this.description.value = '';
      }
      // If it not a new todo, 'edit' event is triggered
      else {
        //Changing mode back to 'show'
        showMode();
        testCall(this.props.edit) || modifyTodo(this.state.todo, sessionID);
      }
    }
  }

  // Method to delete a todo
  deleteTodo() {
    const {
      showMode,
      flushTodo,
      user: { sessionID },
    } = this.props;

    showMode();
    testCall(this.props.remove) || flushTodo(this.state.todo, sessionID);
  }

  render() {
    const { mission } = this.props;

    return (
      <div className="todo edit">
        <div className="controls edit">
          { /* Changing icon for add button for a new todo element */ }
          <i
            className={this.props.mission === 'addNew' ? "fa fa-plus" : "fa fa-check"}
            aria-hidden="true"
            onClick={this.confirmUpdate.bind(this)} />

          { /* Hiding delete button for a new todo element */ }
          { mission === 'addNew'
            ? null
            : <i
                className="fa fa-times"
                aria-hidden="true"
                onClick={this.deleteTodo.bind(this)}
              />
          }
        </div>

        <input
          type="text"
          id="title"
          placeholder="title"
          onChange={this.updateTodo.bind(this)}
          defaultValue={this.state.todo.title}
          ref={el => this.title = el}>
        </input>

        <textarea
          id="description"
          placeholder="description"
          onChange={this.updateTodo.bind(this)}
          defaultValue={this.state.todo.description}
          ref={el => this.description = el}>
        </textarea>
      </div>
    );
  }
}

export default container(ToDoEdit);
