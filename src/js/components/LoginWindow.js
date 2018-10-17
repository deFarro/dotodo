'use strict';

// Libs
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

// Style
import '../../scss/LoginWindow.scss'

// Container
import { default as container } from '../redux/container';

//Components
import Title from './Title';

class LoginWindow extends Component {
  static propTypes = {
    startSession: PropTypes.func.isRequired,
    errorObj: PropTypes.objectOf(PropTypes.any),
  }

  static defaultProps = {
    errorObj: {
      error : false,
    },
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
    const { startSession } = this.props;
    event.preventDefault();
    // Check if login and password inserted
    if (this.state.username && this.state.password) {
      startSession({ username: this.state.username, password: this.state.password });
    }
  }

  render() {
    const {
      errorObj: {
        error ,
        message,
      }
    } = this.props;

    const buttonText = () => {
      if (!error) {
        return 'LOG IN'
      }

      switch (message) {
        case 'wrong password':
          return 'WRONG PASSWORD'
        case 'pg: no rows in result set':
          return 'USER NOT FOUND'
        default:
          return 'ERROR'
      }
    }

    return (
      <div>
        <Title />

        <div className="login_form">
          {/* Keep option for testing use */}
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
              className={error
                ? 'error'
                : this.state.username && this.state.password
                  ? 'active'
                  : 'not_active'
              }
              disabled={error}
            >
              {buttonText()}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default container(LoginWindow);
