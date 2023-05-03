const environment = process.env.ENVIRONMENT;

module.exports = function () {
  return {
    name: "beeps",
    blogName: "beeps' blog",
    authorName: "beeps",
    authorEmail: "hi@berly.kim",
    domain: environment === "prod" ? "https://beeps.website" : "",
    environment,
  };
};
