# classyCSS

An Unopinonated CSS Library / Framework

![GitHub repo size](https://img.shields.io/github/repo-size/maxnelson/classyCSS)
[![HitCount](https://hits.dwyl.com/maxnelson/classyCSS.svg?style=flat)](http://hits.dwyl.com/maxnelson/classyCSS)

## Summary

classyCSS is a CSS library that contains class-names in a standardized format conforming to the actual CSS property-values which they implement. It aims to be as unopinionated as possible and to minimize the layer of abstraction between CSS property-values and the class-names that implement them.

Here is an example CSS Rule contained within the library:

```css
.display-block {
  display: block;
}
```

All property-values are simply expressed as class-names by formatting them in lowercase letter words with hyphens between them.

So if you know the name of the CSS property and value you would like to add, simply add a class-name to your element with the property name and value separated by hyphens, and that had oughtta do the thing you want.

Some more examples:

```css
.display-block { display: block; }
.margin-top-2rem { margin-top: 2rem; }
.border-top-color-blue-100 { border-top-color: var(blue-100)}
etc.
```

## Details

The properties / values are gathered from the CSS specification documents found here:

https://github.com/w3c/webref/blob/main/ed/css/CSS.json

The CSS Definition Syntax of each property is parsed and then transposed into the format described above.

## Setup

Follow the steps below to install and configure classyCSS into your project.

### Installation

install using npm

```sh
npm install @modularmoon/classycss
```

### Configuration

Update the config object of your `vite.config` file to include the following plugin function.

```js
export default defineConfig({
plugins: [
    classyCSSPlugin({
        contentPaths: ["src/**/*.{js,jsx,ts,tsx,vue}"],
        outputFilePath: "path/to/your/CSS/folder/some_filename.css",
        safelist: ["always-include-this-class"],
    }),
],
```

Now you can link to this local CSS file.

### Optional Additional Configuration

You can optionally define your own variable values, such as lengths and colors, by creating a file titled 'variableValues.json' and creating objects for each variable value you want to customly define. For reference, see the default 'variableValues.json' file that comes in the npm directory.
