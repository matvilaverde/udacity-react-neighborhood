import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAOFG5MfWrnTNAlxiYoko5BOd6s5RTHrhY&callback=initMap')
    window.initMap = this.initMap
  }

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    })
  }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    );
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName('script')[0]; // Selects first script tag
  var script = window.document.createElement('script'); // Creates script tag
  script.src = url;
  script.async = true; // Inserts the async property
  script.defer = true; // Inserts the defer property
  index.parentNode.insertBefore(script, index); // Keeps script at the very beggining
}

export default App;
