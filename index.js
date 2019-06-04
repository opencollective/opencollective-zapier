const { Authentication, addApiKeyToHeaders } = require('./src/authentication');
const triggers = require('./src/triggers');

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: Authentication,
  beforeRequest: [addApiKeyToHeaders],
  afterResponse: [],

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {},

  // If you want your trigger to show up, you better include it here!
  triggers: triggers,

  // If you want your searches to show up, you better include it here!
  searches: {},

  // If you want your creates to show up, you better include it here!
  creates: {},
};

// Finally, export the app.
module.exports = App;
