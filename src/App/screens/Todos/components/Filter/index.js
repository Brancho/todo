import React, { PropTypes } from 'react'
import classNames from 'classnames'

const Filter = ({setFilter, filters}) => {

  function setActiveClass(param){
    if(param === filters.activeFilter){
      return "b";
    }
  }

  return (
    <div className="fr">
      <span onClick={() => setFilter('all')} className={[setActiveClass('all'), 'pointer', 'ph2'].join(' ')}>All</span>
      <span onClick={() => setFilter('active')} className={[setActiveClass('active'), 'pointer', 'ph2'].join(' ')} >Active</span>
      <span onClick={() => setFilter('completed')} className={[setActiveClass('completed'), 'pointer', 'pl2'].join(' ')} >Completed</span>
    </div>
  );
}



export default Filter;
