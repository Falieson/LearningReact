/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import StubCollections from 'meteor/hwillson:stub-collections';

import { myUsername } from '/imports/startup/config/dev.js';

import './subscriptions.js';

import { Tasks } from './collections.js';
import './methods.js';

// Some dev utils
const fail = ()=> assert.equal(0,1);
const failSoft = (context)=> {
  //TODO:
  console.log(`\"${context.topic}: ${context.description}\" hasn't been made yet`);
  assert.equal(1,1);
};

if (Meteor.isClient) {
  describe('Tasks', function() {
    describe('subscriptions', function() {
      const userId = Random.id();
      const task = {
        text: 'test task',
        createdAt: new Date(),
        owner: userId,
        username: myUsername,
      };

      beforeEach(function() {
        StubCollections.stub(Tasks);
      });

      it('can find public task', function(done) {
        Tasks.insert(task); // Create Public Task
        let privateTask = task;
        // Test should fail if private=false
        privateTask.private = false;
        Tasks.insert(privateTask); // Create Private task

        Meteor.call('tasks.find.public', (err, res)=> {
          try {
            console.log("Results> ", res);
            assert.equal(findPublic().count(), 1);
            done();
          } catch(err) {
            done(err);
          }
        });
      });

      it('can find owned task', function(done) {
        Tasks.insert(task); // Create Owned Task
        let nonOwnedTask = task;
        // Test should fail without below changes
        // nonOwnedTask.owner = Random.id();
        // nonOwnedTask.username = `${myUsername}1`;

        Tasks.insert(nonOwnedTask); // Create NonOwned tasks
        Meteor.call('tasks.find.owned', (err, res)=> {
          try {
            assert.equal(findOwned().count(), 1);
            done();
          } catch(err) {
            done(err);
          }
        });
      });

      afterEach(function() {
        StubCollections.restore();
      });
    }); // END describe 'subscriptions'
  });
}




// it('can find public task', function() {
//   const meta = {topic:'Subscriptions', description: 'can find public task'};
//   failSoft(meta);
// // Create Private Task
// task.private = true; // changing this to false should break the test
// console.log("Task ", task);
// Meteor.call('tasks.insert_NOTSAFE', task, "IKNOWITSNOTSAFE", (err, res)=> {
//     if(err){ throw(err); }
//     else {
//       // Make Task Private
//       if(res){
//         const privateTaskId = res;
//
//         // Create Public Task
//         task.private = false;
//         console.log("task> ", task);
//         Meteor.call('tasks.insert_NOTSAFE', task, "IKNOWITSNOTSAFE", (err, res)=> {
//             if(err){ throw(err); }
//             // console.log("res> ", res);
//
//             const publicTaskId = res;
//             const countTarget = {
//               $or: [
//                 { private: { $ne: true } },
//                 { owner: this.userId },
//               ],
//             };
//             Meteor.call('tasks.count', countTarget, (err, res)=> {
//               const count = res;
//               console.log(`Result: ${count}`);
//
//               return assert.equal(count, 1);
//             });
//         });
//       }
//     }
// });
//
// });
//
// it('can find owned task', function() {
//   const meta = {topic:'Subscriptions', description: 'can find owned task'};
//   failSoft(meta);
// Create Owned Task
// Meteor.call('tasks.insert_NOTSAFE', task,"IKNOWITSNOTSAFE", (err, res)=> {
//     if(err){ throw(err); }
//     else {
//       const myTaskId = res;
//
//       let nonOwnedTask = task;
//       nonOwnedTask.owner = Random.id();
//       nonOwnedTask.username = `${username}1`;
//       Meteor.call('task.insert_NOTSAFE', nonOwnedTask, "IKNOWITSNOTSAFE", (err, res)=> {
//           if(err){ throw(err); }
//
//           const foreignTaskId = res;
//           const result = Tasks.find().count();
//           console.log("Result=> ", result);
//
//           assert.equal(result, 1);
//       });
//     }
// });
//
//
//
// Tasks.insert(task);
//
//
// const findOwned = Meteor.call('tasks.find.owned');
//
// const invocation = { userId };
//
// const result = findOwned.apply(invocation, []).count();
// assert.equal(result, 1);
// });
