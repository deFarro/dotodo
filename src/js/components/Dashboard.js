'use strict';

// Libs
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

// Style
import '../../scss/Dashboard.scss'

//Components
import Title from './Title';
import LogoutButton from './LogoutButton';
import ListOfToDos from './ListOfToDos';

// Actions
import { dropAuthentication } from '../redux/actions/thunks';

const Dashboard = ({dispatch, todos, user, error}) => {
  const logout = () => {
    dispatch(dropAuthentication(user.sessionId));
  };
  return (
    <div>
      <Title>
        <LogoutButton logout={logout} />
      </Title>
      {/*Filter list of todos to show in progress/complited buckets*/}
      <div className="list_window">
        <ListOfToDos title={"In Progress"} todos={todos.filter(todo => todo.status === 'notCompleted')} dispatch={dispatch} user={user} />
        <ListOfToDos title={"Completed"} todos={todos.filter(todo => todo.status === 'completed')} dispatch={dispatch} user={user} />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    todos: state.todos,
    user: state.user,
    error: state.error
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  error: PropTypes.bool
}

export default connect(mapStateToProps)(Dashboard);
