/* ======= Model (Markers) ======= */

var Model = {
    markers: [
      {
        title: "Ahwahnee Hills Park Trails",
        url:"https://www.yosemitehikes.com/not-yosemite/ahwahnee-park/ahwahnee-park.htm",
        lat: 37.380380,
        lng: -119.731692
      },
      {
        title: "Hite Cove Trail",
        url:"https://www.yosemitehikes.com/not-yosemite/hite-cove/hite-cove.htm",
        lat: 37.654436,
        lng: -119.887481
      },
      {
        title: "Merced River Trail (Briceburg)",
        url:"https://www.blm.gov/visit/merced-river",
        lat: 37.604710,
        lng: -119.968021
      },
      {
        title: "Merced River Trail (Railroad Flat)",
        url: "https://www.blm.gov/visit/merced-river",
        lat: 37.618932,
        lng: -120.019793
      },
      {
        title: "Stockton Creek Trail System",
        url: "https://sierrafoothill.org/stockton-creek-preserve/",
        lat: 37.503194,
        lng: -119.967228
      },
      {
        title: "Miami Mountain Trail",
        url: "http://www.fire-lookouts.org/cali/miami_mtn/index.htm",
        lat: 37.417556,
        lng: -119.730950
      },
      {
        title: "Goat Mountain Trail",
        url: "http://www.nhlr.org/lookouts/us/ca/goat-mountain-lookout/",
        lat: 37.291745,
        lng: -119.579649
      },
      {
        title: "Lewis Creek Trail",
        url: "https://www.yosemitehikes.com/not-yosemite/lewis-creek/lewis-creek.htm",
        lat: 37.403548,
        lng: -119.625869
      },
      {
        title: "Nelder Grove Trail System",
        url: "https://www.yosemitehikes.com/not-yosemite/nelder-grove/nelder-grove.htm",
        lat: 37.430436,
        lng: -119.584711
      },
      {
        title: "Preston Falls Trail",
        url: "https://www.fs.usda.gov/recarea/stanislaus/recarea/?recid=14967",
        lat: 37.878708,
        lng: -119.950472
      },
      {
        title: "Red Hills Trail System",
        url: "https://www.blm.gov/visit/red-hills",
        lat: 37.838470,
        lng: -119.730950
      },
      {
        title: "Table Mountain Trail (Jamestown)",
        url:"https://www.tchistory.org/tchistory/Wonders_9.htm",
        lat: 37.943824,
        lng: -120.462019
      },
      {
        title: "Table Mountain Trail (Prather)",
        url: "https://sierrafoothill.org/ruth-mckenzie-table-mountain-preserve/",
        lat: 37.049427,
        lng: -119.565250
      },
      {
        title: "San Joaquin River Gorge Trail System",
        url: "https://www.blm.gov/visit/san-joaquin-river-gorge-recreation-area",
        lat: 37.082906,
        lng: -119.554113
      }
    ]
};

/* ======= ViewModel ======= */

var map;

var ViewModel = function() {
    var self = this;

    // KO variables to store list of markers and filter query
    self.markerArray = ko.observableArray();
    self.query = ko.observable('');

    // KO filtered array contains items that match the user's query
    self.filteredArray = ko.computed(function() {
      return ko.utils.arrayFilter(self.markerArray(), function(marker) {
        return marker.title.toLowerCase().indexOf(self.query().toLowerCase()) !== -1;
      });
    }, self);

    // Show/hide markers on map when contents of filtered array changes
    self.filteredArray.subscribe(function() {
      var compare = ko.utils.compareArrays(self.markerArray(), self.filteredArray());
      ko.utils.arrayForEach(compare, function(marker) {
        if (marker.status === 'deleted') {
          marker.value.setMap(null);
        } else {
          marker.value.setMap(map);
        }
      });
    });

    // KO variable and function to show/hide list
    self.showList = ko.observable(false);
    self.toggleList = function() {
      self.showList(!self.showList());
    };

    // Helper function to highlight marker on map when a list item is clicked
    self.selectMarker = function(listItem) {
      google.maps.event.trigger(listItem, 'click');
    };

    // Build the initial map with all markers displayed
    var largeInfowindow = new google.maps.InfoWindow();

    this.initMap = function() {
        // Draw the map
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: new google.maps.LatLng(37.6, -119.9),
            mapTypeId: 'terrain',
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
                url: marker.url,
                icon: dogIcon,
                animation: google.maps.Animation.DROP
            }); 
            // Create an onclick event at each marker to open the large infowindow.
            newMarker.addListener('click', function() {
                populateInfoWindow(this, largeInfowindow);
            });
            // Add marker to observable array
            self.markerArray.push(newMarker);
        });
    };
    this.initMap();
};

function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      // Close the infowindow and update its marker
      infowindow.close();
      infowindow.marker = marker;
      // Clear the marker property if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });

      // Find the nearest public campground using the Active Access campground search API
      $.ajax({
        type: 'GET',
        url: 'https://api.amp.active.com/camping/campgrounds/',
        data: {
          pets: 3010,
          landmarkLat: marker.getPosition().lat(),
          landmarkLong: marker.getPosition().lng(),
          landmarkName: 'true',
          api_key: 'wn4vajq2zg38849y3pryfjkz'
        },
        dataType: 'xml',
        success: function(data) {
          // Get the name and url from the first item in the response
          // NOTE: Campground API has no way to limit the number of items in the response
          // It returns all campgrounds within 200 miles!
          var doc = $(data.documentElement);
          var contractCode = doc[0].children[0].attributes[3].nodeValue;
          var facilityID = doc[0].children[0].attributes[5].nodeValue;
          var nearestCampground = {
            name: doc[0].children[0].attributes[6].nodeValue,
            url: "https://www.reserveamerica.com/campsiteSearch.do?contractCode=" + contractCode + "&parkId=" + facilityID
          };
          console.log(nearestCampground);

          // Format the infowindow
          var link = '</br></br><a href="' + marker.url +  '" target="_blank">Click here for details about this hike</a>';
          infowindow.setContent('<div>' + marker.title + link + '</br></br>Nearest Campground: <a href=' + nearestCampground.url + ' target="_blank">' + nearestCampground.name + '</a></div>');
          // Open the infowindow on the correct marker.
          infowindow.open(map, marker);
        },
        error: function() {
          console.log('Unable to retrieve campground data');
          var link = '</br></br><a href="' + marker.url +  '" target="_blank">Click here for details about this hike</a>'; 
          infowindow.setContent('<div>' + marker.title + link + '</br></br>UNABLE TO FIND CAMPGROUND INFO</div>');
          infowindow.open(map, marker);
        }
      });

      // Bounce the marker three times
      map.panTo(marker.getPosition());
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function(){ marker.setAnimation(null); }, 2100);   
    }
}

function initialize() {
  /* Enable popovers (for About) */
  $(document).ready(function(){
      $('[data-toggle="popover"]').popover(); 
  });

  ko.applyBindings(new ViewModel());
}