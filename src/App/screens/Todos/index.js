import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from 'App/stores/resources/actions'
import { getEntities } from 'App/stores/resources'

import AddTodo from './components/AddTodo'
import AddList from './components/AddTodoList'
import TodoList from './components/TodoList'
import Filter from './components/Filter'
import ListsList from './components/ListsList'

const Todos = ({ lists, todos, filters, addTodo, addList, toggleTodo, setFilter, setList }) => {

    if(lists.length === 0){
      addList('Default List');
    }

  return (
    <section className='pa3 pa5-ns'>
      <div className="fl w-30">
      <AddList onSubmit={({list}, _, {reset}) => {
        addList(list)
        reset()
      }} />
      <ListsList {...{ lists, setList, filters }}/>
      </div>
      <div className="fr w-70">
      <AddTodo onSubmit={({todo}, _, {reset}) => {
        addTodo(todo, filters.activeList)
        reset()
      }} />
      <div className="mw6 center">
      <span className='f4 bold'>{filters.activeListName ? filters.activeListName : 'Default List'}</span>
      <Filter {...{setFilter}} />
      </div>
      <TodoList {...{ todos, toggleTodo }} />
      </div>
    </section>


  )
}

Todos.propTypes = {
  todos: PropTypes.array,
  lists: PropTypes.array
}


export default connect(
  state => ({
    todos: getEntities('todos')(state),
    lists: getEntities('lists')(state),
    filters: state.filters
  }),
  dispatch => ({
    addTodo: (text, listID) => dispatch(actions.submitEntity({ text, listID }, {type: 'todos'})),
    addList: (name) => {dispatch(actions.submitEntity({ name }, {type: 'lists', name}))},
    setFilter: (filter) => dispatch({type: 'SET_ACTIVE_FILTER', filter}),
    setList: (list, name) => dispatch({type: 'SET_ACTIVE_LIST', list, name}),
    toggleTodo: (todo, completed) => dispatch(actions.updateEntity({ ...todo, completed }, {type: 'todos'}))
  })
)(Todos)
