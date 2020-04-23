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
  constructor() {
    super();

    this.state = {
      menuViz: false
    }
  }

  showMenu = () => {
    const doesShow = this.state.menuViz;
    this.setState({menuViz: !doesShow});
  }

  // On click, take value of dropdown item
  // Send that up to App and/or trigger function
  // Filter pointsData in App based on value
  render() {
    return (
      <div onClick={this.showMenu}>
        {this.state.menuViz ? (
          <ul className="dropdown-list">
            {this.props.dropdownitems.map((item, i) => {
              return (
                <li
                  className="dropdown-list__item"
                  key={i}
                  onClick={this.props.dropdownHandler.bind(this, item)}
                >{item}</li>
              )
            })}
          </ul>
        ): (null)}
      </div>
    )
  }
}

class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <div className="dropdown-container">
          <DropdownItems
            dropdownitems={this.props.dropdownitems}
            dropdownHandler={this.props.dropdownHandler}
          />
        </div>
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

          <Filter
            dropdownitems={this.props.dropdownitems}
            dropdownHandler={this.props.dropdownHandler}
          />
        </div>

        <TakeoutList
          data={this.props.data}
          sideBarItemClickHandler={this.props.sideBarItemClickHandler}/>
      </div>
    )
  }
}

export default Sidebar;
