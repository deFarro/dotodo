'use strict';

// Libs
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

// Style
import '../../scss/LoginWindow.scss'

// Container
import { default as userContainer } from '../redux/containers/user';

//Components
import Title from './Title';

class LoginWindow extends React.Component {
  static propTypes = {
    startSession: PropTypes.func.isRequired,
    error: PropTypes.bool,
  }

  static defaultProps = {
    error: false,
  }

  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  // Method to update field values on input (or validate in future)
  updateFields(event) {
    const updatedState = Object.assign({}, this.state);
    updatedState[event.target.id] = event.target.value;
    this.setState(updatedState);
  }
  // Method to initiate log in
  login(event) {
    event.preventDefault();
    // Check if login and password inserted
    if (this.state.username && this.state.password) {
      this.props.startSession({ username: this.state.username, password: this.state.password });
    }
  }
  // Conditional rendering for login button - change class on error
  render() {
    const { error } = this.props;

    return (
      <div>
        <Title />

        <div className="login_form">
          <form onSubmit={this.props.login || this.login.bind(this)}>
            <input
              type="text"
              id="username"
              placeholder="login"
              ref={el => this.username = el}
              defaultValue={this.state.username}
              onChange={this.updateFields.bind(this)}
            />

            <input
              type="password"
              id="password"
              placeholder="password"
              ref={el => this.password = el}
              defaultValue={this.state.password}
              onChange={this.updateFields.bind(this)} />

            <button
              type="submit"
              className={error ? 'error' : this.state.username && this.state.password ? 'active' : 'not_active'}
              disabled={error}
            >
              {error ? 'USER NOT FOUND' : 'LOG IN'}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default userContainer(LoginWindow);
