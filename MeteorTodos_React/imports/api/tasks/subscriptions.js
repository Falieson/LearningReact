import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Tasks } from './collections.js';

if (Meteor.isClient) {
  // This code only runs on the client
  // Only publish tasks that are public or belong to the current user
  Meteor.subscribe('tasks');
}
