const zapier = require("zapier-platform-core");
const App = require("../index");

const appTester = zapier.createAppTester(App);

describe("App.authentication.test", () => {
  it("passes authentication and returns JSON", async () => {
    const bundle = { authData: { "Api-Key": process.env.TEST_API_KEY } };
    const jsonResponse = await appTester(App.authentication.test, bundle);
    expect(jsonResponse).toHaveProperty("username");
  });
});
