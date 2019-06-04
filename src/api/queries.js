const { default: gql } = require('graphql-tag');

module.exports = {
  LoggedInUserQuery: gql`
    {
      LoggedInUser {
        id
        username
      }
    }
  `,
};
