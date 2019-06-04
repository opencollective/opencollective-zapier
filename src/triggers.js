const NotificationsTypes = require('./constants/notifications_types');
const Webhooks = require('./webhooks');

module.exports = {
  newExpense: {
    key: 'newExpense',
    noun: 'Expense',
    display: {
      label: 'New Expense',
      description: 'Triggers when a new expense is created',
    },
    operation: Webhooks.createSubscriptionOperation(
      NotificationsTypes.EXPENSE_CREATED,
    ),
  },
  newUpdate: {
    key: 'newUpdate',
    noun: 'Update',
    display: {
      label: 'New Update Published',
      description: 'Triggers when a new update is published',
    },
    operation: Webhooks.createSubscriptionOperation(
      NotificationsTypes.UPDATE_PUBLISHED,
    ),
  },
};
