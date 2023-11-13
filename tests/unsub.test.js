const { Unsubscribe } = require('../routes/sub/unsub');

describe('Cancellation', () => {
  test('cancels the subscription', () => {
    const result = Unsubscribe();
    console.log('Result:', result);
    expect(result.success).toBe(true);
    expect(result.message).toBe('Subscription canceled.');
  });
});
