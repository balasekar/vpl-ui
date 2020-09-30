import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './header.less';

export default class Header extends Component {
    state = { activeItem: 'home' };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render () {
      const { activeItem } = this.state;

      return (
        <Menu fixed="top" size="huge" inverted>
          <Menu.Item
            header
            name="Vehicles Manager"
            active={activeItem === 'Home'}
            as={Link}
            to="/"
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Vehicles"
            active={activeItem === 'Models'}
            as={Link}
            to="/vehicles"
            onClick={this.handleItemClick}
          />
        </Menu>

      );
    }
}
