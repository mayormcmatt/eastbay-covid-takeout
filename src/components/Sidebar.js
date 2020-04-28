import React, { Component } from 'react';
import TakeoutList from '../components/TakeoutList.js';

class Search extends Component {
  render() {
    return (
      <div className="search">
        <input
          type="text"
          value={this.props.searchValue}
          placeholder="Search By Restaurant Name"
          onChange={(e)=>this.props.searchHandler(e)}
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
      <div className="description" onClick={this.showMenu}>
        {this.props.cuisine}
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
            cuisine={this.props.cuisine}
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
          <div className="clear-filter"
            onClick={this.props.clearFilterHandler}>CLEAR</div>

          <Search
            searchValue={this.props.searchValue}
            searchHandler={this.props.searchHandler}/>
          <Filter
            cuisine={this.props.cuisine}
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
