'use strict';

// Libs
import React from 'react';
import { PropTypes } from 'prop-types';

// Container
import { default as userContainer } from '../redux/containers/user';

// Style
import '../../scss/LogoutButton.scss'

// Text and callback can be changed in order to log in user on new pages in future
const LogoutButton = props => {
  const { user, dropSession } = props;
  const logout = () => dropSession(user);

  return (
    <div className="button_wrap">
      {/* Keep option for testing use */}
      <button onClick={props.logout || logout}>LOG OUT</button>
    </div>
  )
}

LogoutButton.propTypes = {
  dropSession: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default userContainer(LogoutButton);
