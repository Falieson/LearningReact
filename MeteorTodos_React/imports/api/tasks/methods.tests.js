/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { myUsername } from '/imports/startup/config/dev.js';

import { Tasks } from './collections.js';
import './methods.js';

// ()=> converted to function()
// ref: http://mochajs.org/#arrow-functions

if (Meteor.isServer) {
  describe('Tasks', function() {
    describe('methods', function() {
      const userId = Random.id();
      const username = myUsername;
      const task = {
        text: 'test task',
        createdAt: new Date(),
        owner: userId,
        username,
      };

      beforeEach(function() {
        Tasks.remove({}); // Deletes all items in the collection
      });

      it('can insert new task', function() {
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

      it('can delete owned task', function() {
        const taskId = Tasks.insert(task);
        const deleteTask = Meteor.server.method_handlers['tasks.remove'];
        const invocation = { userId };

        deleteTask.apply(invocation, [taskId]);

        assert.equal(Tasks.find().count(), 0);
      });

      it('can make completed owned task', function() {
        const taskId = Tasks.insert(task);
        const completeTask = Meteor.server.method_handlers['tasks.setChecked'];
        const invocation = { userId };

        completeTask.apply(invocation, [taskId, true]);

        assert.equal(Tasks.findOne(taskId).checked, true);
      });

      it('can make private owned task', function() {
        const taskId = Tasks.insert(task);
        const privateTask = Meteor.server.method_handlers['tasks.setPrivate'];
        const invocation = { userId };

        privateTask.apply(invocation, [taskId, true]);

        assert.equal(Tasks.findOne(taskId).private, true);
      });


    }); // END describe methods
  });



}
