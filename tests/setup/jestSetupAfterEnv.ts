import { RequestContext } from 'nestjs-request-context';

beforeAll(async (): Promise<void> => {
  RequestContext.cls.enterWith(new RequestContext({ requestId: 0 }, {}));
});

afterAll(async (): Promise<void> => {
  RequestContext.cls.disable();
});
