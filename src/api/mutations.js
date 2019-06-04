const { default: gql } = require('graphql-tag');

module.exports = {
  /** Mutation to create a notification */
  CreateNotificationMutation: gql`
    mutation createWebhook(
      $collectiveSlug: String!
      $notification: NotificationInputType!
    ) {
      createWebhook(
        collectiveSlug: $collectiveSlug
        notification: $notification
      ) {
        id
      }
    }
  `,
  /** Mutation to delete a notification. Must be owner. */
  DeleteNotificationMutation: gql`
    mutation deleteNotification($id: Int!) {
      deleteNotification(id: $id) {
        id
      }
    }
  `,
};
