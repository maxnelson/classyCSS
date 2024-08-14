# classyCSS - An Unopinonated CSS Library / Framework

![GitHub repo size](https://img.shields.io/github/repo-size/maxnelson/classyCSS)
[![HitCount](https://hits.dwyl.com/maxnelson/classyCSS.svg?style=flat)](http://hits.dwyl.com/maxnelson/classyCSS)

## Summary

classyCSS is a CSS library that contains CSS rules for every possible CSS propery / value\*.

The properties / values are gathered from the CSS specification documents found here:

https://github.com/w3c/webref/blob/main/ed/css/CSS.json

And are parsed / configured into the following format:

```css
.display-block { display: block; }
.margin-top-2rem { margin-top: 2rem; }
.border-top-color-blue-100 { border-top-color: var(blue-100)}
etc.
```

All property-values are simply expressed in lowercase letter words with hyphens between them.

The idea is to minimize the layer of abstraction between the CSS property values themselves, and the class names used to implement them.

So if you know the names of the CSS property and value you would like to add, simply add a className with hyphens between each word, as well as the property and value, and viola, you're done.

## Installation

install using npm

```sh
npm install @modularmoon/classycss
```

## Configuration

\*\*Ok, so not quite every property, variable value types such as lengths, integers and colors are input manually.
