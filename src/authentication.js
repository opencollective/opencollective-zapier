const { API_URL } = require("./env");
const API_KEY_HEADER = "Api-Key";

module.exports = {
  /**
   * Main authentication module, implementing Zapier's API.
   * See https://zapier.github.io/zapier-platform-cli/#custom
   */
  Authentication: {
    type: "custom",
    fields: [
      {
        label: "API Key",
        key: API_KEY_HEADER,
        type: "password",
        required: true,
        helpText:
          "You'll need an API key for certain types of actions and to avoid rate limiting issues. You can get one on https://opencollective.com/applications"
      }
    ],
    connectionLabel: (z, bundle) => {
      return bundle.inputData.username;
    },
    test: (z, bundle) => {
      const options = {
        url: API_URL,
        method: "POST",
        headers: {
          API_KEY_HEADER: bundle.authData[API_KEY_HEADER]
        },
        body: {
          query: "{ LoggedInUser { id username } }"
        }
      };

      return z.request(options).then(response => {
        response.throwForStatus();
        const result = z.JSON.parse(response.content);

        if (result.errors && result.errors.length > 0) {
          throw new Error(`Connection failed: ${result.errors[0].message}`);
        } else if (!result.data.LoggedInUser) {
          throw new Error("Connection failed: No user for this API Key");
        }

        return result.data.LoggedInUser;
      });
    }
  },
  /**
   * A helper to inject API key in headers
   */
  addApiKeyToHeaders: (request, z, bundle) => {
    request.headers[API_KEY_HEADER] = bundle.authData[API_KEY_HEADER];
    return request;
  }
};
