const { Subscribe } = require('../routes/sub/sub');

describe('Subscribe', () => {
  test('subscribes to a plan', () => {
    const plan = 'Premium';
    const result = Subscribe(plan);
    console.log('Result:', result);
    expect(result.success).toBe(true);
    expect(result.message).toBe(`Subscribed to the ${plan} plan.`);
  });
});
