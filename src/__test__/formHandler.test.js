// I only could make it work with the require function.
const handleSubmit = require('../client/js/formHandler')
  //This jest describe method check's for the function to be defined.
describe("Testing the handleSubmit functionality", () => {
      
    test("Testing the handleSubmit() function, it should return PASS", () => {
           expect(handleSubmit).toBeDefined();
})});

