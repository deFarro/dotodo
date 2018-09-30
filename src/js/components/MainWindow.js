'use strict';

// Libs
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

// Style
import '../../scss/MainWindow.scss'

//Components
import LoginWindow from './LoginWindow';
import Dashboard from './Dashboard';

// If there is a logge in user, it renders dashboard, otherwise - login form
const MainWindow = ({user, todos}) => {
  return (
    <div>
      { user && todos ? <Dashboard /> : <LoginWindow /> }
    </div>
  )
}

MainWindow.propTypes = {
  user: PropTypes.object,
  todos: PropTypes.objectOf(PropTypes.any),
}

const mapStateToProps = state => {
  return {
    user: state.user,
    todos: state.todos
  }
}

export default connect(mapStateToProps)(MainWindow);
