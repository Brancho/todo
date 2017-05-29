import React, { PropTypes } from 'react'


const ListsList = ({ lists, setList }) => {
  return (
    <ul className='list pl0 ml0 center mw6 ba b--light-silver br2'>
      { lists.reverse().map((list, i) =>
          <li className="ph3 pv3 pointer bg-animate hover-bg-light-gray" onClick={() => setList(list.id, list.name)}>{list.name}</li>
        )
      }
    </ul>
  )
}

ListsList.propTypes = {
  todos: PropTypes.array
}

export default ListsList
