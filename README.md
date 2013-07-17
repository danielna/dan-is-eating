dan-is-eating
=============

Mucking around with the flickr API.  Trying to visualize [this page](https://secure.flickr.com/photos/daniseating/).  Uses the jQuery library [isotope](https://github.com/desandro/isotope) for visualizing the photos in a pinterest-style layout.

Also using [Sass](http://sass-lang.com/) and [Compass](http://compass-style.org/) for CSS.  Using [handlebars.js](http://handlebarsjs.com/) for javascript templating.

View a live version [here](http://labs.danielna.com/daniseating/).

Edit 7/17/2013
=====

As an exercise in learning Coffeescript I re-wrote the core flickr API/parsing file.  The file coffeescript/flickr_cfs.coffee compiles down into coffeescript/flickr_cfs.js, which I then manually copied to js/ and changed in the .html file.