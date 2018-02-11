# Yosemite Recreation Map

## Introduction

This project was created as an assignment for the Udacity Front-end Nanodegree program.

## Using the Map

Click [here](https://kimhastings.github.io/yosemite/) to open a hosted version of the map in your browser.

For debugging, you will need a way to serve the map. [These instructions](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server) from our friends at Mozilla explain how to set up a simple local HTTP server.

Instructions for me:

1. Open the integrated terminal in VS code (with the project folder already loaded)
2. Type: python3 -m http.server (serves this folder)
3. Go to the URL localhost:8000 in your web browser

If you get an uncaught referrer error, remember to TEMPORARILY enable localhost for your API key [here](https://console.developers.google.com).

If you get a CORS error, install the [Allow-Control-Allow-Origin extension to Chrome](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi), and make sure the icon for this extension is green (enabled). Might need to cycle the setting off and on (click the green icon).

Use CTRL-C to kill the server if needed.

## Acknowledgments

Paw icon borrowed from [Puppy Poppins](http://www.puppypoppins.co.uk/)

How to limit marker bounce: [Bounce a marker pin once](https://stackoverflow.com/questions/7339200/bounce-a-pin-in-google-maps-once)

Searchbar courtesy of [W3Schools](https://www.w3schools.com/howto/howto_css_searchbar.asp)

Campground information via the [Active Access Campground API](http://developer.active.com/docs/read/Campground_APIs)

Inspiration from these Udacity students: [Sentry71](https://github.com/Sentry71/neighborhood-map), [jshanks24](https://github.com/jshanks24/Udacity-Neighborhood-Map), [gmawji](https://github.com/gmawji/neighborhood-map)
