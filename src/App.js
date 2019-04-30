import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    map: {},
    markers: [],
    infowindow: {}
  }

  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAOFG5MfWrnTNAlxiYoko5BOd6s5RTHrhY&callback=initMap')
    window.initMap = this.initMap
  }

  showListings = () => {
    for(var i=0; i<this.state.markers.length; i++) {
      this.state.markers[i].setMap(this.state.map);
    }
  }

  hideListings = () => {
    for(var i=0; i<this.state.markers.length; i++) {
      this.state.markers[i].setMap(null);
    }
  }

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
  
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center:{lat: -19.9408184, lng: -43.9355109},
      zoom: 16,
      mapTypeControl: false,
      fullscreenControle: false,
      styles:[{"featureType":"all","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"},{"saturation":"-100"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40},{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"lightness":21}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#7f8d89"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#2b3638"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2b3638"},{"lightness":17}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.icon","stylers":[{"visibility":"off"}]}],
    })
    
    let buildInfowindow = new window.google.maps.InfoWindow();
    
    let bounds = new window.google.maps.LatLngBounds();
    
    let buildMarkers = [];
    
    for(let i=0; i<this.locations.length; i++) {
      let lat = this.locations[i].position.lat
      let lng = this.locations[i].position.lng
      let position = {lat, lng}
      let title = this.locations[i].title

      let marker = new window.google.maps.Marker({
        id: i,
        map: map,
        position: position,
        name: title,
        title: title,
        lat: lat,
        lng: lng,
        animation: window.google.maps.Animation.DROP,
      })

      buildMarkers.push(marker);

      let contentString = `${this.locations[i].title}`

      marker.addListener('click', function() {
        buildInfowindow.setContent(contentString)
        buildInfowindow.open(map, marker)
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
        marker.setAnimation(null)
      })
      
      bounds.extend(marker.position);
      map.fitBounds(bounds);
    }

    this.setState({markers: buildMarkers, map: map, infowindow: buildInfowindow});
        
    document.getElementById('show-listings').addEventListener('click', this.showListings);
    document.getElementById('hide-listings').addEventListener('click', this.hideListings);
  }

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

function loadScript(url) {
  var index = window.document.getElementsByTagName('script')[0]; // Selects first script tag
  var script = window.document.createElement('script'); // Creates script tag
  script.src = url; // Inserts the source property using the argument
  script.async = true; // Inserts the async property
  script.defer = true; // Inserts the defer property
  index.parentNode.insertBefore(script, index); // Keeps script at the very beggining
}

export default App;
