import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from 'App/stores/resources/actions'
import { getEntities } from 'App/stores/resources'

import AddTodo from './components/AddTodo'
import AddList from './components/AddTodoList'
import TodoList from './components/TodoList'
import Filter from './components/Filter'

const Todos = ({ lists, todos, addTodo, addList, toggleTodo, setFilter }) => {
  return (
    <section className='pa3 pa5-ns'>
      <AddList onSubmit={({list}, _, {reset}) => {
        addList(list)
        reset()
      }} />
      <AddTodo onSubmit={({todo}, _, {reset}) => {
        addTodo(todo)
        reset()
      }} />
      <div className="">
      <h1 className='f4 bold mw6 center'>Todos</h1>
      <Filter {...{setFilter}} />
      </div>
      <TodoList {...{ todos, toggleTodo }} />

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
    lists: getEntities('lists')(state)
  }),
  dispatch => ({
    addTodo: (text) => dispatch(actions.submitEntity({ text }, {type: 'todos'})),
    addList: (name) => {dispatch(actions.submitEntity({ name }, {type: 'lists', name}))},
    setFilter: (text) => dispatch(actions.setActiveFilter(text, {type: 'todos'})),
    toggleTodo: (todo, completed) => dispatch(actions.updateEntity({ ...todo, completed }, {type: 'todos'}))
  })
)(Todos)
