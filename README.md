# Dog Hikes Near Yosemite National Park

## Introduction

This project was created as an assignment for the Udacity Front-end Nanodegree program. It's an interactive map showing places near Yosemite National Park where dogs are allowed on trails (which is not the case inside the park).

## Using the Map

Click [here](https://kimhastings.github.io/yosemite/) to open a hosted version of the map in your browser.

You can also serve the map from your own computer using the Chrome browser, as follows: 

- Install [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en)
- Download this repository to your computer using the green "Clone or Download" button, and unzip the download 
- Open **_Web Server for Chrome_** and choose the folder that you unzipped 
- Make sure the option box called "Automatically show index.html" is checked, then start the server
- After you start the Web Server, you can open the map at http://127.0.0.1:8887/

Alternatively, you can use [these instructions](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server) from our friends at Mozilla to set up a simple local HTTP server. Use CTRL-C to kill the server if needed.

If you get a CORS error, install the [Allow-Control-Allow-Origin extension to Chrome](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi), and make sure the icon for this extension is green (enabled). Might need to cycle the setting off and on (click the green icon).

If you get an uncaught referrer error, you will need to replace my Google Maps API key with your own and enable localhost for your API key [here](https://console.developers.google.com).

## Acknowledgments

[Responsive topnav](https://www.w3schools.com/howto/howto_js_topnav_responsive.asp), [filter dropdown](https://www.w3schools.com/howto/howto_js_filter_dropdown.asp), and [modal](https://www.w3schools.com/bootstrap/bootstrap_modal.asp) designs with help from W3Schools

Unicode character for hamburger icon from [Cory LaViska](https://www.abeautifulsite.net/the-unicode-character-for-menu-icons)

Paw marker icon borrowed from [Puppy Poppins](http://www.puppypoppins.co.uk/)

How to limit marker bounce: [Bounce a marker pin once](https://stackoverflow.com/questions/7339200/bounce-a-pin-in-google-maps-once)

Campground information via the [Active Access Campground API](http://developer.active.com/docs/read/Campground_APIs)

Weather information via the [Dark Sky API](https://darksky.net/dev)

Inspiration from these Udacity students: [Sentry71](https://github.com/Sentry71/neighborhood-map), [jshanks24](https://github.com/jshanks24/Udacity-Neighborhood-Map), [gmawji](https://github.com/gmawji/neighborhood-map)
