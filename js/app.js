/* ======= ViewModel (Markers) ======= */

/*
For example, if you’re implementing a list editor, 
your view model would be an object holding a list of items, and exposing methods to add and remove items.

Note that this is not the UI itself: it doesn’t have any concept of buttons or display styles. 
It’s not the persisted data model either - it holds the unsaved data the user is working with. 
When using KO, your view models are pure JavaScript objects that hold no knowledge of HTML
*/


var markersViewModel = {
    marker: null,
    markers: [
        {
            title: '',
            lat: 0,
            lng: 0
        }
    ],
    functionality: somefunction
}


// Contains all the locations and search function.
var locationsModel = {

    locations:[
    new Location('Penzeys Spices', 35.78961, -78.66032, '4cdd6918d4ecb1f701298548', 'Shopping'),
    new Location('Raleigh Flea Market', 35.79499, -78.70719, '4ad4c00af964a5203ded20e3', 'Shopping'),
    new Location('Reader\'s Corner', 35.79005, -78.67937, '4adc8051f964a520b92c21e3', 'Shopping'),
    new Location('State Farmers Market', 35.76363, -78.66274, '4bb8979c3db7b713c965219a', 'Shopping'),
    new Location('Capital RunWalk', 35.79039, -78.65867, '4b6b5120f964a52078002ce3', 'Shopping'),
    new Location('Watson\'s Market Place & Flea Market', 35.76063, -78.61596, '4d615493e4fe5481a8618a9e', 'Shopping'),
    new Location('Raleigh Denim', 35.77665, -78.64465, '4c84e24574d7b60ca66196d8', 'Shopping'),
    new Location('Cloos\' Coney Island', 35.77770, -78.67485, '4afee1fdf964a520333122e3', 'Food'),
    new Location('Franks Pizza', 35.77880, -78.60704, '4aecb1b2f964a52056ca21e3', 'Food'),
    new Location('Snoopy\'s Hot Dogs & More', 35.80719, -78.62499, '4bf6c03013aed13a6823eaf7', 'Food'),
    new Location('Clyde Cooper\'s Barbecue', 35.77630, -78.63831, '4b63170ef964a52039622ae3', 'Food'),
    ],
    query: ko.observable(''),
};


var viewModel = function() {

};

/*
When using KO, your view is simply your HTML document with declarative bindings to link it to the view model.
*/

ko.applyBindings(new markersViewModel());