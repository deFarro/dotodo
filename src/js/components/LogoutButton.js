'use strict';

// Libs
import React from 'react';
import { PropTypes } from 'prop-types';

// Style
import '../../scss/LogoutButton.scss'

// Text and callback can be changed in order to log in user on new pages in future
const LogoutButton = ({logout}) => {
  return (
    <div className="button_wrap">
      <button onClick={logout}>LOG OUT</button>
    </div>
  )
}

LogoutButton.propTypes = {
  logout: PropTypes.func.isRequired
}

export default LogoutButton;
