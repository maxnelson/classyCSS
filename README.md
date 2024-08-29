# classyCSS

An Unopinonated CSS Library / Framework

![GitHub repo size](https://img.shields.io/github/repo-size/maxnelson/classyCSS)
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fmaxnelson%2FclassyCSS&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits+daily+%2F+total&edge_flat=false)](https://hits.seeyoufarm.com)

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

1. Install using npm

```sh
npm install @modularmoon/classycss --save-dev
```

### Configuration

2. Update the plugins object of your `vite.config` file to include the following plugin function.

```js
classyCSSPlugin({
  contentPaths: ["src/**/*.{js,jsx,ts,tsx,vue}"],
  outputFilePath: "path/to/your/CSS/folder/some_filename.css",
});
```

For clarity, your entire config object should look something like this:

<pre><code>export default defineConfig({
  plugins: [
    react(),
    <span style="color: red;">classyCSSPlugin({
      contentPaths: ["src/**/*.{js,jsx,ts,tsx,vue}"],
      outputFilePath: "path/to/your/CSS/folder/some_filename.css"
    })</span>,
    ...],
    server: {...}});</code></pre>

3. Adjust the value of the 'contentPaths' property to make sure it includes all the files in your project which may contain html classNames.<sup>\*</sup>
4. Adjust the value of the 'outputFilePath' property to point to the directory where you store your .css files, with whatever filename you prefer.
5. From now on, whenever you update any of the files located under any of the filepaths specified as a value of the 'contentPaths' parameter, it will run the purgeCSS command and trim the generated CSS file to only include classNames that are used in your project.

   Make a change to any one of those files in order to run the script for the first time, and generate the file to the filepath specified as the value of the 'outputFilePath' parameter.

6. Now you can link to this local CSS file as a stylesheet via your preferred method.

i.e. via HTML:

```html
<link rel="stylesheet" href="src/css/classyCSS.css" />
```

or via Javascript:

```js
import "./css/classyCSS.css";
```

7. Viola! You're done. Add and remove classNames as needed and the classyCSS.css file will adjust itself to only include rules for classNames found in the project.

### Optional Additional Configuration

\*You can add additional properties to the classyCSSPlugin()'s argument object, such as 'safelist'.For more information, see the list of available configuration parameters here: https://purgecss.com/configuration.html

You can optionally define your own variable values, such as lengths and colors, by creating a file titled 'variableValues.json' and creating objects for each variable value you want to customly define. For reference, see the default 'variableValues.json' file that comes in the npm directory.

https://www.npmjs.com/package/@modularmoon/classycss
