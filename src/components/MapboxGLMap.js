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
