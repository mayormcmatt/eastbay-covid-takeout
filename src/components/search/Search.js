import React, { Component } from 'react';

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

export default Search;