// staring with tutorial #10
// ref: https://egghead.io/lessons/javascript-redux-avoiding-object-mutations-with-object-assign-and-spread


import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import faker from 'faker';
import { Todos } from './collections.js';

import { toggleTodo } from './todo.js';


const newTodo = {
  id: 0,
  text: faker.lorem.sentence(),
  completed: false,
};

if ( Meteor.isServer ){

  describe('Todos', function(){
    describe('methods', function(){
      beforeEach(function(){
        Todos.remove({});
      });

      it('can create todo', function() {
        Todos.insert(newTodo);
        const records = Todos.find().count();
        assert.equal(records, 1);
      });

      it('can toggle todo', function() {
        const afterToggleExpectation = {
          id: newTodo.id,
          text: newTodo.text,
          completed: !newTodo.completed,
        };
        const beforeToggle = newTodo;
        // assert.isFrozen(beforeToggle); ?? FIXME

        const afterToggle = toggleTodo(beforeToggle);
        assert.deepEqual(afterToggle, afterToggleExpectation);
      });


    });


  });
}


//
// +//       beforeEach(function() {
//  +//         StubCollections.stub(Tasks);
//  +//       });
//
// +//       afterEach(function() {
//  +//         StubCollections.restore();
//  +//       });
