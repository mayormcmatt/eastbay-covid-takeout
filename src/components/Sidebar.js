import React, { Component } from 'react';

class Takeout extends Component {
  render() {
    if (this.props.data) {
      const { properties } = this.props.data;
      return (
        <div className="takeout">
          <h3>{properties.name}</h3>
          <p><strong>Cuisine: </strong>{properties.cuisine}</p>
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
        this.props.data.map((takeout, i) => (
          <Takeout key={i} data={takeout} />
        ))
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <TakeoutList data={this.props.data} />
      </div>
    )
  }
}

export default Sidebar;
