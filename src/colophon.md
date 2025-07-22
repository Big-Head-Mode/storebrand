---
layout: generic.njk
title: Colophon
metadata:
  description: Giving credit to the people and tools that made this website possible.
cssComponents:
  - character
---

{% pairedcanned %}
{{ page.url }} {{page.inputPath}}
{% endpairedcanned %}

A colophon is a short section you can find at the back of some books, giving some details about the creation of the book.

## Code

I use the static site generator [Eleventy](http://11ty.dev) with the following plugins:

- [eleventy-img](https://github.com/11ty/eleventy-img)
- [eleventy-plugin-directory-output](https://github.com/11ty/eleventy-plugin-directory-output)
- [eleventy-plugin-rss](https://github.com/11ty/eleventy-plugin-rss)
- [eleventy-plugin-toc](https://github.com/jdsteinbach/eleventy-plugin-toc)

Markdown content is parsed by [markdown-it](https://github.com/markdown-it/markdown-it) with the [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor) plugin.

Code is highlighted using [highlight.js](https://highlightjs.org/) using a custom theme.

The [Eleventy screenshot service](https://www.11ty.dev/docs/services/screenshots/) is used to generate OpenGraph images.

Certain aspects of the code, in particular the CSS architectural style, is cribbed from [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) which itself is a modified version of [ITCSS](https://itcss.io). Spacing and type scales were generated using [Utopia](https://utopia.fyi). [Sass](https://sass-lang.com/) and [PostCSS](https://postcss.org) are used for CSS generation.

[Prettier](https://prettier.io/) is used to keep the code beautiful.

Hat tips to the following folks for contributing something that currently exists in the site's code: [Brian Mitchell](https://brianm.me/posts/eleventy-redirect-from/), [Juneum](https://juneum.com/articles/eleventy-drafts/), [Rob Hudson](https://rob.cogit8.org/posts/2020-10-28-simple-11ty-cache-busting/) and [Zach Leatherman](https://www.zachleat.com/web/automatic-opengraph/).

## Content

This website implements [button schema](https://codeberg.org/LunarEclipse/well-known-button) and [fursona schema](https://github.com/theHedgehog0/fursona-schema).