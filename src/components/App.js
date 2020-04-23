import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import locationData from '../data/East_Bay_Restaurants_Guide_Takeout.json'
import Sidebar from '../components/Sidebar.js';

mapboxgl.accessToken = 'pk.eyJ1IjoibWF5b3JtY21hdHQiLCJhIjoiY2s5MDgzcTZ3MjB3YzNpcHJzanljMGNicyJ9.8hQc0WzOgTwFTwzv2AZUTw';
// TODO: Figure out how to use ENV variables to protect the Mapbox key
// mapboxgl.accessToken = 'process.env.REACT_APP_MAPBOX_KEY';

const setPopup = (c, i, m) => {
  const popup = new mapboxgl.Popup()
  .setLngLat(c)
  .setHTML(i)
  .setMaxWidth('320px')
  .addTo(m);

  return popup;
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapState: {
        lng: -122.25,
        lat: 37.8,
        zoom: 13
      },
      pointsData: [],
      allPointsData: [],
      dropdownItems: [],
      cuisineApp: 'Search By Cuisine'
    }

    this.populateCuisineFilterDropdown = () => {
      let results = [];
      this.state.pointsData.forEach(e => {
        if(!results.includes(e.properties.cuisine)) {
          results.push(e.properties.cuisine)
        }
      });

      return this.setState({dropdownItems: results})
    }

    this.filterByCuisine = (cuisine) => {
      const results = this.state.allPointsData.filter(item => {
        return item.properties.cuisine === cuisine
      });

      this.setState({
        pointsData: results,
        cuisineApp: cuisine
      })
    }

    this.clearFilterHandler = () => {
      const allPoints = this.state.allPointsData;
      this.setState({pointsData: allPoints});
      this.setState({cuisineApp: 'Search By Cuisine'});
    }
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

      this.setState({
        pointsData: allLocations.features,
        allPointsData: allLocations.features
      });
      this.populateCuisineFilterDropdown();
      return allLocations;
    }

    this.sideBarItemClickHandler = (id) => {
      const currentLat = parseFloat(this.state.allPointsData[id].geometry.coordinates[1]);
      const currentLng = parseFloat(this.state.allPointsData[id].geometry.coordinates[0]);
      const coordinates = this.state.allPointsData[id].geometry.coordinates;
      const currentRestaurantInfo = this.state.allPointsData[id].properties.info;
      const popupIsPopped = document.querySelector('.mapboxgl-popup');
      const flyParams = {
        bearing: 0,
        center: [currentLng, currentLat],
        zoom: 14,
        speed: 0.7,
        pitch: 0
      }

      if (popupIsPopped) {
        popupIsPopped.remove();
      }

      map.flyTo(flyParams);
      setPopup(coordinates, currentRestaurantInfo, map);
    }

    map.on('load', function () {
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
          'icon-size': 1.2,
          'icon-allow-overlap': true,
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        }
      });
    });

    map.on('click', 'points', function (e) {
      let coordinates = e.features[0].geometry.coordinates.slice();
      let info = e.features[0].properties.info;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      setPopup(coordinates, info, map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'points', function () {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'points', function () {
      map.getCanvas().style.cursor = '';
    });
  }

  render() {
    return (
      <div className="map-sidebar-container">
        <div ref={el => this.mapContainer = el} className='mapContainer' />

        <Sidebar
          cuisine={this.state.cuisineApp}
          data={this.state.pointsData}
          dropdownitems={this.state.dropdownItems}
          sideBarItemClickHandler={this.sideBarItemClickHandler}
          dropdownHandler={this.filterByCuisine}
          clearFilterHandler={this.clearFilterHandler}/>
      </div>
    )
  }
}

export default App;
