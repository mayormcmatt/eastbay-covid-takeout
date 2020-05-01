import React, { Component } from 'react';

import Filter from '../filter/Filter';
import Search from '../search/Search';
import TakeoutList from '../takeout-list/TakeoutList';

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar-container">
        <div className="search-filter-container">
          <div
            className="clear-filter"
            onClick={this.props.clearFilterHandler}>
              CLEAR
          </div>

          <Search
            searchValue={this.props.searchValue}
            searchHandler={this.props.searchHandler}
          />

          <Filter
            cuisine={this.props.cuisine}
            dropdownitems={this.props.dropdownitems}
            dropdownHandler={this.props.dropdownHandler}
          />
        </div>

        <TakeoutList />
      </div>
    )
  }
}

export default Sidebar;
