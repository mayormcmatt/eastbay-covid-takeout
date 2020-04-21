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

class DropdownItems extends Component {
  // On click, take value of dropdown item
  // Send that up to App and/or trigger function
  // Filter pointsData in App based on value
  render() {
    return (
      <ul>
        {this.props.dropdownitems.map((item, i) => {
          return (
            <li key={i}>{item}</li>
          )
        })}
      </ul>
    )
  }
}

class Filter extends Component {
  render() {
    // console.log(this.props.dropdownitems, 'inside Filter')
    return (
      <div className="filter">
        <div dropdownitems={this.props.dropdownitems} className="temp">
          <div>
            <DropdownItems dropdownitems={this.props.dropdownitems} />
          </div>
        </div>
      </div>
    )
  }
}

class Sidebar extends Component {
  render() {
    // console.log(this.props.data, 'Inside Sidebar')
    return (
      <div className="sidebar-container">
        <div className="search-filter-container">
          <Search />
          <Filter dropdownitems={this.props.dropdownitems} />
        </div>
        <TakeoutList data={this.props.data} sideBarItemClickHandler={this.props.sideBarItemClickHandler}/>
      </div>
    )
  }
}

export default Sidebar;
