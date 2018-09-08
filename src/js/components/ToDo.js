'use strict';

// Libs
import React from 'react';
import { PropTypes } from 'prop-types';

// Components
import ToDoShow from './ToDoShow';
import ToDoEdit from './ToDoEdit';

// Use state to hold element's status (showing or editing)
class ToDo extends React.Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    mission: PropTypes.string,
  }

  constructor(props) {
    super();
    // If this element has special 'mission' to be a form, 'edit' mode should be activated automatically
    this.state = {
      status: props.mission === 'addNew' ? 'edit' : 'show'
    }
  }

  // Method to toggle view between showing and editing info
  toggleEdit = () => {
    this.setState({status: this.state.status === 'show' ? 'edit' : 'show'});
  }

  // Depending on current status render edit form or show todo itself
  render() {
    const {
      todo,
      mission,
    } = this.props;

    return (
      <div>
        { this.state.status === 'show'
          ? <ToDoShow
            {...{ todo }}
            editMode={this.toggleEdit}
          />
          : <ToDoEdit
            {...{ todo, mission }}
            showMode={this.toggleEdit}
          />
        }
      </div>
    );
  }
}

export default ToDo;
