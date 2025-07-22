---
layout: brand.njk
title: Brand
updated: 2025-04-19
metadata:
  description: The style guide for my personal projects, including this website.
cssComponents:
  - table
  - blockquote
  - code
---

This page explains brand decisions of upstream. However, the actual styling is in `src/assets/_settings.scss`.

{% pairedcanned %}
{{ page.url }} {{page.inputPath}}
{% endpairedcanned %}

{% set colourAssignments = [
  { name: "Text", dark: "#ffffff", light: "#334139" },
  { name: "Supporting text", dark: "#d4d4d7", light: "#586b60" },
  { name: "Accent text and links", dark: "#00FAFF", light: "#1280FF" },
  { name: "Hovered and visited links", dark: "#12C8FF", light: "#2BAFFF" },
  { name: "Canvas", dark: "#2a2536", light: "#ffffff" },
  { name: "Surface", dark: "#3d364f", light: "#f4f3f7" },
  { name: "Page furniture", dark: "#FF6999", light: "#FF6999" }
] %}

<style>
:root {
  {%- for n, c in palette %}
  --brand-color-{{ n }}: {{ c }};
  {%- endfor %}
}
</style>

{% macro _swatch(hex) %}
<span class="page-swatch">
<span class="page-swatch__preview" style="background-color: {{ hex }};"></span>
<code class="kimCode">{{ hex }}</code>
</span>
{% endmacro %}

## Colours

Always aim to achieve at least a 4.5:1 contrast ratio between text and background colours, in accordance with [the WCAG Level AA criterion](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html).

<table class="kimTable">
  <thead class="kimTable_head">
    <tr class="kimTable_row">
      <th class="kimTable_header" scope="col">Usage</th>
      <th class="kimTable_header" scope="col">Dark</th>
      <th class="kimTable_header" scope="col">Light</th>
    </tr>
  </thead>
  <tbody class="kimTable_body">
    {%- for r in colourAssignments %}
    <tr class="kimTable_row">
      <th class="kimTable_header" scope="row">{{ r.name }}</th>
      <td class="kimTable_cell">{{ _swatch(r.dark, palette[r.dark]) }}</td>
      <td class="kimTable_cell">{{ _swatch(r.light, palette[r.light]) }}</td>
    </tr>
    {%- endfor %}
  </tbody>
</table>

## Typography

[Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) is used for the majority of text. As a variable font, it's available in all widths from bold (700) to thin (300).

> <div style="font-family:'Space Grotesk'"><span style="font-weight:700">We choose to go to the Moon. </span> <span style="font-weight:600">We choose to go to the Moon... </span><span style="font-weight:500">We choose to go to the Moon in this decade and do the other things, not because they are easy, but because they are hard; </span><span style="font-weight:400">because that goal will serve to organize and measure the best of our energies and skills,</span> <span style="font-weight:300">because that challenge is one that we are willing to accept, one we are unwilling to postpone, and one we intend to win, and the others, too.</span></div>

[Space Mono](https://fonts.google.com/specimen/Space+Mono) is used for code snippets and as a stylistic alternative for small amounts of text. It's used in bold (700) and regular (400) weights.

## Iconography

### Utility icons

Some custom made icons for custom made uses.

{%- set icons = [
  "arrow-n",
  "arrow-ne",
  "arrow-e",
  "arrow-se",
  "arrow-s",
  "arrow-sw",
  "arrow-w",
  "arrow-nw",
  "menu",
  "rss"
] -%}

<div style="display: flex; flex-wrap: wrap; gap: var(--space-3);">
{%- for i in icons -%}<span>{% include "./assets/icons/" + i + ".svg" %}</span>{% endfor -%}
</div>
