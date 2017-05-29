
const initialState = {
  activeFilter: 'all',
  activeList: null,
  activeListName: ''
}

function filter(state = initialState, action) {
  switch (action.type) {
    case 'SET_ACTIVE_FILTER':
      return { ...state, activeFilter: action.filter }
    case "SET_ACTIVE_LIST":
      return { ...state, activeList: action.list, activeListName: action.name }
    default:
      return state;
  }
}


export default filter;
