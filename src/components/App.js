import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';

import locationData from '../data/East_Bay_Restaurants_Guide_Takeout.json'
import Sidebar from '../components/Sidebar.js';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWF5b3JtY21hdHQiLCJhIjoiY2s5MDgzcTZ3MjB3YzNpcHJzanljMGNicyJ9.8hQc0WzOgTwFTwzv2AZUTw';
// TODO: Figure out how to use ENV variables to protect the Mapbox key
// mapboxgl.accessToken = 'process.env.REACT_APP_MAPBOX_KEY';

const setMarker = (c, i, m) => {
  const marker = new mapboxgl.Marker()
  .setLngLat(c)
  .setPopup(new mapboxgl.Popup({ offset: 25 })
    .setHTML(i)
    .setMaxWidth('320px'))
  .addTo(m);

  return marker;
}

class App extends Component {
  populateCuisineFilterDropdown = () => {
    let results = [];
    this.props.pointsData.forEach(e => {
      if(!results.includes(e.properties.cuisine)) {
        results.push(e.properties.cuisine)
      }
    });

    return this.props.setDropdownData(results);
  }

  clearPopups = () => {
    const popupIsPopped = document.querySelector('.mapboxgl-popup');
    if (popupIsPopped) {
      popupIsPopped.remove();
    }
  }

  clearMarkers = () => {
    const allMarkers = document.querySelectorAll('.mapboxgl-marker');
    allMarkers.forEach(e => { e.remove() });
  }

  displayMarkers = ( points, map ) => {
    points.forEach(e => {
      const coordinates = e.geometry.coordinates;
      const info = e.properties.info;
      setMarker(coordinates, info, map);
    });
  }

  updateFlyToView = (long, lat, zoom, map) => {
    const flyParams = {
      bearing: 0,
      center: [long, lat],
      zoom: zoom,
      speed: 0.7,
      pitch: 0
    }
    map.flyTo(flyParams);
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.props.mapState.lng, this.props.mapState.lat],
      zoom: this.props.mapState.zoom
    });

    this.props.storeMap(map);

    const provideDataPoints = () => {
      let allLocations = {
        'type': 'FeatureCollection',
        'features': []
      };

      locationData.map((el, i) => {
        return allLocations.features.push({
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [el.long, el.lat]
          },
          'properties': {
            'info':
              `<h2>${el.name}</h2>
              <p>${el.takeout_option}</p>
              <p><strong>Cuisine:</strong> ${el.cuisine}</strong></p>
              <p><strong>Address:</strong> ${el.street} ${el.city}</p>
              <p><strong>Phone:</strong> ${el.phone}</p>
              <a href=${el.website} target=_blank>${el.website}</a>`,
            'id': i,
            'name': el.name,
            'takeout_option': el.takeout_option,
            'cuisine': el.cuisine,
            'street': el.street,
            'city': el.city,
            'phone': el.phone,
            'website': el.website,
            'icon': 'restaurant'
          }
        })
      });

      this.props.setPointsData(
        allLocations.features,
        allLocations.features
      );
      this.populateCuisineFilterDropdown();
      this.displayMarkers( this.props.allPointsData, map);

      return allLocations;
    }

    map.on('load', function () {
      map.addSource('points', {
        'type': 'geojson',
        'data': provideDataPoints()
      });
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'points', function () {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'points', function () {
      map.getCanvas().style.cursor = '';
    });

    this.filterByCuisine = (cuisine) => {
      const searchValue = '';
      const results = this.props.allPointsData.filter(item => {
        return item.properties.cuisine === cuisine
      });

      this.props.updateCuisineFilter(results, searchValue, cuisine);

      this.clearPopups();
      this.clearMarkers();
      this.displayMarkers( results, map);
      this.updateFlyToView(-122.25, 37.84, 10.5, map);
    }

    this.clearFilterHandler = () => {
      const allPoints = this.props.allPointsData;
      this.props.clearFilters();
      this.clearPopups();
      this.clearMarkers();
      this.displayMarkers( allPoints, map);
      this.updateFlyToView(-122.25, 37.84, 10.5, map);
    }

    this.searchHandler = (e) => {
      const searchInput = e.target.value.trim().toLowerCase();
      const results = this.props.allPointsData.filter(item => {
        return item.properties.name.toLowerCase().match(searchInput);
      });

      this.props.textSearch(results, e.target.value);
      this.clearPopups();
      this.clearMarkers();
      this.displayMarkers( results, map);
      this.updateFlyToView(-122.25, 37.84, 10.5, map);
    }
  }

  render() {
    return (
      <div className="map-sidebar-container">
        <div ref={el => this.mapContainer = el} className='mapContainer' />

        <Sidebar
          cuisine={this.props.cuisineApp}
          data={this.props.pointsData}
          dropdownitems={this.props.dropdownItems}
          sideBarItemClickHandler={this.sideBarItemClickHandler}
          dropdownHandler={this.filterByCuisine}
          clearFilterHandler={this.clearFilterHandler}
          searchValue={this.props.searchValue}
          searchHandler={this.searchHandler}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    mapState: state.mapState,
    pointsData: state.pointsData,
    allPointsData: state.allPointsData,
    dropdownItems: state.dropdownItems,
    cuisineApp: state.cuisineApp,
    searchValue: state.searchValue,
    map: state.map
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeMap: (map) => dispatch({
      type: 'GETMAP',
      payload: map
    }),
    setPointsData: (points, allPoints) => dispatch({
      type: 'SETPOINTS',
      payload: {points, allPoints}
    }),
    setDropdownData: (cuisines) => dispatch({
      type: 'SETDROPDOWNCUISINES',
      payload: cuisines
    }),
    textSearch: (points, value) => dispatch({
      type: 'TEXTSEARCH',
      payload: {points, value}
    }),
    updateCuisineFilter: (points, value, cuisine) => dispatch ({
      type: 'UPDATECUISINEFILTER',
      payload: {points, value, cuisine}
    }),
    clearFilters: () => dispatch({
      type: 'CLEARFILTERS'
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);