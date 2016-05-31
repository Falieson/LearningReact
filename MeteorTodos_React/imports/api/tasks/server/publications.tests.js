/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import './publications.js';

import { Tasks } from '../collections.js';
import { myUsername } from '/imports/startup/config/dev.js';
import '../methods.js';

if (Meteor.isServer) {
  describe('Tasks', function() {
    describe('publications', function() {
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

      it('can find public task', function() {
        Tasks.insert(task); // Create Public Task
        let privateTask = task;
        privateTask.private = true;
        Tasks.insert(privateTask); // Create Private task

        const findPublic = Meteor.server.method_handlers['tasks.find.public'];

        assert.equal(findPublic().count(), 1);
      });

      it('can find owned task', function() {
        Tasks.insert(task); // Create Owned Task
        let nonOwnedTask = task;
        nonOwnedTask.owner = Random.id();
        nonOwnedTask.username = `${username}1`;
        Tasks.insert(nonOwnedTask); // Create NonOwned tasks

        const findOwned = Meteor.server.method_handlers['tasks.find.owned'];

        const invocation = { userId };

        // apply automatically runs findOwned()
        const result = findOwned.apply(invocation, []).count();
        assert.equal(result, 1);
      });

    }); // END describe publications
  });
}
