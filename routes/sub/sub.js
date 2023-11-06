let is_subscribed = false;
let plan = '';

const Subscribe = (plan) => {
  is_subscribed = true;
  currentPlan = plan;
  return { success: true, message: `Subscribed to the ${plan} plan.` };
};

module.exports = { Subscribe, is_subscribed, currentPlan };