import { Notifs } from 'components';
import config from 'config';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { push } from 'react-router-redux';
import { provideHooks } from 'redial';
import {
  isLoaded as isAuthLoaded,
  load as loadAuth,
  logout,
} from 'redux/modules/auth';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { Container, Message, Segment, Sticky } from 'semantic-ui-react';
import Navigation from '../../components/Navigation/Navigation';
import InfoBar from '../../components/InfoBar/InfoBar';
import { withContext } from 'recompose';
import Headroom from 'react-headroom';

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
      const redirect =
        this.props.location.query && this.props.location.query.redirect;
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

  state = {};

  handleContextRef = contextRef => this.setState({ contextRef });

  render() {
    const { user, notifs, route } = this.props;
    const styles = require('./App.scss');
    const { contextRef } = this.state;

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

    // WHY does linter say there's no comma after the about link? it's RIGHT THERE!!... silly linter, so far, the project is getting linted in one way by the creators packaging, and it keeps saying things are wrong, but the react typescript formatter works perfectly for passing the travis CI builds. whatever other lint settings are running on server throw pages and pages and pages of errors locally on dev, but i run it through my filters and format,  let the server error itself away,  because the real tests (not the 4 year old ones in here) are passing what changes i'm making.just fine.. so i'm going to see if i can't adjust the testing methods built into the package to suit modern real world testing. also.. a lot of packages to update, and i'm sure a lot of breaking changes and rewrites.

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
      <iv style={{ minHeight: '50vmax' }} ref={this.handleContextRef}>
        <Helmet {...config.app.head} />
        <Navigation
          leftItems={leftItems}
          rightItems={rightItems}
          style={{ maxHeight: '90vh' }}>
          <div ref={this.handleContextRef}>
            {notifs.global && (
              <Notifs
                className={styles.notifs}
                namespace="global"
                NotifComponent={props => (
                  <Message warning>{props.message}</Message>
                )}
              />
            )}
            <Segment style={{ minHeight: '80vh' }}>
              <Container style={{ miinHeight: '50vh' }}>
                {renderRoutes(route.routes)}
                <InfoBar />
              </Container>
            </Segment>
            <Sticky context={contextRef}>
              <Segment textAlign="center" vertical inverted>
                <p>
                  Have questions? Ask for help{' '}
                  <a
                    href="https://github.com/dongcai/react-redux-semantic-ui/issues"
                    target="_blank"
                    rel="noopener noreferrer">
                    on Github.
                  </a>
                  .
                </p>
              </Segment>
            </Sticky>
          </div>
        </Navigation>
      </iv>
    );
  }
}

export default App;


// If ANYONE knowss how to get Sticky to ~actually~ work.. i'd be thrilled.  as is, i brought in outside plug called react-headroom forr the top nav.. but it's really really silly the way that  this was put together.. that for the pushout mennu from the side to come, all the children have to sit wiithin the navigation tags, which  ~COMBINE~ the top and the side into one envelope....  .................. SERIOUSLY????  this project is all around overwhelmingly awesome and functional.. ther'es a few things out of date, and it's very rude and opinionated about whitespacee and end of line invisible characters. something i've  yet to learn how to mass change.. but i will.. anyway... the whoole idea of putting the navigation as crammed  into one component as possible is just ridiculous.. it's going to take me weeks to pll it apart into components that can be manipulated, or i may completely write a new nav system and just keep this main app file, which is well done. but how the navigation was done is STUPID. something i would call WORST PRACTICES. react is ALL about components and small modulesand branching out to trees with redux.. and yet the nav was put as much as possible and, in fact, the entire navigation system is in one file.....  and the footer won't float with semantic-ui-react. </facepalm>
