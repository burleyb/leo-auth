import { handler } from "../lambda/seed-database/index";

describe("seed-database", () => {
  it.skip("works", async () => {
    const response = await handler(
      {
        LogicalResourceId: "logicalResourceId",
        PhysicalResourceId: "physicalResourceId",
        RequestId: "requestId",
        RequestType: "Create",
        ResponseURL: "https://example.com/responseURL",
        StackId: "stackId",
      },
      {})
        console.log("TEST RESP", response);
        return response
      }
    );
  });
