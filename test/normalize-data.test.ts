import { doesNotReject } from "assert";
import { handler } from "../lambda/normalize-data/index";
import event from "./normalize-test-file.json";

describe("normalize-data", () => {
  it.skip("works", async () => {
    const data = await handler(event, {})
    console.log(data);
    return data;
  });
});
