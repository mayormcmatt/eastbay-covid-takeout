import React, { Component } from 'react';
import { connect } from 'react-redux';

class DropdownItems extends Component {
  showMenu = () => {
    const doesShow = this.props.menuViz;
    this.props.menuViz ?
        this.props.showMenu(!doesShow, 'show-cuisines') :
        this.props.showMenu(!doesShow, '');
  }

  // On click, take value of dropdown item
  // Send that up to App and/or trigger function
  // Filter pointsData in App based on value
  render() {
    return (
      <div className="description" onClick={this.showMenu}>
        {this.props.cuisine}
        <ul className={`dropdown-list ${this.props.showCuisines}`}>
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
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    menuViz: state.menuViz,
    showCuisines: state.showCuisines
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showMenu: (toggleMenu, show) => dispatch({
      type: 'SHOWCUISINEDROPDOWN',
      payload: {toggleMenu, show}
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (DropdownItems);