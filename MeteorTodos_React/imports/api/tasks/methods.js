import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Tasks } from './collections.js';

// TODO: add check() where appropriate;
Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: this.username? this.username: Meteor.users.findOne(this.userId).username,
    });
  },
  'tasks.insert_NOTSAFE'(task, check){
    // TODO Check: ENV = (DEV || TEST) || !PROD;
    if(check === "IKNOWITSNOTSAFE"){
      console.log("Inserting Unsafely> ", task);
      return Tasks.insert(task);
    }
  },
  'tasks.remove'(taskId) {
    check(taskId, String);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Tasks.remove(taskId);
  },
  'tasks.dump_NOTSAFE'(check){
    // TODO Check: ENV = (DEV || TEST) || !PROD;
    if(check === "IKNOWITSNOTSAFE"){
      Tasks.remove({});
    }
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
  'tasks.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);
    // console.log("args> ", arguments);

    const task = Tasks.findOne(taskId);
    // console.log("task> ", task);

    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { private: setToPrivate } });
  },
  // Pub/Sub
  'tasks.count'(target) {
    const search = Tasks.find().count();
    if(target && typeof(target) === 'object'){
      return Tasks.find(target).count();
    } else {
      return Tasks.find().count();
    }
  },
  'tasks.find.public'() {
    const target = {private: { $ne: true } };
    return Tasks.find(target);
  },
  'tasks.find.owned'() {
    const target = {owner: this.userId };
    return Tasks.find(target);
  },

});
