let is_subscribed = false;
let currentPlan = '';

const Unsubscribe = () => {
  is_subscribed = false;
  currentPlan = '';
  return { success: true, message: 'Subscription canceled.' };
};

module.exports = { Unsubscribe, is_subscribed, currentPlan };