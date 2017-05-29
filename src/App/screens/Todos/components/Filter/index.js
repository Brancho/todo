import React, { PropTypes } from 'react'
import classNames from 'classnames'

const Filter = ({setFilter}) => {

  return (
    <div className="fr">
      <span onClick={() => setFilter('active')}>Active </span>
      <span onClick={() => setFilter('completed')}>Completed </span>
      <span onClick={() => setFilter('all')}>All</span>
    </div>
  );
}



export default Filter;
