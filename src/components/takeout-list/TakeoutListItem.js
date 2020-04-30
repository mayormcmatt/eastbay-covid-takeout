import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';

const setPopup = (c, i, m) => {
  const popup = new mapboxgl.Popup({ offset: 25 })
  .setLngLat(c)
  .setHTML(i)
  .setMaxWidth('320px')
  .addTo(m);

  return popup;
}

class TakeoutListItem extends Component {
  clearPopups = () => {
    const popupIsPopped = document.querySelector('.mapboxgl-popup');
    if (popupIsPopped) {
      popupIsPopped.remove();
    }
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

  sideBarItemClickHandler = (id) => {
    const currentLat = parseFloat(this.props.allPointsData[id].geometry.coordinates[1]);
    const currentLng = parseFloat(this.props.allPointsData[id].geometry.coordinates[0]);
    const coordinates = this.props.allPointsData[id].geometry.coordinates;
    const currentRestaurantInfo = this.props.allPointsData[id].properties.info;

    this.clearPopups();
    this.updateFlyToView(currentLng, currentLat, 14, this.props.map);
    setPopup(coordinates, currentRestaurantInfo, this.props.map);
  }

  render() {
    if (this.props.data) {
      const { properties } = this.props.data;
      const id = properties.id;
      return (
        <div className="takeout" id={id} onClick={this.sideBarItemClickHandler.bind(this, id)}>
          <h3>{properties.name}</h3>
          <p>{properties.takeout_option}</p>
          <p><strong>Cuisine: </strong>{properties.cuisine}</p>
          <p><strong>Address: </strong>{properties.street}, {properties.city}</p>
          <p><strong>Phone: </strong>{properties.phone}</p>
          <a href={properties.website} target="_blank" rel="noopener noreferrer"> {properties.website}</a>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    allPointsData: state.allPointsData,
    map: state.map
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPointsData: (points, allPoints) => dispatch({
      type: 'SETPOINTS',
      payload: {points, allPoints}
    }),
    clearFilters: () => dispatch({
      type: 'CLEARFILTERS'
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (TakeoutListItem);