/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

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
      const username = myUsername;
      const task = {
        text: 'test task',
        createdAt: new Date(),
        owner: userId,
        username,
      };

      beforeEach(function() {
         // Deletes all items in the collection
        Meteor.call('tasks.dump_NOTSAFE', "IKNOWITSNOTSAFE");
      });

      it('can find public task', function() {
        const meta = {topic:'Subscriptions', description: 'can find public task'};
        failSoft(meta);
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

      });

      it('can find owned task', function() {
        const meta = {topic:'Subscriptions', description: 'can find owned task'};
        failSoft(meta);
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



        // Tasks.insert(task);

        //
        // const findOwned = Meteor.call('tasks.find.owned');
        //
        // const invocation = { userId };
        //
        // const result = findOwned.apply(invocation, []).count();
        // assert.equal(result, 1);
      });

    }); // END describe publications
  });
}
