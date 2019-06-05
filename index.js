const { Authentication, addApiKeyToHeaders } = require('./src/authentication');
const triggers = require('./src/triggers');
const { ENV } = require('./src/env');
const { version } = require('./package.json');

// A specific version dedicated to staging
const STAGING_VERSION = '0.42.0';

const App = {
  version: ENV === 'staging' ? STAGING_VERSION : version,
  platformVersion: require('zapier-platform-core').version,
  authentication: Authentication,
  beforeRequest: [addApiKeyToHeaders],
  afterResponse: [],
  triggers: triggers,

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {},
  // If you want your searches to show up, you better include it here!
  searches: {},
  // If you want your creates to show up, you better include it here!
  creates: {},
};

// Finally, export the app.
module.exports = App;
