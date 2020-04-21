import React, { Component } from 'react';
import TakeoutList from '../components/TakeoutList.js';

class Search extends Component {
  render() {
    return (
      <div className="search">
        <div className="temp">Search by restaurant name</div>
      </div>
    )
  }
}

class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <div className="temp">Filter by cuisine (dropdown)</div>
      </div>
    )
  }
}

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar-container">
        <div className="search-filter-container">
          <Search />
          <Filter />
        </div>
        <TakeoutList data={this.props.data} sideBarItemClickHandler={this.props.sideBarItemClickHandler}/>
      </div>
    )
  }
}

export default Sidebar;
