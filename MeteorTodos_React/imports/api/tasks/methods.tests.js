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
        const deleteTask = Meteor.server.method_handlers['tasks.remove'];
        const invocation = { userId };

        deleteTask.apply(invocation, [taskId]);

        assert.equal(Tasks.find().count(), 0);
      });

      it('can make completed owned task', () => {
        const taskId = Tasks.insert(task);
        const completeTask = Meteor.server.method_handlers['tasks.setChecked'];
        const invocation = { userId };

        completeTask.apply(invocation, [taskId, true]);

        assert.equal(Tasks.findOne(taskId).checked, true);
      });

      it('can make private owned task', () => {
        const taskId = Tasks.insert(task);
        const privateTask = Meteor.server.method_handlers['tasks.setPrivate'];
        const invocation = { userId };

        privateTask.apply(invocation, [taskId, true]);

        assert.equal(Tasks.findOne(taskId).private, true);
      });


    }); // END describe methods
  });



}
