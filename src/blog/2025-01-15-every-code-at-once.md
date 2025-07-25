---
date: 2025-01-05
updated: 2023-02-25
tags: [technology, random]
title: TESTPAGE - Markdown and Nunjucks shortcode examples
layout: generic.njk
metadata:
  noRobots: true
  description: mydesc
cssComponents:
  - blockquote
  - code
  - table
  - callout
  - character
  - figure
  - image-differ
  - youtube
  - social-embed
  - link-embed
---

Updated {{ updated | formatDate('human') }}.

{% pairedcanned %}
{{ page.url }} {{page.inputPath}}
{% endpairedcanned %}


“Oh, sure,” agreed Wilson hurriedly, and went toward the little office, mingling immediately with the cement colour of the walls. A white ashen dust veiled his dark suit and his pale hair as it veiled everything in the vicinity⁠—except his wife, who moved close to Tom.

<ins datetime="2022-07-30">Removed, see 2022-07-30 edit.</ins> <del datetime="2022-07-30">I had two elder brothers, one of whom was lieutenant-colonel</del>

She had changed her dress to a brown figured muslin, which stretched tight over her rather wide hips as Tom helped her to the platform in New York. At the newsstand she bought a copy of <i>Town Tattle</i> cheaply.

A page for testing markdown styles, plugins and custom shortcodes.

## Markdown

This is a paragraph. Nostrud incididunt mollit qui Lorem id ad deserunt duis sint ad amet sunt. Non veniam labore proident laboris dolor ut veniam enim. Proident excepteur nisi reprehenderit culpa nulla duis occaecat qui tempor. Exercitation excepteur consequat non sunt cillum eiusmod irure mollit quis. Dolor nostrud do eu nostrud ullamco duis aliqua. Nostrud incididunt ipsum tempor velit officia.

This is a sentence broken
over multiple lines.
(There should be line breaks, hopefully.)

### Inline styles

