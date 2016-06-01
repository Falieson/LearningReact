import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isClient) {
  // This code only runs on the client
  // Only publish tasks that are
  //  public or belong to the current user
  Meteor.subscribe('tasks');
}
