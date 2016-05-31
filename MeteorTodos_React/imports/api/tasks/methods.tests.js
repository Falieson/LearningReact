/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Tasks } from './collections.js';
import './methods.js';

if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
      const userId = Random.id();
      const username = 'tmeasday';
      const task = {
        text: 'test task',
        createdAt: new Date(),
        owner: userId,
        username,
      };

      beforeEach(() => {
        Tasks.remove({}); // Deletes all items in the collection
      });

      it('can insert new task', () => {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        const insertTask = Meteor.server.method_handlers['tasks.insert'];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId, username };

        // Run the method with `this` set to the fake invocation
        insertTask.apply(invocation, [task.text]);

        // Verify that the method does what we expected
        assert.equal(Tasks.find().count(), 1);
      });

      it('can delete owned task', () => {
        const taskId = Tasks.insert(task);

        // Find the internal implementation of the task method so we can
        // test it in isolation
        const deleteTask = Meteor.server.method_handlers['tasks.remove'];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        // Run the method with `this` set to the fake invocation
        deleteTask.apply(invocation, [taskId]);

        // Verify that the method does what we expected
        assert.equal(Tasks.find().count(), 0);
      });
    }); // END describe methods
  });



}
