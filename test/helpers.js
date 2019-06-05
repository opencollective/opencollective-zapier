const fetch = require('cross-fetch');

const loginWithDefaultTestUser = () => {
  return fetch('http://localhost:3060/users/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        email: 'testuser+admin@opencollective.com',
        newsletterOptIn: false,
      },
    }),
  }).then(response => {
    return response.json();
  });
};

const getTokenFromRedirectUrl = url => {
  const regex = /\/signin\/([^?]+)/;
  return regex.exec(url)[1];
};

const graphqlQuery = (authHeaders, body) => {
  return fetch('http://localhost:3060/graphql', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...authHeaders,
    },
    body: JSON.stringify(body),
  }).then(result => {
    return result.json();
  });
};

const graphqlQueryToken = (token, body) => {
  return graphqlQuery({ authorization: `Bearer ${token}` }, body);
};

const graphqlQueryApiKey = (apiKey, body) => {
  return graphqlQuery({ 'Api-Key': apiKey }, body);
};

const createTestCollective = apiKey => {
  return graphqlQueryApiKey(apiKey, {
    query: `
        mutation createCollective($collective: CollectiveInputType!) {
          createCollective(collective: $collective) {
            id
            slug
          }
        }
      `,
    variables: {
      collective: {
        location: {},
        name: 'TestOrg',
        slug: '',
        tiers: [],
        type: 'COLLECTIVE',
      },
    },
  }).then(body => {
    return body.data.createCollective;
  });
};

/**
 * Generate an API key for default test user.
 *
 * @return {object} {id, apiKey}
 */
const generateTestApiKey = async () => {
  const loginData = await loginWithDefaultTestUser();
  const userToken = getTokenFromRedirectUrl(loginData.redirect);
  return graphqlQueryToken(userToken, {
    query: `
    mutation createApplication {
      createApplication(application: { type: API_KEY }) {
        id
        apiKey
      }
    }
  `,
  }).then(body => {
    return body.data.createApplication;
  });
};

/**
 * Delete the given API Key
 */
const deleteApiKey = (apiKey, id) => {
  return graphqlQueryApiKey(apiKey, {
    variables: { id: id.toString() },
    query: `
      mutation deleteApplication($id: String!) {
        deleteApplication(id: $id) {
          id
        }
      }
    `,
  });
};

module.exports = { generateTestApiKey, deleteApiKey, createTestCollective };
