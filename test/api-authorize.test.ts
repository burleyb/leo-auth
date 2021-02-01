import { handler, Event } from '../api/authorize/index';

describe('API Authorize', () => {
  it.only('works', async () => {
    const event:Event = {
      body: {
        event: { requestContext: { identity: { cognitoIdentityId: 'foo_id' }} },
        resource: { lrn: 'lrn::foo:bar' },
        request_id: "test_request_id"
      }
    }
    const response = await handler(event, {})
    console.log(response)
    return response
  });
})
