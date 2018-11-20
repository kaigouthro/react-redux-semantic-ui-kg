// Modified from https://codesandbox.io/s/5z18q98on
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Headroom from 'react-headroom';

import {
  Icon, Image, Menu, Sidebar, Responsive
} from 'semantic-ui-react';

const NavBarMobile = props => (
  <Sidebar.Pushable>
    <Sidebar as={Menu} animation="scale down" inverted visible={props.visible} style={{ height: '100vmax' }}>
      <Icon className={props.styles.closeIt} name="close" size="large" onClick={props.onToggle} />
      <Menu vertical inverted fluid>
        <Menu.Item>
          <Image as={Link} to="/" size="mini" src="https://react.semantic-ui.com/logo.png" onClick={props.onToggle} />
        </Menu.Item>
        {_.map(props.leftItems, item => (
          <Menu.Item as={Link} to={item.to} key={item.key} onClick={props.onToggle}>
            {item.content}
          </Menu.Item>
        ))}
      </Menu>
    </Sidebar>
    <Sidebar.Pusher dimmed={props.visible} onClick={props.onPusherClick} style={{ minHeight: '100vh' }}>
      <Responsive minWidth={769}>
        <NavBarDesktop leftItems={props.leftItems} rightItems={props.rightItems} />
      </Responsive>
      <Responsive maxWidth={768}>
        <Menu fixed="top" inverted>
          <Menu.Item onClick={props.onToggle}>
            <Icon name="sidebar" />
          </Menu.Item>
          <Menu.Item>
            <Image as={Link} to="/" size="mini" src="https://react.semantic-ui.com/logo.png" />
          </Menu.Item>
          <Menu.Menu position="right">
            {_.map(props.rightItems, item => (
              <Menu.Item as={Link} to={item.to} key={item.key}>
                {item.content}
              </Menu.Item>
            ))}
          </Menu.Menu>
        </Menu>
      </Responsive>
      {props.children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

NavBarMobile.propTypes = {
  children: PropTypes.node.isRequired,
  leftItems: PropTypes.arrayOf(PropTypes.object),
  onPusherClick: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  rightItems: PropTypes.arrayOf(PropTypes.object),
  visible: PropTypes.bool,
  styles: PropTypes.objectOf(PropTypes.any),
};

NavBarMobile.defaultProps = {
  leftItems: [],
  rightItems: [],
  visible: false,
  styles: {},
};

const NavBarDesktop = ({ leftItems, rightItems }) => (
  <Menu inverted>
    <Menu.Item>
      <Image as={Link} to="/" size="mini" src="https://react.semantic-ui.com/logo.png" />
    </Menu.Item>
    {_.map(leftItems, item => (
      <Menu.Item as={Link} to={item.to} key={item.key}>
        {item.content}
      </Menu.Item>
    ))}
    <Menu.Menu position="right">
      {_.map(rightItems, item => (
        <Menu.Item as={Link} to={item.to} key={item.key}>
          {item.content}
        </Menu.Item>
      ))}
    </Menu.Menu>
  </Menu>
);

NavBarDesktop.propTypes = {
  leftItems: PropTypes.arrayOf(PropTypes.object),
  rightItems: PropTypes.arrayOf(PropTypes.object),
};

NavBarDesktop.defaultProps = {
  leftItems: [],
  rightItems: [],
};

const NavBarChildren = ({ children }) => <div style={{ margin: '2em 0em' }}>{children}</div>;

NavBarChildren.propTypes = {
  children: PropTypes.node.isRequired,
};

export default class Navigation extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    leftItems: PropTypes.arrayOf(PropTypes.any).isRequired,
    rightItems: PropTypes.arrayOf(PropTypes.any).isRequired,
    mobileOnly: PropTypes.bool,
  };

  static defaultProps = {
    mobileOnly: true,
  };

  state = {
    visible: false,
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  // using this.setState({visible: !this.state.visible} is bad
  // because if you click toggle more than twice in the same cycle
  // react may do the batch update, and only one being executed, and you will see the toggle failed
  // ref: https://reactjs.org/docs/react-component.html#setstate

  handleToggle = () => {
    this.setState(state => ({ visible: !state.visible }));
  };

  render() {
    const {
      children, leftItems, rightItems, mobileOnly
    } = this.props;
    const { visible } = this.state;
    const styles = require('./Navigation.scss');

    return (
      <div style={{ minHeight: '100vh' }}>
        {mobileOnly && (
          <NavBarMobile
            leftItems={leftItems}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            rightItems={rightItems}
            visible={visible}
            styles={styles}
          >
            <NavBarChildren>{children}</NavBarChildren>
          </NavBarMobile>
        )}
        {!mobileOnly && (
          <Responsive {...Responsive.onlyMobile}>
            <NavBarMobile
              leftItems={leftItems}
              onPusherClick={this.handlePusher}
              onToggle={this.handleToggle}
              rightItems={rightItems}
              visible={visible}
              styles={styles}
            />
            <NavBarChildren>{children}</NavBarChildren>
          </Responsive>
        )}
        {!mobileOnly && (
          <Responsive maxWidth={Responsive.tabletOnly.maxwidth}>
            <div>
              <Headroom>
                <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
              </Headroom>
              <NavBarChildren>{children}</NavBarChildren>
            </div>
          </Responsive>

        )}
      </div>
    );
  }
}
