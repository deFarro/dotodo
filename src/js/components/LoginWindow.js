'use strict';

// Libs
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

// Style
import '../../scss/LoginWindow.scss'

// Actions
import { authenticate, getTodos } from '../redux/actions/thunks';

//Components
import Title from './Title';

class LoginWindow extends React.Component {
  // Add state to hold field values
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
      this.props.dispatch(authenticate(this.state.username, this.state.password));
    }
  }
  // Conditional rendering for login button - change class on error
  render() {
    return (
      <div>
        <Title />
        <div className="login_form">
          <form onSubmit={this.props.login || this.login.bind(this)}>
            <input type="text" id="username" placeholder="login" ref={el => this.username = el} defaultValue={this.state.username} onChange={this.updateFields.bind(this)}></input>
            <input type="password" id="password" placeholder="password" ref={el => this.password = el} defaultValue={this.state.password} onChange={this.updateFields.bind(this)}></input>
            <button type="submit" className={this.props.error ? 'error' : this.state.username && this.state.password ? 'active' : 'not_active'} disabled={this.props.error}>{this.props.error ? 'USER NOT FOUND' : 'LOG IN'}</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dispatch: state.dispatch,
    error: state.error
  }
}

LoginWindow.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.bool
}

export default connect(mapStateToProps)(LoginWindow);
