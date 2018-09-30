'use strict';

// Libs
import React from 'react';

// Style
import '../../scss/Dashboard.scss'

//Components
import Title from './Title';
import LogoutButton from './LogoutButton';
import ListOfToDos from './ListOfToDos';

const Dashboard = () => {
  return (
    <div>
      <Title>
        <LogoutButton />
      </Title>

      {/*Filter list of todos to show in progress/complited buckets*/}
      <div className="list_window">
        <ListOfToDos title={"Upcoming"} status="upcoming" />
        <ListOfToDos title={"In Progress"} status="inprogress" />
        <ListOfToDos title={"Completed"} status="completed" />
      </div>
    </div>
  )
}

export default Dashboard;
