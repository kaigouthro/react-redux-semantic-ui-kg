import { InfoBar, Notifs } from 'components';
import config from 'config';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { push } from 'react-router-redux';
import { provideHooks } from 'redial';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import {
  Container, Divider, Message, Segment
} from 'semantic-ui-react';
import './layout.less';

import Navigation from '../../components/Navigation/Navigation';

@provideHooks({
  fetch: async ({ store: { dispatch, getState } }) => {
    if (!isAuthLoaded(getState())) {
      await dispatch(loadAuth()).catch(() => null);
    }
    if (!isInfoLoaded(getState())) {
      await dispatch(loadInfo()).catch(() => null);
    }
  },
})
@connect(
  state => ({
    notifs: state.notifs,
    user: state.auth.user,
  }),
  { logout, pushState: push }
)
@withRouter
class App extends Component {
  static propTypes = {
    route: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    user: PropTypes.shape({
      email: PropTypes.string,
    }),
    notifs: PropTypes.shape({
      global: PropTypes.array,
    }).isRequired,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
  };

  static contextTypes = {
    store: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  static defaultProps = {
    user: null,
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      const redirect = this.props.location.query && this.props.location.query.redirect;
      this.props.pushState(redirect || '/login-success');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const { user, notifs, route } = this.props;
    const styles = require('./App.scss');

    let leftItems = [
      {
        as: 'Link',
        content: 'Chat',
        key: 'chat',
        to: '/chat',
      },
      {
        as: 'Link',
        content: 'Chat with Feathers',
        key: 'chat-with-feathers',
        to: '/chat-with-feathers',
      },
      {
        as: 'Link',
        content: 'Widget',
        key: 'widget',
        to: '/widgets',
      },
      {
        as: 'Link',
        content: 'Survey',
        key: 'survey',
        to: '/survey',
      },
      {
        as: 'Link',
        content: 'About',
        key: 'about',
        to: '/about',
      },
      {
        as: 'Link',
        content: 'Template',
        key: 'template',
        to: '/template',
      },
    ];

    if (!user) {
      leftItems = leftItems.filter(item => item.key !== 'chat-with-feathers');
    }

    const rightItems = !user
      ? [
        {
          as: 'Link',
          content: 'Login',
          key: 'login',
          to: '/login',
        },
        {
          as: 'Link',
          content: 'Register',
          key: 'register',
          to: '/register',
        },
      ]
      : [
        {
          as: 'Link',
          content: 'Logout',
          key: 'logout',
          to: '/logout',
        },
      ];

    return (
      <div id="container">
        <Navigation leftItems={leftItems} rightItems={rightItems} mobileOnly>
          <Helmet {...config.app.head} />
          <div id="body">
            <Divider hidden />
            <Segment vertical>
              <Container>
                {notifs.global && (
                  <Notifs
                    className={styles.notifs}
                    namespace="global"
                    NotifComponent={props => <Message warning>{props.message}</Message>}
                  />
                )}
                {renderRoutes(route.routes)}
                <InfoBar />
              </Container>
            </Segment>
          </div>
          <div id="footer">
            <Segment vertical style={{ textAlign: 'center' }}>
              <p>
                Have questions? Ask for help
                {' '}
                <a
                  href="https://github.com/kaigouthro/react-redux-semantic-ui/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  on Github.
                </a>
                  .
              </p>
            </Segment>
          </div>
        </Navigation>
      </div>
    );
  }
}

export default App;
