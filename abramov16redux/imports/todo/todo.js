export const toggleTodo = (todo)=> Object.assign({}, todo, {
  completed: !todo.completed,
});
