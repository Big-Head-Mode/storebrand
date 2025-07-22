---
layout: generic.njk
title: Cool links
updated: 2025-06-18
metadata:
  description: Cool sites on the information cyber highway that I like.
cssComponents:
  - character
  - button-grid
---

This page uses buttons.js, which in turn uses ./buttons/beeps.js, friends.js, random.js.

{% pairedcanned %}
{{ page.url }} {{page.inputPath}}
{% endpairedcanned %}

{% from "src/_includes/88x31-button.njk" import kim88x31Button %}

<div class="kimButtonGrid">
{%- for i in buttons.friendsitesButtons %}{{- kim88x31Button(i) -}}{%- endfor %}
</div>

<ul class="kimList kimList-bulleted kimList-columns">
  {%- for i in buttons.friendsites %}
  <li><a class="kimLink" href="{{ i.url }}">{{ i.alt }}</a></li>
  {%- endfor %}
</ul>

## Buttons

<div class="kimButtonGrid">
{%- for i in buttons.random %}{{- kim88x31Button(i) -}}{%- endfor %}
</div>

## Linking back to this website

You can acquire these buttons programatically via the [.well-known/button schema](https://codeberg.org/LunarEclipse/well-known-button).

<div class="kimButtonGrid">
{%- for i in buttons.beeps %}{{- kim88x31Button(i) -}}{%- endfor %}
</div>
