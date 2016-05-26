// REDUCER FUNCTION
const todos = (state = [], action) => {
  switch (action.type) { // WHAT TO DO?
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        }
      ];
    default:
      return state;
  }
};

const testAddTodo = () => {
  const stateBefore = []; // STATE ARRAY
  const action = { // ACTION OBJECT
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false,
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};

testAddTodo();
console.log(`All tests passed.`);
