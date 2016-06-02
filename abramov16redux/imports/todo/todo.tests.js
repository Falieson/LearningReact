// staring with tutorial #10
// ref: https://egghead.io/lessons/javascript-redux-avoiding-object-mutations-with-object-assign-and-spread


import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import faker from 'faker';
// import { Todos } from './collections.js';
// Tempting to use collections but it'd be better to keep the tests in alignment with the tutorial series
// import { toggleTodo, addTodo } from './todo.js';
import { TodosReduce } from './todo.js';

const newTodo = {
  id: 0,
  text: faker.lorem.sentence(),
  completed: false,
};

if ( Meteor.isServer ){

  describe('Todos', function(){
    describe('methods', function(){

      it('can create todo', function() {
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
        const result = TodosReduce(action, stateBefore);
        assert.deepEqual(result, stateAfter);
      });

      // it('can toggle todo', function() {
      //   const afterToggleExpectation = {
      //     id: newTodo.id,
      //     text: newTodo.text,
      //     completed: !newTodo.completed,
      //   };
      //   const beforeToggle = newTodo;
      //   // assert.isFrozen(beforeToggle); ?? FIXME
      //
      //   const afterToggle = toggleTodo(beforeToggle);
      //   assert.deepEqual(afterToggle, afterToggleExpectation);
      // });



    });


  });
}
