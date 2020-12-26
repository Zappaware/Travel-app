// I only could make it work with the require function.
const handleSubmit = require('../server/index.js')
  //This jest describe method check's for the function to be defined.
describe("Testing the Express Server functionality", () => {
      
    test("Testing the Express Server function, it should return PASS", () => {
           expect(handleSubmit).toBeDefined();
})});
