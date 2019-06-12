require('zapier-platform-core').tools.env.inject();

module.exports = {
  getEnv: () => process.env.ENV,
  /** GraphQL API URL */
  getApiURL: () =>
    process.env.API_URL || 'https://opencollective.com/api/graphql',
};
