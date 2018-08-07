Barebones Functional Framework (BFF)
===

Creating HTML wireframes is a pain if you're not a developer. What's a designer to do? Enter BFF. BFF is a barebones wireframing framework built on the concept of Model-View-Controller (MVC), but without the M and the C. Just the V.

BFF is a single page app that uses jQuery and AJAX to load partials (pages without the <body>, <head> and <html> tags) into a single common `index.html`. The `index.html` contains all the common code, such as JavaScript and site wide CSS.

The view contains everything the page needs, including styles and JavaScript. The views are loaded dynamically into the page.

`index.html` loads an initial page `app.html`, specified in `bff.js`.

This is a barebones MVC framework. There are no models, controllers, routes, event handlers, etc. To load a view, simply use the filename of the view.

# Setup
1. Install node.
3. Open a command prompt/Terminal and git clone this project:
```
git clone https://github.com/bff-project/bff-starter.git
```
4. Install `grunt-cli` locally:
```
npm install grunt-cli --save-dev
```
5. Install dependencies (i.e. 3rd party libraries that BFF needs to work correctly):
```
npm install
```


# Running the App
1. Open a command prompt/Terminal to the bff subfolder and type:
```
grunt
```
2. This will start up the webserver, watch for changes in the files, and compile Sass into CSS.


# Viewing Pages
- To view your website, go to http://localhost:9900/ to load the default page.
- To go to a specific page, go to http://localhost:9900/#/Name_of_file.html


# Adding Pages
Put all the common HTML into `index.html`
Create your other files as normal.
When linking to another page, use the following format:
```
<a href="#/Name_of_file.html">
```

Remember, the URL is relative to `index.html`
```
<a href="#/about/me.html">This page is in the about subfolder.</a>
```

You can now deep-link to a Bootstrap tab, modal, popup, or anchor by doing the following:
```
<a href="#/about/me.html#tab-name>This will display the tab, even if it's not the default tab</a>
```
Where #tab-name is the ID of the control i.e. id="tab-name"


# Adding Shared Components: HTML partials
If there's a section of code or component that will be used in multiple pages, put it in a separate file and insert it into your page as follows:

```
<div class="bff-include"
    data-src="url-to-component.html"
    data-event="sharedComponentLoaded">
</div>
```

 `data-event` is a custom event that is fired when the component is rendered into the HTML. You can listen for events using jQuery's ```on``` function:

```
$('.bff-include').on('sharedComponentLoaded', function() {
    // Do something
});
```

Note that a `bff-include` can be nested inside another `bff-include`. There's no limit to how deep you can nest, but note that nesting too deep
can cause a slight delay in loading all the nested pieces.

Once all `bff-include` components have been loaded, a final `bffLoaded` event will be fired. You can listen for this event using:

```
$(document).on('bffLoaded', function() {
    // Your code here
});
```


# Adding Shared Components: JavaScript
BFF supports dynamically loaded JavaScript files. To load JavaScript into BFF, use:

```
<div class="bff-script"
    data-src="url-to-component.js"
    data-type="text/javascript"
    data-placement="[top/bottom]">
</div>
```

`class="bff-script"` **[required]** the class name required to detect the script to be loaded by BFF

`data-src` **[required]** the path to the JavaScript file, relative to the index.html of the application

`data-type` _[optional]_ the <script type="">, typically "text/javascript"

`data-placement` _[optional]_ the location ("top" or "bottom) where the script will be loaded on the DOM; "bottom" (default) loads into the bottom of the <body>; "top" loads into the bottom of the <head>

_(Note that JavaScript may also be loaded using the regular <script> tag, but this is discouraged because the script will be loaded into an arbitrary location instead of the <head> or bottom of the <body>.)_


 # Acknowledgements
 BFF was developed by Sherif Tariq, with input from Brad Hansen, Brad Carter and Marcelo Somers. Special thanks to Dori Maloney for overhauling the BFF JavaScript framework for performance and stability.
