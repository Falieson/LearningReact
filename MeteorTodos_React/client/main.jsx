import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '/imports/startup/client/index.js';
import '/imports/startup/config/accounts.js';
import App from '/imports/ui/App.jsx';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
