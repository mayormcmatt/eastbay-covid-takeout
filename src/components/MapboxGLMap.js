import React, { Component, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWF5b3JtY21hdHQiLCJhIjoiY2s5MDgzcTZ3MjB3YzNpcHJzanljMGNicyJ9.8hQc0WzOgTwFTwzv2AZUTw';

class MapboxGLMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -122.25,
      lat: 37.8,
      zoom: 11.5
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    map.on('load', function () {
      map.addSource('points', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [{
              // feature for Mapbox DC
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [-122.19758, 37.790509]
              },
              'properties': {
                'title': '1 Seafood & Chicken',
                'icon': 'fast-food'
              }
            },
            {
              // feature for Mapbox SF
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [-122.200176, 37.793668]
              },
              'properties': {
                'title': '4505 Burgers & BBQ MacArthur',
                'icon': 'fast-food'
              }
            }
          ]
        }
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
