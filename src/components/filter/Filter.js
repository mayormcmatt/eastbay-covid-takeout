import React, { Component } from 'react';
import DropdownItems from './DropdownItems';

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

export default Filter;