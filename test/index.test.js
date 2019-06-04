const zapier = require('zapier-platform-core');
const App = require('../index');

const appTester = zapier.createAppTester(App);
const authData = { 'Api-Key': process.env.TEST_API_KEY };
const testCollectiveSlug = 'open-potatoes';

describe('App.authentication.test', () => {
  it('passes authentication and returns JSON', async () => {
    const bundle = { authData };
    const jsonResponse = await appTester(App.authentication.test, bundle);
    expect(jsonResponse).toHaveProperty('username');
  });
});

describe('App.triggers', () => {
  test('newExpense', async () => {
    // Subscribe
    const createdWebhook = await appTester(
      App.triggers.newExpense.operation.performSubscribe,
      {
        authData,
        inputData: { collectiveSlug: testCollectiveSlug },
      },
    );
    expect(createdWebhook).toHaveProperty('id');

    // Unsubscribe
    const deletedWebhook = await appTester(
      App.triggers.newExpense.operation.performUnsubscribe,
      {
        authData,
        subscribeData: { id: createdWebhook.id },
      },
    );
    expect(deletedWebhook).toHaveProperty('id');
    expect(deletedWebhook.id).toEqual(createdWebhook.id);
  });

  test('newUpdate', async () => {
    // Subscribe
    const createdWebhook = await appTester(
      App.triggers.newUpdate.operation.performSubscribe,
      {
        authData,
        inputData: { collectiveSlug: testCollectiveSlug },
      },
    );
    expect(createdWebhook).toHaveProperty('id');

    // Unsubscribe
    const deletedWebhook = await appTester(
      App.triggers.newUpdate.operation.performUnsubscribe,
      {
        authData,
        subscribeData: { id: createdWebhook.id },
      },
    );
    expect(deletedWebhook).toHaveProperty('id');
    expect(deletedWebhook.id).toEqual(createdWebhook.id);
  });
});
