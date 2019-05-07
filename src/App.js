import React, { Component } from 'react';
import './App.css';
import * as FourSquareAPI from './components/FourSquareAPI'
import FSLogo from './icons/foursquare.png'

class App extends Component {

  state = {
    map: {},
    markers: [],
    infowindow: {},
    serverVenues: [],
    venuesPics: []
  }

  /*
  
      As soon as the application is mounted: 
      - getSearch searches for 30 Rock Bars
      - getInfo searches for each Rock Bar ID to get only the image¹

      ¹: Foursquare allows a low number of fetches on the free version. It will
      show "TypeError: data is undefined" on the console when it hits the limit.
  */
  componentDidMount() {
    FourSquareAPI.getSearch().then(res => {
      this.setState({serverVenues: res})
      this.renderMap(); // Begins the map render
      let photos = this.state.venuesPics; // Gets and sets all venues main pictures that Foursquare calls bestPhoto
      for(let i = 0; i < this.state.serverVenues.length; i++) {
        FourSquareAPI.getInfo(this.state.serverVenues[i].id)
        .then(data => photos.push(data.bestPhoto))
      }
      this.setState({venuesPics: photos})
    })
  }

  // Since Google Maps API needs the <script>, let's create it and start the map
  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAOFG5MfWrnTNAlxiYoko5BOd6s5RTHrhY&callback=initMap')
    window.initMap = this.initMap
  }

  // Button that associates markers to the map, showing them all again
  showListings = () => {
    for(var i=0; i<this.state.markers.length; i++) {
      this.state.markers[i].setMap(this.state.map);
    }
  }

  // Button that disassociates markers from the map, hiding them all
  hideListings = () => {
    for(var i=0; i<this.state.markers.length; i++) {
      this.state.markers[i].setMap(null);
    }
  }

  // When an option from the dropdown is selected, makes everything like a marker click
  dropdownSelected = (barName) => {
    this.state.infowindow.close();

    let markers = this.state.markers;
    markers.forEach((marker) => {
      if(marker.name === barName) {
        this.state.infowindow.setContent(
          '<div tabIndex="4" role="aria-selected">'+
          marker.bestPhoto + '<br>' +
          '<h2>'+marker.name+'</h2>'+
          '<p>Address: '+marker.address+'</p>'+
          '<p>Postal Code: '+marker.postal+'</p>'+
          '<p>Category: '+marker.catName+'</p>'+
          '<hr />' +
          '<img src=' + FSLogo + ' width="20px" height="20px" alt="Powered by Foursquare"> Powered by Foursquare<br>'+
          '</div>'
        )
        this.state.infowindow.open(this.state.map, marker)
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
        marker.setAnimation(null)
      }
    })
  }
  
  // Initiates the map
  initMap = () => {
    // Creates the map at a point of New York, USA, without type control and fullscreen button
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center:{lat: 40.6971494, lng: -74.2598674},
      zoom: 16,
      mapTypeControl: false,
      fullscreenControl: false,
      styles:[{"featureType":"all","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"},{"saturation":"-100"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40},{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"lightness":21}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#7f8d89"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#2b3638"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2b3638"},{"lightness":17}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.icon","stylers":[{"visibility":"off"}]}],
    })

    // Defines maps default infowindow and bounds 
    let buildInfowindow = new window.google.maps.InfoWindow();
    let bounds = new window.google.maps.LatLngBounds();

    // Gets markers and pics to use locally
    let buildMarkers = this.state.serverVenues;
    let buildPics = this.state.venuesPics;
    let allMarkers = this.state.markers;

    // Gets API data and inserts in a bunch of markers, creating them
    for(let i = 0; i < buildMarkers.length; i++) {
      let position = {lat: buildMarkers[i].location.lat, lng: buildMarkers[i].location.lng};
      let name = buildMarkers[i].name;
      let id = buildMarkers[i].id;
      let address = buildMarkers[i].location.address;
      // Some Foursquare venues don't have address, so let's give something to show
      if(address === undefined) {
        address = 'There\'s no address'
      }
      let lat = buildMarkers[i].location.lat;
      let lng = buildMarkers[i].location.lng;
      let postal = buildMarkers[i].location.postalCode;
      // Foursquare categories are always an array with one element, but can get stuck when repeated
      if(buildMarkers[i].categories[0] === undefined) {
        buildMarkers[i].categories[0] = {
          name: 'Bar',
          icon: {prefix: 'https://ss3.4sqi.net/img/categories_v2/nightlife/pub_',
          suffix: '.png'}}
      }
      let catName = buildMarkers[i].categories[0].name;
      let icon = buildMarkers[i].categories[0].icon.prefix + '32' + buildMarkers[i].categories[0].icon.suffix;
      let bestPhoto;
      // Since my Foursquare API is free and limited, this is the best way I could think of
      if(buildPics[i] === undefined) {
        bestPhoto = 'There\'s no picture for ' + name;
      } else {
        bestPhoto = '<img src="'+ buildPics[i].prefix + '300x300' + buildPics[i].suffix +'" alt="Picture of' + name + '">'
      }

      // Defines the marker with all props needed
      let marker = new window.google.maps.Marker({
        id: id,
        map: map,
        position: position,
        name: name,
        title: name,
        address: address,
        lat: lat,
        lng: lng,
        postal: postal,
        catName: catName,
        icon: icon,
        bestPhoto: bestPhoto,
        animation: window.google.maps.Animation.DROP
      })

      // All markers will be organized here
      allMarkers.push(marker);

      // When a marker gets clicked ..
      marker.addListener('click', function() {
        // .. sets it's content to my design, ..
        buildInfowindow.setContent(
          '<div tabIndex="4" role="aria-selected">'+
          marker.bestPhoto + '<br>' +
          '<h2>'+marker.name+'</h2>'+
          '<p>Address: '+marker.address+'</p>'+
          '<p>Postal Code: '+marker.postal+'</p>'+
          '<p>Category: '+marker.catName+'</p>'+
          '<hr />' +
          '<img src=' + FSLogo + ' width="20px" height="20px" alt="Foursquare logo"> Powered by Foursquare<br>'+
          '</div>'
        )
        // .. adds it to our map, ..
        buildInfowindow.open(map, marker)
        // .. animates it once and ..
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
        marker.setAnimation(null)
      })
      // .. zooms to it, if needed
      bounds.extend(marker.position);
      map.fitBounds(bounds);
    }

    // Sort all markers by name
    allMarkers.sort(function(a, b) {
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    })

    // Stores all map data in states
    this.setState({markers: allMarkers, map: map, infowindow: buildInfowindow});
    console.log(allMarkers)

    document.getElementById('show-listings').addEventListener('click', this.showListings);
    document.getElementById('hide-listings').addEventListener('click', this.hideListings);
  }

  render() {
    return (
      <main>
        <div className="container">
          <div className="options-box">
            <h1 tabIndex="1">Find Rock Bars Near New York!</h1>
              <div>
                <input id="show-listings" type="button" value="Show Listings" onClick={this.showMarkers}/>
                <input id="hide-listings" type="button" value="Hide Listings" onClick={this.hideMarkers} />
              </div>
              <select onChange={e => this.dropdownSelected(e.target.value)} tabIndex="2">
                <option value="" tabIndex="5"/>
                {this.state.markers.map(bars =>
                  <option key={bars.id} tabIndex="5">
                  {bars.title}
                  </option>
                  )}
              </select>
              </div>
            <div tabIndex="4" id="map" role="application"></div>
          </div>
        </main>
      );
    }
  }

  // Simulates the <script> tag to use the Google Maps API confortly
  function loadScript(url) {
  var index = window.document.getElementsByTagName('script')[0]; // Selects first script tag
  var script = window.document.createElement('script'); // Creates script tag
  script.src = url; // Inserts the source property using the argument
  script.async = true; // Inserts the async property
  script.defer = true; // Inserts the defer property
  index.parentNode.insertBefore(script, index); // Keeps script at the very beggining

  if(script === undefined) {
    gm_authFailure();
  }
}

// When the Google Maps authentication fails, the following global function will be called 
function gm_authFailure() {
  window.alert("There was a problem with Google Maps! Please try again after some time.")
};

export default App;
