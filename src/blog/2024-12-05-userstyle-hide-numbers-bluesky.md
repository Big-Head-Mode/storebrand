---
title: A userstyle to hide the numbers on Bluesky
date: 2024-12-05
updated: 2025-06-03
tags: [web development]
metadata:
  description: Free yourself from the tyranny of subconsciously tying your self-worth to a bunch of digits.
interactions:
  host: social.beeps.gay
  username: beeps
  id: "113600811275036821"
cssComponents:
  - code
---

Yeah, I'm going off about Bluesky, [again]({{ '/blog/2024-09-18-the-bluesky-haters-guide-to-using-bluesky/' | url }}).

Having spent some time on Cohost, the [sadly departed social networking site]({{ '/blog/2024-09-12-in-memory-of-cohost/' | url }}) that purposefully didn't display engagement statistics for anything and finding that _much healthier_ for my state of mind, I had ended up making a user style for Bluesky that did the same thing.

If you're not sure how to use a user style, check out [my blog post on user stylesheets from 2023]({{ '/blog/2023-04-26-using-userstyles-in-2023/' | url }}).

<!-- prettier-ignore-start -->
```css
/** 
 * User style to hide various numbers on Bluesky's interface.
 * Because social networks are meant to be social, not about popularity.
 * Made by beeps: https://beeps.website/
 */

/* Hide likes and share counts on feeds. */
[data-testid="likeCount"],
[data-testid="repostCount"] {
  display: none !important;
}

/* Hide likes and share counts on individual posts. */
[data-testid="likeCount-expanded"],
[data-testid="repostCount-expanded"] {
  display: none !important;
}

/* Hide the reply count on feeds. */
[data-testid="replyBtn"] div {
  display: none !important;
}

/* Hide the follower and following links on profiles and the popups when 
 * hovering over usernames. */
[href$="/followers"],
[href$="/follows"] {
    display: none !important;
}

/* ALTERNATIVELY: To hide just the numbers and not the entire links,
 * comment out the above block and uncomment this one. */
/*[href$="/followers"] span:first-child,
[href$="/follows"] span:first-child {
  display: none !important;
}*/
```
<!-- prettier-ignore-end -->

This code is provided as-is and is unlikely to receive future updates.

Personally, I've stopped using Bluesky entirely. If you still want to see my online rambles over there, follow [the bridged fediverse account](https://bsky.app/profile/beeps.gay) instead.

## Updates

- 2025-06-03: Updated to also remove follower and following counts on the popups that appear when hovering over a user name.
