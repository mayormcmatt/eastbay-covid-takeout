import React, { Component } from 'react';
import { connect } from 'react-redux';
import TakeoutListItem from '../components/TakeoutListItem.js';

class TakeoutList extends Component {
  render() {
    if (this.props.pointsData) {
      return (
        <div className="takeout-list">
          {this.props.pointsData.map((takeout, i) => (
          <TakeoutListItem data={takeout} key={i} />
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

const mapStateToProps = state => {
  return {
    pointsData: state.pointsData,
  };
};

export default connect(mapStateToProps) (TakeoutList);