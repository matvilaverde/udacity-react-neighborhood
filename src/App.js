import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    map: {},
    markers: [],
    infowindow: {},
    venues: []
  }

  CLIENT_ID = 'JMMI3TQMXGFIN3ZYY5NN4SEGLG0QD31ZRSOUAWUT0FU2KCUF'
  CLIENT_SECRET = 'WQNXVXEP4VIACTXQQ4PLYJIRR4EYKZRYHXF0VNS3IWTQBODW'
  api = "https://api.foursquare.com/v2/venues/search?"
  query = '%22rock%20bar%22';
  near = 'Belo Horizonte, MG, Brazil';
  todaysData = '20190430'

  componentDidMount() {
    fetch(this.api + 'query=' + this.query + '&near=' + this.near + '&client_id=' + this.CLIENT_ID +
    '&client_secret=' + this.CLIENT_SECRET + '&v=' + this.todaysData)
     .then(res => res.json())
     .then(data => {
       this.setState({venues: data.response.venues})
       this.renderMap(); // Begins the map render
      })
    .catch( error => {
        window.alert('An error ocorred: ' + error)
        console.log(error);
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
  dropdownSelected = (option) => {
    let markers = this.state.markers;
    this.state.infowindow.close();
    markers.forEach((marker) => {
      if(marker.title === option) {
        this.state.infowindow.setContent(option)
        this.state.infowindow.open(this.state.map, marker)
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
      }
      marker.setAnimation(null)
    })
  }
  
  // The map!
  initMap = () => {
    // Creates the map at a point of Belo Horizonte, Brazil
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center:{lat: -19.9408184, lng: -43.9355109},
      zoom: 16,
      mapTypeControl: false,
      fullscreenControle: false,
      styles:[{"featureType":"all","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"},{"saturation":"-100"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40},{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"lightness":21}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#7f8d89"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#2b3638"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2b3638"},{"lightness":17}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.icon","stylers":[{"visibility":"off"}]}],
    })
    
    let buildInfowindow = new window.google.maps.InfoWindow();
    
    let bounds = new window.google.maps.LatLngBounds();
    
    let buildMarkers = this.state.venues;

    let allMarkers = this.state.markers;
    
    // Gets API data and inserts in a bunch of markers, creating them
    for(let i=0; i<buildMarkers.length; i++) {
      let position = {lat: buildMarkers[i].location.lat, lng: buildMarkers[i].location.lng};
      let name = buildMarkers[i].name;
      let address = buildMarkers[i].location.address;
      let lat = buildMarkers[i].location.lat;
      let lng = buildMarkers[i].location.lng;

      let marker = new window.google.maps.Marker({
        id: i,
        map: map,
        position: position,
        name: name,
        title: name,
        address: address,
        lat: lat,
        lng: lng,
        animation: window.google.maps.Animation.DROP
      })

      // All markers will be organized here
      allMarkers.push(marker);

      // Simple content just for the project beggining
      let contentString = `${buildMarkers[i].name}`

      // When a marker gets clicked ..
      marker.addListener('click', function() {
        buildInfowindow.setContent(
          '<div><p style="color:#FFAA22">' +
            contentString +
          "</p></div>"
        )
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
    // Stores all map data globally
    this.setState({markers: allMarkers, map: map, infowindow: buildInfowindow});

    document.getElementById('show-listings').addEventListener('click', this.showListings);
    document.getElementById('hide-listings').addEventListener('click', this.hideListings);
  }

  // This will be (not yet) used to local data, maybe
  locations = [
  {
    title: 'Jack Rock Bar',
    position: {lat: -19.9397354, lng: -43.9318726}
  }, {
    title: 'Lord Pub',
    position: {lat: -19.9402615, lng: -43.9365341}
  }, {
    title: 'Estágio Rock Bar',
    position: {lat: -19.941599, lng: -43.937418}
  }, {
    title: 'Beb\'s Contorno',
    position: {lat: -19.9407569, lng: -43.9363852}
  }, {
    title: 'Rock Esporte Clube',
    position: {lat: -19.9403498, lng: -43.9380091}
  }
  ]

  render() {
    return (
      <main>
        <div className="container">
          <div className="options-box">
            <h1>Find Rock Bars Near You!</h1>
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
