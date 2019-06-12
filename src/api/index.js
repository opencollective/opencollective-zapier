const { getApiURL } = require('../env');
const { print } = require('graphql/language/printer');

module.exports = {
  graphqlRequest: (z, query, variables) => {
    return z.request({
      url: getApiURL(),
      method: 'POST',
      body: {
        query: print(query),
        variables: variables,
      },
    });
  },
};
