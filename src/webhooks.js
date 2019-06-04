/**
 * A set of helpers to subscribe / unsubscribe from webhooks.
 */

const { graphqlRequest } = require('./api');
const mutations = require('./api/mutations');
const Samples = require('./samples');

module.exports = {
  /**
   * Create a Zapier subscription to the given notification type
   */
  createSubscriptionOperation: subscriptionType => {
    return {
      type: 'hook',
      inputFields: [
        {
          key: 'collectiveSlug',
          required: true,
          label: 'Collective Slug',
          helpText: 'Enter the collective slug',
          type: 'string',
        },
      ],
      performSubscribe: (z, bundle) => {
        return graphqlRequest(z, mutations.CreateNotificationMutation, {
          collectiveSlug: bundle.inputData.collectiveSlug,
          notification: {
            type: subscriptionType,
            webhookUrl: bundle.targetUrl,
          },
        }).then(response => {
          response.throwForStatus();
          const result = z.JSON.parse(response.content);
          if (result.errors && result.errors.length > 0) {
            throw new Error(`Error: ${result.errors[0].message}`);
          }
          return result.data.createWebhook;
        });
      },
      performUnsubscribe: (z, bundle) => {
        return graphqlRequest(z, mutations.DeleteNotificationMutation, {
          id: bundle.subscribeData.id,
        }).then(response => {
          response.throwForStatus();
          const result = z.JSON.parse(response.content);
          if (result.errors && result.errors.length > 0) {
            throw new Error(`Error: ${result.errors[0].message}`);
          }
          return result.data.deleteNotification;
        });
      },
      perform: (z, bundle) => {
        return [bundle.cleanedRequest];
      },
      performList: async () => {
        return [Samples[subscriptionType]];
      },
      sample: Samples[subscriptionType],
    };
  },
};
