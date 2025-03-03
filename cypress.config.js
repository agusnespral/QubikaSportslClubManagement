const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    hideXHRInCommandLog: true,

    env: {
      apiUrl: "https://api.club-administration.qa.qubika.com/api",
      baseUrl: "https://club-administration.qa.qubika.com/#/auth/login",
      token: ""
    }
  },
});
