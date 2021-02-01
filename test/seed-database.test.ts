import { handler } from '../lambda/seed-database/index'

describe("seed-database", () => {
  it.skip("works", (done) => {
    handler({
      LogicalResourceId: 'logicalResourceId',
      PhysicalResourceId: 'physicalResourceId',
      RequestId: 'requestId',
      RequestType: 'Create',
      ResponseURL: 'https://example.com/responseURL',
      StackId: 'stackId'
    }, {}, (err, response) => {
      if (err) return done(err)
      console.log("TEST RESP", response)
      done()
    })
  })
})