Plain text **Bold** _italic_ **_bold and italic_** ~~deleted~~ [link](#) `inline code` <hi@berly.kim> <kbd>Ctrl</kbd>

### Typography replacements

- Apostrope: Ex'ample
- Double quotes: "Example"
- Single quotes: 'Example'
- Copyright symbol: (C) (c)
- Trademark symbol: (TM) (tm)
- Registered trademark symbol: (R) (r)
- Ellipsis: ...
- En dash: --
- Em dash ---
- Plus-minus: +-
- Fractions: 1/4 1/3 1/2 2/3 3/4
- Multiplication sign: 800x600
- More/less than: a >= b <= c
- Approximately: ~=
- Remove excessive punctuation: ??????? !!!!!!! ,,

### Lists

1. list item 1
2. list item 2
3. list item 3

- list item 1
- list item 2
- list item 3

### Blockquotes

> blockquote

> blockquote with
>
> multiple _paragraphs_

> > nested blockquote

### Horizontal rule

---

### Code blocks

```
<p class="example">code block with no language set</p>
```

```html
<p class="example">Syntax highlighted HTML code.</p>
```

```html
<header class="kimMasthead">
  <div class="kimWrapper kimMasthead_inner">
    <a class="kimMasthead_logo kimLink-plain" href="/">
      <span class="kim-!-sr">Back to home</span>
      <span aria-hidden="true">beeps</span>
    </a>
  </div>
</header>
```

### Table

| Planet  | Diameter (km) |      Population       |
| :------ | ------------: | :-------------------: |
| Mercury |         2,440 |           0           |
| Venus   |         6,052 |           0           |
| Earth   |         6,371 | Over 8 billion humans |
| Mars    |         3,390 |           0           |
| Jupiter |        69,911 |           0           |
| Saturn  |        58,232 |           0           |
| Uranus  |        25,362 |           0           |
| Neptune |        24,622 |           0           |

## Shortcodes

### Callout

{% callout %}
This is some text in a callout.

**Bold** _italics_ [link](#). Markdown!
{% endcallout %}

### Character - Ali

{% character character="ali", variant="angry" %}
angry.png
{% endcharacter %}

{% character character="ali", variant="hearts" %}
hearts.svg
{% endcharacter %}

### Character - Mabel

{% character character="mabel", variant="angry" %}
angry.png

**Bold** _italics_ [link](#). Markdown!
{% endcharacter %}

{% character character="mabel", variant="hearts" %}
hearts.svg
{% endcharacter %}


### Responsive image

{% responsiveImage "./src/images/emy-by-integration.png", "A warmly lit room. The sun is setting outside of the window. Emy, a white, green and black, anthropomorphic robot bat, sits at a workbench. One wing has been detached and is laying in parts on the bench, whilst she uses the other to repair the parts of the disassembled wing." %}

#### Linked responsive image

{% responsiveImage "./src/images/emy-by-integration.png", "A warmly lit room. The sun is setting outside of the window. Emy, a white, green and black, anthropomorphic robot bat, sits at a workbench. One wing has been detached and is laying in parts on the bench, whilst she uses the other to repair the parts of the disassembled wing.", { link: true } %}

{% responsiveImage "./src/images/emy-by-integration.png", "A warmly lit room. The sun is setting outside of the window. Emy, a white, green and black, anthropomorphic robot bat, sits at a workbench. One wing has been detached and is laying in parts on the bench, whilst she uses the other to repair the parts of the disassembled wing.", { link: "//crouton.net" } %}

### Figure

{% figure caption="A blockquote with citation." %}

> This is a quotation from someone probably well known.

{% endfigure%}

{% figure caption="A left floated blockquote with citation.", float="left" %}

> This is a quotation from someone probably well known.

{% endfigure%}

{% figure caption="A right floated blockquote with citation.", float="right" %}

> This is a quotation from someone probably well known.

{% endfigure%}

{% figure caption="A caption for this image figure, waoh." %}
{% responsiveImage "./src/images/emy-by-integration.png", "A warmly lit room. The sun is setting outside of the window. Emy, a white, green and black, anthropomorphic robot bat, sits at a workbench. One wing has been detached and is laying in parts on the bench, whilst she uses the other to repair the parts of the disassembled wing." %}
{% endfigure %}

{% figure caption="Image figure floated left.", float="left" %}
{% responsiveImage "./src/images/emy-by-integration.png", "A warmly lit room. The sun is setting outside of the window. Emy, a white, green and black, anthropomorphic robot bat, sits at a workbench. One wing has been detached and is laying in parts on the bench, whilst she uses the other to repair the parts of the disassembled wing." %}
{% endfigure %}

{% figure caption="Image figure floated right.", float="right" %}
{% responsiveImage "./src/images/emy-by-integration.png", "A warmly lit room. The sun is setting outside of the window. Emy, a white, green and black, anthropomorphic robot bat, sits at a workbench. One wing has been detached and is laying in parts on the bench, whilst she uses the other to repair the parts of the disassembled wing." %}
{% endfigure %}
<br clear="both">

### Image differ

{% imageDiffer "./src/images/color-before.png", "Before: The homepage of this website with a dark grey background, orange spots and yellow heading and links.", "./src/images/color-after.png", "After: The homepage of this website with a dark blue/purple background, lighter purple spots, and bright green heading and links." %}

## Embeds

### Link cards

{% link "https://placeponi.es" %}
{% link "https://beeps.website" %}
{% link "https://www.bbc.co.uk/news/articles/c2dxlwz219ko" %}
{% link "https://www.theverge.com/2024/12/5/24314147/openai-reasoning-model-o1-strawberry-chatgpt-pro-new-tier" %}

### YouTube

{% youtube "fYJdr7mp9SE" %}
{% youtube "Z54wvKb5aig", { aspectRatio: 1 } %}
{% youtube "2J5tjfqbWkA", { aspectRatio: "4/3" } %}

### Social media "embed"

{% socialEmbed host="twitter.com", username="batbeeps", number="1462180413548421121", date="2021-11-20T22:05:51.000Z" %}
Why is these so little actual consistency here aaaugghhhh

{% responsiveImage "./src/images/star-trek-inconsistency.jpeg", "Screenshot of some Star Trek films thumbnails as they appear in iTunes Movies. 2 to 4 have a painted rainbow motif. 5, 6, 9 and 10 have a large Starfleet delta on the right containing the logo with some actor headshots to the left and the hero ship at the bottom. 8 has a similar layout except the logo is with the actor headshots on the left. 7 has a different layout entirely consisting of the film logo and various shots from the film assembled in a row against a metallic delta background." %}
{% endsocialEmbed %}

{% socialEmbed host="chitter.xyz", username="batbeeps", number="111773929720283664", date="2024-01-17T23:40:16.287Z" %}
I don't actually touch type in the 'correct' way—by the time school bothered to teach it I'd already used computers enough to make up my own method.

As a result, I'm very right paw dominant when I type, about two thirds of the keyboard is used with my right paw, so I doubt I could go much faster than that.
{% endsocialEmbed %}

{% socialEmbed host="bsky.app", username="beeps.gay", number="3lbmu3r6h2g2j", date="2024-11-23T15:54" %}
I'd somehow convinced myself the Vanessa Carlton song couldn't be named “A Thousand Miles" because that's a Proclaimers song, and you can't have two songs with the same name cuz it'd be too confusing.

Anyway according to my brain the song is called “Homebound (Making My Way Downtown)” now.
{% endsocialEmbed %}

{% block footerDecor %}{# Hide this to avoid unnecessary visual distraction. #}{% endblock %}