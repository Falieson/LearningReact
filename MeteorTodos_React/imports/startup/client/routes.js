import { AccountsTemplates } from 'meteor/useraccounts:core';

// Import to load these templates
import '/imports/ui/layouts/app-body.js';
import '/imports/ui/pages/root-redirector.js';
import '/imports/ui/pages/lists-show-page.js';
import '/imports/ui/pages/app-not-found.js';

// Import to override accounts templates
import '/imports/ui/accounts/accounts-templates.js';

// Below here are the route definitions
