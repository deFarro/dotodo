'use strict';

// Libs
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

// Actions
import { uploadTodo, modifyTodo, flushTodo } from '../redux/actions';

// Components
import ToDoShow from './ToDoShow';
import ToDoEdit from './ToDoEdit';

// Use state to hold element's status (showing or editing)
class ToDo extends React.Component {
  constructor(props) {
    super();
    // If this element has special 'mission' to be a form, 'edit' mode should be activated automatically
    this.state = {
      status: props.mission === 'addNew' ? 'edit' : 'show'
    }
  }
  // Method to toggle view between showing and editing info
  toggleEdit() {
    this.setState({status: this.state.status === 'show' ? 'edit' : 'show'});
  }
  // Depending on current status render edit form or show todo itself
  render() {
    const add = bindActionCreators(uploadTodo, this.props.dispatch);
    const edit = bindActionCreators(modifyTodo, this.props.dispatch);
    const remove = bindActionCreators(flushTodo, this.props.dispatch);

    return (
      <div>
        { this.state.status === 'show' ?
          <ToDoShow todo={this.props.todo} editMode={this.toggleEdit.bind(this)} remove={remove} user={this.props.user} /> :
          <ToDoEdit todo={this.props.todo} showMode={this.toggleEdit.bind(this)} remove={remove} add={add} edit={edit} user={this.props.user} mission={this.props.mission} /> }
      </div>
    )
  }
}

ToDo.propTypes = {
  todo: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  mission: PropTypes.string
}

// Better to have props from storage right here, then to pass it all the way from above
const mapStateToProps = state => {
  return {
    dispatch: state.dispatch
  }
}

export default connect(mapStateToProps)(ToDo);
