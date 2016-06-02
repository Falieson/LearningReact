// export const toggleTodo = (todo)=> Object.assign({}, todo, {
//   completed: !todo.completed,
// });
// export const addTodo = (todo)=> Todos.insert(todo);

export const TodosReduce = (action, state=[]) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        }
      ];
    case 'TOGGLE_TODO':
      if(state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        completed: !state.completed,
      });
    default:
      return state;
  }
};
