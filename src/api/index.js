const { API_URL } = require('../env');
const { print } = require('graphql/language/printer');

module.exports = {
  graphqlRequest: (z, query, variables) => {
    return z.request({
      url: API_URL,
      method: 'POST',
      body: {
        query: print(query),
        variables: variables,
      },
    });
  },
};
