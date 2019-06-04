require('dotenv').config();

module.exports = {
  /** GraphQL API URL */
  API_URL:
    process.env.API_URL || 'https://staging.opencollective.com/api/graphql',
};
