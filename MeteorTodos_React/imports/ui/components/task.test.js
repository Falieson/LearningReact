// import { Meteor } from 'meteor/meteor';
// import React from 'react';
// import { shallow } from 'enzyme';
// import { chai } from 'meteor/practicalmeteor:chai';
// import Task from './task.jsx';
//
// describe('TodoItem', () => {
//   // In Todos app, component code can run on client and server, so force client only
//   if (Meteor.isServer) return;
//
//   it('should render', () => {
//     //setup: create test data
//     const task = { text: 'Embrace the Ecosystem', checked: true };
//
//     //exercise: render the data into a component
//     const item = shallow('<Task task={task} />');
//
//     //verify: rendered DOM values are what we expect
//     // chai.assert(item.hasClass('list-item'));
//     chai.assert(item.hasClass('checked'));
//     chai.assert.equal(
//       item.find('input[type="text"]').prop('defaultValue'),
//       'Embrace the Ecosystem'
//     );
//   });
// });
