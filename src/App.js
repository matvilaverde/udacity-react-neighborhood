import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    map: {},
    markers: [],
    infowindow: {},
    serverVenues: []
  }
  
  CLIENT_ID = 'JMMI3TQMXGFIN3ZYY5NN4SEGLG0QD31ZRSOUAWUT0FU2KCUF'
  CLIENT_SECRET = 'WQNXVXEP4VIACTXQQ4PLYJIRR4EYKZRYHXF0VNS3IWTQBODW'
  api = "https://api.foursquare.com/v2/venues/"
  query = '%22rock%20bar%22';
  near = 'New York, United States of America';
  todaysData = '20190502'
  venuesID = []


  /*
    REVIEWER:

    Hi! :D
    I've commented out some of the code and called you like that (REVIEWER) another time below with another question!

    First one: I tried to use that fetch below on my FourSquareAPI file and couldn't call it here.
    All I got back was 'Object(...)(...) is not defined' or something like that.
    Made the same thing but ending with .then(data => data.response.venues) and got that error.

    Second one: also tried to make another fetch, like getAllID, to use each venues ID to get venues data and got nothing.

  */

  componentDidMount() {
    // Fetches Rock bars in New York City
    fetch(this.api + 'search?query=' + this.query + '&near=' + this.near + '&client_id=' + this.CLIENT_ID +
    '&client_secret=' + this.CLIENT_SECRET + '&v=' + this.todaysData)
    .then(res => res.json())
    .then(data => {
      this.setState({serverVenues: data.response.venues})
      data.response.venues.forEach(element => {
        this.venuesID.push(element.id)
      });
      this.renderMap(); // Begins the map render
    })
    .catch( error => {
      window.alert('An error ocorred: ' + error)
      console.log(error);
    })
  }

  // Since Google Maps API needs the <script>, let's create it and start the map
  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=MYAPIKEY&callback=initMap')
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
  dropdownSelected = (barTitle) => {
    this.state.infowindow.close();

    let markers = this.state.markers;
    markers.forEach((marker) => {
      if(marker.title === barTitle) {
        this.state.infowindow.setContent('will copy and paste from click\'s final version')
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
  
  // The map!
  initMap = () => {
    // Creates the map at a point of New York, USA
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center:{lat: 40.6971494, lng: -74.2598674},
      zoom: 16,
      mapTypeControl: false,
      fullscreenControle: false,
      styles:[{"featureType":"all","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"},{"saturation":"-100"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40},{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"lightness":21}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#7f8d89"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#2b3638"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2b3638"},{"lightness":17}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.icon","stylers":[{"visibility":"off"}]}],
    })
    
    let buildInfowindow = new window.google.maps.InfoWindow();
    
    let bounds = new window.google.maps.LatLngBounds();

    let buildMarkers = this.state.serverVenues;

    let allMarkers = this.state.markers;

    // Infowindow creator
    function populateInfoWindow(marker, infowindow) {
      if (infowindow.marker !== marker) {
        infowindow.setContent(''); // Resets the content
        infowindow.marker = marker; // Gets current clicked marker
        infowindow.addListener('closeclick', function() {
          infowindow.marker = null;
        });
        
        // An attempt to use street view static images
        let streetViewService = new window.google.maps.StreetViewService();
        let radius = 50;
        
        // Gets and sets content to the clicked marker's infowindow
        function getStreetView(data, status) {
          if (status === window.google.maps.StreetViewStatus.OK) {
            let nearStreetViewLocation = data.location.latLng;
            let heading = window.google.maps.geometry.spherical.computeHeading(
            nearStreetViewLocation, marker.position);

            /*
              REVIEWER:
              Why can't I see these images below?

              Even locally, that foursquareLogo isn't appearing to me.

              My API src too, I really think it should be working. Could it be my key?
            */

            let foursquareLogo = './icons/foursquare.png';
            infowindow.setContent(
              '<div>'+
              '<img src="https://maps.googleapis.com/maps/api/streetview?size=200x200&location='+ marker.lat +','+marker.lng+
              '&heading=151.78&pitch=-0.76&key=MYAPIKEY&signature=MYSIGN"><br>'+
              '<h2>'+marker.name+'</h2>'+
              '<p>Address: '+marker.address+'</p>'+
              '<p>Rating: '+marker.rating+'</p>'+ // NOT IMPLEMENTED YET!
              '<p>Likes: '+marker.likes+'</p>'+ // NOT IMPLEMENTED YET!
              '<div id="pano"></div>' +
              '<img src=' + foursquareLogo+ ' alt="Powered by Foursquare"><br>'+
              '</div>');
              var panoramaOptions = {
                position: nearStreetViewLocation,
                pov: {
                  heading: heading,
                  pitch: 30
                }
              }
              var panorama = new window.google.maps.StreetViewPanorama(
                document.getElementById('pano'), panoramaOptions);
            } else {
              infowindow.setContent('<div>' + marker.title + '</div>' +
                '<div>No Street View Found</div>');
            }
          }
          streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
          infowindow.open(map, marker);
        }
      }
    
    // Gets API data and inserts in a bunch of markers, creating them
    for(let i=0; i<buildMarkers.length; i++) {
      let position = {lat: buildMarkers[i].location.lat, lng: buildMarkers[i].location.lng};
      let name = buildMarkers[i].name;
      let id = buildMarkers[i].id;
      let address = buildMarkers[i].location.address;
      if(address === undefined) {
        address = 'There\'s no address on FourSquare'
      }
      let lat = buildMarkers[i].location.lat;
      let lng = buildMarkers[i].location.lng;
      let ratings = '';
      let likes = ''

      let marker = new window.google.maps.Marker({
        id: id,
        map: map,
        position: position,
        name: name,
        title: name,
        address: address,
        lat: lat,
        lng: lng,
        ratings: ratings,
        likes: likes,
        animation: window.google.maps.Animation.DROP
      })

      // All markers will be organized here
      allMarkers.push(marker);

      // When a marker gets clicked ..
      marker.addListener('click', function() {
        populateInfoWindow(this, buildInfowindow);
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
    console.log(allMarkers)

    // Stores all map data in states
    this.setState({markers: allMarkers, map: map, infowindow: buildInfowindow});

    document.getElementById('show-listings').addEventListener('click', this.showListings);
    document.getElementById('hide-listings').addEventListener('click', this.hideListings);
  }

  render() {
    return (
      <main>
        <div className="container">
          <div className="options-box">
            <h1>Find Rock Bars Near New York!</h1>
              <div>
                <input id="show-listings" type="button" value="Show Listings" onClick={this.showMarkers}/>
                <input id="hide-listings" type="button" value="Hide Listings" onClick={this.hideMarkers} />
              </div>
              <select onChange={e => this.dropdownSelected(e.target.value)}>
                <option value="" />
                {this.state.markers.map(bars =>
                  <option key={bars.id}>
                  {bars.title}
                  </option>
                  )}
              </select>
              </div>
            <div id="map"></div>
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
}

export default App;
