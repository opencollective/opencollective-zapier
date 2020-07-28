const NotificationsTypes = require('./notifications_types');
const Webhooks = require('./webhooks');

module.exports = {
  newExpense: {
    key: 'newExpense',
    noun: 'Expense',
    display: {
      label: 'New Expense',
      description: 'Triggers when a new expense is created.',
    },
    operation: Webhooks.createSubscriptionOperation(
      NotificationsTypes.EXPENSE_CREATED,
    ),
  },
  newMember: {
    key: 'newMember',
    noun: 'Member',
    display: {
      label: 'New Member',
      description: 'Triggers when a new member is created.',
    },
    operation: Webhooks.createSubscriptionOperation(
      NotificationsTypes.MEMBER_CREATED,
    ),
  },
  newUpdate: {
    key: 'newUpdate',
    noun: 'Update',
    display: {
      label: 'New Update Published',
      description: 'Triggers when a new update is published.',
    },
    operation: Webhooks.createSubscriptionOperation(
      NotificationsTypes.UPDATE_PUBLISHED,
    ),
  },
};
