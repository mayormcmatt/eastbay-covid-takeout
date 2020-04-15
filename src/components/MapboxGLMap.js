import React, { Component, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import locationData from '../data/East_Bay_Restaurants_Guide_Takeout.json'

mapboxgl.accessToken = 'pk.eyJ1IjoibWF5b3JtY21hdHQiLCJhIjoiY2s5MDgzcTZ3MjB3YzNpcHJzanljMGNicyJ9.8hQc0WzOgTwFTwzv2AZUTw';

class MapboxGLMap extends Component {
  state = {
    mapState: {
      lng: -122.25,
      lat: 37.8,
      zoom: 11.5
    },
    pointsData: {}
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
            'title': el.name,
            'icon': 'restaurant'
          }
        })
      });

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
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        }
      });
    });

    // const popup = new mapboxgl.Popup({ closeOnClick: false })
    //   .setLngLat([-122.25, 37.8])
    //   .setHTML('<h1>Hello World!</h1>')
    //   .addTo(map);
  }

  render() {
    return (
      <div>
        <div ref={el => this.mapContainer = el} className='mapContainer' />
      </div>
    )
  }
}

export default MapboxGLMap;
