const environment = process.env.ENVIRONMENT;

export default function () {
  return {
    name: "myname",
    blogName: "/src/_data/site.js",
    blogDescription: "/src/_data/site.js",
    authorName: "asdf",
    authorEmail: "asdf",
    twitterUsername: "asdf",
    mastodonUsername: "@asdf@mastodon.fake",
    domain: "https://example.com",
    environment,
    relMe: [
      // "https://chitter.xyz/@batbeeps",
      // "https://social.beeps.gay/@beeps",
      // "https://bsky.app/profile/beeps.gay",
      // "https://twitter.com/batbeeps",
      // "https://github.com/querkmachine",
    ],
    navigation: [
      {
        heading: "head1",
        links: [
          { href: "/blog/", text: "Blog", description: "you can set descriptions too" },
          { href: "/about/", text: "About me", description: "you can set descriptions too" },
          { href: "/now/", text: "/now", description: "you can set descriptions too" },
          { href: "/contact/", text: "Contact", description: "you can set descriptions too" },
        ],
      },
      {
        heading: "head2",
        links: [
          {
            href: "/asdf/",
            text: "asdf", description: "you can set descriptions too"
          },
          { href: "/hjkl/", text: "hjkl", description: "you can set descriptions too" },
        ],
      },
      {
        heading: "head3",
        links: [
          {
            href: "/ash/",
            text: "ash",
            classes: "kimNavigation_link-ash", description: "you can set descriptions too"
          },
          { href: "/links/", html: "Cool links", description: "you can set descriptions too" },
        ],
      },
    ],
    legalLinks: [
      { href: "/brand/", text: "mybrand" },
      { href: "/colophon/", text: "Colophon" },
      { href: "/accessibility/", text: "Accessibility statement" },
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
