import React, { Component } from 'react';

class DropdownItems extends Component {
  constructor() {
    super();

    this.state = {
      menuViz: false,
      show: ''
    }
  }

  animateMenu = () => {
    if (this.state.menuViz) {
      this.setState({show: 'show'});
    } else {
      this.setState({show: ''});
    }
  }

  showMenu = () => {
    const doesShow = this.state.menuViz;
    this.setState({menuViz: !doesShow});
    this.animateMenu();
  }

  // On click, take value of dropdown item
  // Send that up to App and/or trigger function
  // Filter pointsData in App based on value
  render() {
    return (
      <div className="description" onClick={this.showMenu}>
        {this.props.cuisine}
        <ul className={`dropdown-list ${this.state.show}`}>
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

export default DropdownItems;