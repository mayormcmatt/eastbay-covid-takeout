import React, { Component } from 'react';

class Takeout extends Component {
  render() {
    if (this.props.data) {
      const { properties } = this.props.data;
      const id = properties.id;
      return (
        <div className="takeout" id={id} onClick={this.props.sideBarItemClickHandler.bind(this, id)}>
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

class TakeoutList extends Component {
  render() {
    if (this.props.data) {
      return (
        <div className="takeout-list">
          {this.props.data.map((takeout, i) => (
          <Takeout key={i} data={takeout} sideBarItemClickHandler={this.props.sideBarItemClickHandler} />
        ))}
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default TakeoutList;