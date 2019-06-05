const zapier = require('zapier-platform-core');
const App = require('../index');
const testHelpers = require('./helpers');

const appTester = zapier.createAppTester(App);

describe('App', () => {
  let authData = null;
  let testCollective = null;
  let apiKeyId = null;

  // Create an API key to authenticate requests and a test collective
  beforeAll(async () => {
    const { id, apiKey } = await testHelpers.generateTestApiKey();
    apiKeyId = id;
    authData = { 'Api-Key': apiKey };
    testCollective = await testHelpers.createTestCollective(apiKey);
  });

  // Remove the API Key to avoid hitting limitations on dev environments
  afterAll(() => {
    return testHelpers.deleteApiKey(authData['Api-Key'], apiKeyId);
  });

  describe('Authentication.test', () => {
    it('passes authentication and returns JSON', async () => {
      const bundle = { authData };
      const jsonResponse = await appTester(App.authentication.test, bundle);
      expect(jsonResponse).toHaveProperty('username');
    });
  });

  describe('Triggers subscriptions', () => {
    Object.keys(App.triggers).map(triggerKey => {
      test(`${triggerKey}`, async () => {
        const trigger = App.triggers[triggerKey];

        // Subscribe
        const createdWebhook = await appTester(
          trigger.operation.performSubscribe,
          {
            authData,
            inputData: { collectiveSlug: testCollective.slug },
          },
        );
        expect(createdWebhook).toHaveProperty('id');

        // Unsubscribe
        const deletedWebhook = await appTester(
          trigger.operation.performUnsubscribe,
          {
            authData,
            subscribeData: { id: createdWebhook.id },
          },
        );
        expect(deletedWebhook).toHaveProperty('id');
        expect(deletedWebhook.id).toEqual(createdWebhook.id);

        // Must provide default data
        try {
          expect(trigger.operation.sample).toBeTruthy();
          expect(trigger.operation.sample).toBeInstanceOf(Object);
        } catch (e) {
          throw new Error(
            `You must define a sample for "${triggerKey}" in "src/samples.js"`,
          );
        }
      });
    });
  });
});
