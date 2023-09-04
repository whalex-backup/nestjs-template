import http from 'k6/http';
import { check, sleep } from 'k6';
import { Options } from 'k6/options';

// Test configuration
export const options: Options = {
  thresholds: {
    // Assert that 99% of requests finish within 3000ms.
    http_req_duration: ['p(99) < 3000'],
  },
  stages: [
    { duration: '30s', target: 15 },
    { duration: '1m', target: 15 },
    { duration: '20s', target: 0 },
  ],
};

// Simulated user behavior
export default () => {
  const res = http.get('https://api.dev-test.gdac.com/v1/cryptos/price', {
    headers: { Accepts: 'application/json' },
  });
  // Validate response status
  check(res, { 'state was 200': (r) => r.status == 200 });
  sleep(1);
};
