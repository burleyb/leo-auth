import { doesNotReject } from "assert";
import { handler } from "../lambda/normalize-data/index";
import event from "./normalize-test-file.json";

describe("normalize-data", () => {
  it.skip("works", (done) => {
    handler(event, {}, (err, data) => {
      if (err) return done(err);
      console.log(data);
    });
  });
});
