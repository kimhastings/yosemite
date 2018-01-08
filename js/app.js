/*
Knockout must be used to handle the list, filter, and any other information on the page that is subject to changing state. 
Things that should not be handled by Knockout: anything the Maps API is used for, creating markers, 
tracking click events on markers, making the map, refreshing the map. 
Note 1: Tracking click events on list items should be handled with Knockout. 
Note 2: Creating your markers as a part of your ViewModel is allowed (and recommended). Creating them as Knockout observables is not.

*/

/* ======= Model (Markers) ======= */

var Model = {
    markers: [
      {
        title: 'Hite Cove Trail',
        lat: 37.654436, 
        lng: -119.887481,
        highlight: ko.observable(false)
      },
      {
        title: 'Merced River Trail (Briceburg)',
        lat: 37.604710,  
        lng: -119.968021,
        highlight: ko.observable(false)
      },
      {
        title: 'Merced River Trail (Railroad Flat)',
        lat: 37.618932,  
        lng: -120.019793,
        highlight: ko.observable(false)
      },
      {
        title: 'Stockton Creek Trail System',
        lat: 37.503194,  
        lng: -119.967228,
        highlight: ko.observable(false)
      },
      {
        title: 'Miami Mountain Trail',
        lat: 37.417556,  
        lng: -119.730950,
        highlight: ko.observable(false)
      },
      {
        title: 'Goat Mountain Trail',
        lat: 37.291745,  
        lng: -119.579649,
        highlight: ko.observable(false)
      },
      {
        title: 'Lewis Creek Trail',
        lat: 37.403548,   
        lng: -119.625869,
        highlight: ko.observable(false)
      },
      {
        title: 'Nelder Grove Trail System',
        lat: 37.430436,   
        lng: -119.584711,
        highlight: ko.observable(false)
      },
      {
        title: 'Preston Falls Trail',
        lat: 37.878708,   
        lng: -119.950472,
        highlight: ko.observable(false)
      },
      {
        title: 'Red Hills Trail System',
        lat: 37.838470,   
        lng: -119.730950,
        highlight: ko.observable(false)
      },
      {
        title: 'Table Mountain Trail (Jamestown)',
        lat: 37.943824,    
        lng: -120.462019,
        highlight: ko.observable(false)
      },
      {
        title: 'Table Mountain Trail (Prather)',
        lat: 37.049427,    
        lng: -119.565250,
        highlight: ko.observable(false)
      },
      {
        title: 'San Joaquin River Gorge Trail System',
        lat: 37.082906,     
        lng: -119.554113,
        highlight: ko.observable(false)
      },
    ]
};

/* ======= ViewModel (Markers) ======= */

/*
For example, if you’re implementing a list editor, 
your view model would be an object holding a list of items, and exposing methods to add and remove items.

Note that this is not the UI itself: it doesn’t have any concept of buttons or display styles. 
It’s not the persisted data model either - it holds the unsaved data the user is working with. 
When using KO, your view models are pure JavaScript objects that hold no knowledge of HTML
*/

var map;

var ViewModel = function() {
    var self = this;
    var largeInfowindow = new google.maps.InfoWindow();

    this.initMap = function() {
        // Draw the map
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: new google.maps.LatLng(37.6, -119.9),
            zoom: 9
        };
        map = new google.maps.Map(mapCanvas, mapOptions);

        // Custom marker icon
        var dogIcon = {
            url: "img/google-maps-paw-icon-173x300.png",
            scaledSize: new google.maps.Size(20,32),
        };
        // Add the markers
        Model.markers.forEach(function(marker) {
            var newMarker = new google.maps.Marker({
                position: {lat: marker.lat, lng: marker.lng},
                map: map,
                title: marker.title,
                icon: dogIcon,
                animation: google.maps.Animation.DROP
            }); 
            // Create an onclick event to open the large infowindow at each marker.
            newMarker.addListener('click', function() {
                populateInfoWindow(this, largeInfowindow);
            });
        });
    };
    this.initMap();

   /*
    this.something = ko.observable(initial_value);

    this.doSomething = function() {
        this.something(newValue);
    }
*/
};

function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        // Clear the infowindow content to give the streetview time to load.
        infowindow.setContent('');
        infowindow.marker = marker;
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
          infowindow.marker = null;
        });
        infowindow.setContent('<div>' + marker.title + '</div>');
        // Open the infowindow on the correct marker.
        infowindow.open(map, marker);
    }
};

/*
When using KO, your view is simply your HTML document with declarative bindings to link it to the view model.
*/
function initialize() {
    ko.applyBindings(new ViewModel());
}