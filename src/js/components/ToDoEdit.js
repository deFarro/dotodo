'use strict';

// Libs
import React from 'react';
import { PropTypes } from 'prop-types';

// Style
import '../../scss/ToDo.scss';

class ToDoEdit extends React.Component {
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
    // Check if fields aren't empty
    if (this.state.todo.title && this.state.todo.description) {
      // Check if this is a form submition, not editing an existing todo
      // If so, 'add' action is triggered
      if (this.props.mission === 'addNew') {
        const newTodo = Object.assign({}, this.state.todo);
        newTodo.author = {_id: this.props.user._id, username: this.props.user.username}
        newTodo.status = 'notCompleted';
        // Passing constructed todo with user's info to action creater
        this.props.add(newTodo, this.props.user);
        // Clear the form fields
        this.setState({todo: {title: '', description: ''}});
        this.title.value = '';
        this.description.value = '';
      }
      // If it not a new todo, 'edit' event is triggered
      else {
        //Changing mode back to 'show'
        this.props.showMode();
        this.props.edit(this.state.todo, this.props.user);
      }
    }
  }
  // Method to delete a todo
  deleteTodo() {
    this.props.showMode();
    this.props.remove(this.state.todo._id, this.props.user.sessionId);
  }
  render() {
    return (
      <div className="todo edit">
        <div className="controls">
        { /* Changing icon for add button for a new todo element */ }
          <i className={this.props.mission === 'addNew' ? "fa fa-plus" : "fa fa-check"} aria-hidden="true" onClick={this.confirmUpdate.bind(this)}></i>
          { /* Hiding delete button for a new todo element */ }
          { this.props.mission === 'addNew' ? null : <i className="fa fa-times" aria-hidden="true" onClick={this.deleteTodo.bind(this)}></i> }
        </div>
        <input type="text" id="title" placeholder="title"
          onChange={this.updateTodo.bind(this)}
          defaultValue={this.state.todo.title}
          ref={el => this.title = el}>
        </input>
        <textarea id="description" placeholder="description"
          onChange={this.updateTodo.bind(this)}
          defaultValue={this.state.todo.description}
          ref={el => this.description = el}>
        </textarea>
      </div>
    )
  }
}

ToDoEdit.propTypes = {
  todo: PropTypes.object.isRequired,
  showMode: PropTypes.func.isRequired,
  mission: PropTypes.string,
  user: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired
}

export default ToDoEdit;
