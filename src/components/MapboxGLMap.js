import React, { Component, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import locationData from '../data/East_Bay_Restaurants_Guide_Takeout.json'
import Sidebar from '../components/Sidebar.js';

mapboxgl.accessToken = 'pk.eyJ1IjoibWF5b3JtY21hdHQiLCJhIjoiY2s5MDgzcTZ3MjB3YzNpcHJzanljMGNicyJ9.8hQc0WzOgTwFTwzv2AZUTw';

class MapboxGLMap extends Component {
  state = {
    mapState: {
      lng: -122.25,
      lat: 37.8,
      zoom: 13
    },
    pointsData: []
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.mapState.lng, this.state.mapState.lat],
      zoom: this.state.mapState.zoom
    });

    const provideDataPoints = () => {
      let allLocations = {
        'type': 'FeatureCollection',
        'features': []
      };

      locationData.map((el, i) => {
        allLocations.features.push({
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [el.long, el.lat]
          },
          'properties': {
            'info':
              `<strong>${el.name}</strong>
              <p><strong>Cuisine:</strong> ${el.cuisine}</p>
              <p>${el.takout_option}</p>
              <p><strong>Address:</strong> ${el.street} ${el.city}</p>
              <p><strong>Phone:</strong> ${el.phone}</p>
              <p><a href=${el.website} target=_blank>${el.website}</a></p>`,
            'name': el.name,
            'cuisine': el.cuisine,
            'website': el.website,
            'icon': 'restaurant'
          }
        })
      });
      this.setState({pointsData: allLocations.features});
      return allLocations;
    }

    map.on('load', function () {
      provideDataPoints();
      map.addSource('points', {
        'type': 'geojson',
        'data': provideDataPoints()
      });

      map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'points',
        'layout': {
          // get the icon name from the source's "icon" property
          // concatenate the name to get an icon from the style's sprite sheet
          'icon-image': ['concat', ['get', 'icon'], '-15'],
          // get the title name from the source's "title" property
          // 'text-field': ['get', 'title'],
          'icon-allow-overlap': true,
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        }
      });

      map.on('click', 'points', function (e) {
        let coordinates = e.features[0].geometry.coordinates.slice();
        let info = e.features[0].properties.info;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(info)
          .addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on('mouseenter', 'points', function () {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'points', function () {
        map.getCanvas().style.cursor = '';
      });
    });

    // const popup = new mapboxgl.Popup({ closeOnClick: false })
    //   .setLngLat([-122.25, 37.8])
    //   .setHTML('<h1>Hello World!</h1>')
    //   .addTo(map);
  }

  render() {
    return (
      <div className="map-sidebar-container">
        <div ref={el => this.mapContainer = el} className='mapContainer' />
        <Sidebar data={this.state.pointsData}/>
      </div>
    )
  }
}

export default MapboxGLMap;
