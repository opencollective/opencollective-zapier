require('zapier-platform-core').tools.env.inject();

module.exports = {
  ENV: process.env.ENV,
  /** GraphQL API URL */
  API_URL: process.env.API_URL || 'https://opencollective.com/api/graphql',
};
