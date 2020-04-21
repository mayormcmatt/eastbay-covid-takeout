import React, { Component } from 'react';
import TakeoutList from '../components/TakeoutList.js';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchByName: ''
    }
  }

  searchHandler = (e) => {
    this.setState({searchByName: e.target.value});
  }

  render() {
    return (
      <div className="search">
        <input 
          type="text"
          value={this.state.searchByName}
          placeholder="Search by restaurant name"
          onChange={this.searchHandler}
        ></input>
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
          <Filter thingHandler={this.props.thingHandler} />
        </div>
        <TakeoutList data={this.props.data} sideBarItemClickHandler={this.props.sideBarItemClickHandler}/>
      </div>
    )
  }
}

export default Sidebar;
