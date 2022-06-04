module.exports = {
    client: {
      service: {
        name: 'web100-front',
        // URL to the GraphQL API
        url: 'http://192.168.88.30:8000/graphql',
      },
      // Files processed by the extension
      includes: ["./src/**/*.js"],
      excludes: ["**/__tests__/**"]
    },
  }