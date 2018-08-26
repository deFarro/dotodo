'use strict';

// Libs
import React from 'react';

// Style
import '../../scss/Title.scss'

const Title = (props) => {
  return (
    <div className="app_title">
      <h1>DoTODO</h1>
      {props.children}
    </div>
  )
}

export default Title;
