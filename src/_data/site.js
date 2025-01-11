const environment = process.env.ENVIRONMENT;

export default function () {
  return {
    name: "beeps",
    blogName: "beeps' blog",
    blogDescription: "The inane ramblings of beeps.",
    authorName: "beeps",
    authorEmail: "hi@berly.kim",
    twitterUsername: "@batbeeps",
    mastodonUsername: "@beeps@social.beeps.gay",
    domain: "https://beeps.website",
    environment,
    relMe: [
      "https://chitter.xyz/@batbeeps",
      "https://social.beeps.gay/@beeps",
      "https://bsky.app/profile/beeps.gay",
      "https://twitter.com/batbeeps",
      "https://github.com/querkmachine",
    ],
    navigation: [
      {
        heading: "More beeping",
        links: [
          { href: "/blog/", text: "Blog" },
          { href: "/about/", text: "About beeps" },
          { href: "/now/", text: "/now" },
          { href: "/contact/", text: "Contact" },
        ],
      },
      {
        heading: "Web working",
        links: [{ href: "/govuk-browser-data/", text: "GOV.UK browser data" }],
      },
      {
        heading: "Other stuff",
        links: [
          { href: "/ash/", text: "Ash the amphimorpho" },
          { href: "/links/", html: "Cool links &amp; friend sites" },
        ],
      },
    ],
    legalLinks: [
      { href: "#top", text: "Top of page", icon: "arrow-up" },
      { href: "/brand/", text: "beeps' brand" },
      { href: "/colophon/", text: "Colophon" },
      { href: "/privacy/", text: "Cookies and privacy" },
      {
        href: "/feed.xml",
        text: "RSS feed",
        icon: "rss",
        attributes: {
          rel: "alternate",
          type: "application/atom+xml",
        },
      },
    ],
  };
}
