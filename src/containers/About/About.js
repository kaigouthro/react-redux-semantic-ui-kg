import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { Button, Link, Segment } from 'semantic-ui-react';
import MiniInfoBar from '../../components/MiniInfoBar/MiniInfoBar';

@connect(state => ({ user: state.auth.user }))

class About extends Component {

  state = {
    showKitten: false,
  };

  handleToggleKitten = () => this.setState(state => ({ showKitten: !state.showKitten }));

  render() {
    const { showKitten } = this.state;
    const kitten = require('./kitten.jpg');
    return (
      <div className="container">
        <h1>About this</h1>
        <Helmet title="About Us" />
        <Segment raised>
          <h3>
            Mini Bar
            {' '}
            <span style={{ color: '#aaa' }}>(not that kind)</span>
          </h3>

          <p>
            Hey! You found the mini info bar! The following component is display-only.
            Note that it shows the same time as
            the info bar.
          </p>

          <MiniInfoBar />

          <h3>Images</h3>

          <p>
            Psst! Would you like to see a kitten?
            <Button
              color={showKitten ? 'negative' : 'positive'}
              style={{ marginLeft: 50 }}
              onClick={this.handleToggleKitten}
            >
              {showKitten ? 'No! Take it away!' : 'Yes! Please!'}
            </Button>
          </p>

          {showKitten && (

            <div>
              <img src={kitten} alt="kitchen" />
            </div>
          )}

        </Segment>
        <Segment raised>
          <p>This starter boilerplate app uses the following technologies:</p>

          <ul>
            <li>
              <a href="https://medium.com/@mjackson/universal-javascript-4761051b7ae9">Universal</a>
              {' '}
              rendering
            </li>
            <li>Both client and server make calls to load data from separate API server</li>
            <li>
              <a href="https://github.com/facebook/react" target="_blank" rel="noopener noreferrer">
                React
              </a>
            </li>
            <li>
              <a href="https://github.com/rackt/react-router" target="_blank" rel="noopener noreferrer">
                React Router
              </a>
            </li>
            <li>
              <a href="http://expressjs.com" target="_blank" rel="noopener noreferrer">
                Express
              </a>
            </li>
            <li>
              <a href="http://babeljs.io" target="_blank" rel="noopener noreferrer">
                Babel
              </a>
              {' '}
              for ES6 and ES7 magic
            </li>
            <li>
              <a href="http://webpack.github.io" target="_blank" rel="noopener noreferrer">
                Webpack
              </a>
              {' '}
              for bundling
            </li>
            <li>
              <a
                href="http://webpack.github.io/docs/webpack-dev-middleware.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Webpack Dev Middleware
              </a>
            </li>
            <li>
              <a href="https://github.com/glenjamin/webpack-hot-middleware" target="_blank" rel="noopener noreferrer">
                Webpack Hot Middleware
              </a>
            </li>
            <li>
              <a href="https://github.com/rackt/redux" target="_blank" rel="noopener noreferrer">
                Redux
              </a>
              's futuristic
              {' '}
              <a
                href="https://facebook.github.io/react/blog/2014/05/06/flux.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Flux
              </a>
              {' '}
              implementation
            </li>
            <li>
              <a href="https://github.com/gaearon/redux-devtools" target="_blank" rel="noopener noreferrer">
                Redux Dev Tools
              </a>
              {' '}
              for next generation DX (developer experience). Watch
              {' '}
              <a href="https://www.youtube.com/watch?v=xsSnOQynTHs" target="_blank" rel="noopener noreferrer">
                Dan Abramov's talk
              </a>
              .
            </li>
            <li>
              <a href="https://github.com/rackt/redux-router" target="_blank" rel="noopener noreferrer">
                Redux Router
              </a>
              {' '}
              Keep your router state in your Redux store
            </li>
            <li>
              <a href="http://eslint.org" target="_blank" rel="noopener noreferrer">
                ESLint
              </a>
              {' '}
              to maintain a consistent code style
            </li>
            <li>
              <a href="https://github.com/erikras/redux-form" target="_blank" rel="noopener noreferrer">
                redux-form
              </a>
              {' '}
              to manage form state in Redux
            </li>
            <li>
              <a href="https://github.com/erikras/multireducer" target="_blank" rel="noopener noreferrer">
                multireducer
              </a>
              {' '}
              combine several identical reducer states into one key-based reducer
            </li>
            <li>
              <a href="https://github.com/webpack/style-loader" target="_blank" rel="noopener noreferrer">
                style-loader
              </a>
              {' '}
              and
              {' '}
              <a href="https://github.com/jtangelder/sass-loader" target="_blank" rel="noopener noreferrer">
                sass-loader
              </a>
              {' '}
              to allow import of stylesheets
            </li>
            <li>
              <a href="https://github.com/Semantic-Org/Semantic-UI-React" target="_blank" rel="noopener noreferrer">
                Semantic-UI-React
              </a>
            </li>
            <li>
              <a href="https://github.com/FortAwesome/Font-Awesome" target="_blank" rel="noopener noreferrer">
                font-awesome
              </a>
            </li>
            <li>
              <a href="http://socket.io/">socket.io</a>
              {' '}
              for real-time communication
            </li>
          </ul>
        </Segment>
        <Segment raised>
          <h3>Features demonstrated in this project</h3>

          <dl>
            <dt>Multiple components subscribing to same redux store slice</dt>
            <dd>
              The
              {' '}
              <code>App.js</code>
              {' '}
              that wraps all the pages contains an
              {' '}
              <code>InfoBar</code>
              {' '}
              component that fetches
                            data from the server initially, but allows for the user to refresh the data from the client.
              {' '}
              <code>About.js</code>
              {' '}
              contains a
              <code>MiniInfoBar</code>
              {' '}
              that displays the same data.
            </dd>
            <dt>Server-side data loading</dt>
            <dd>
              The
              {' '}
              <Link to="/widgets">Widgets page</Link>
              {' '}
              demonstrates how to fetch data asynchronously from some source
                            that is needed to complete the server-side rendering.
              {' '}
              <code>Widgets.js</code>
              's
              <code>provideHooks()</code>
              {' '}
              function is called before the widgets page is loaded, on either the server or
                            the client, allowing all the widget data to be loaded and ready for the page to render.
            </dd>
            <dt>Data loading errors</dt>
            <dd>
              The
              {' '}
              <Link to="/widgets">Widgets page</Link>
              {' '}
              also demonstrates how to deal with data loading errors in
                            Redux.
                            The API endpoint that delivers the widget data intentionally fails 33% of the time
                            , to highlight
                            this. The
              {' '}
              <code>clientMiddleware</code>
              {' '}
              sends an error action which the
              {' '}
              <code>widgets</code>
              {' '}
              reducer picks
                            up and saves to the Redux state for presenting to the user.
            </dd>
            <dt>Session based login</dt>
            <dd>
              On the
              {' '}
              <Link to="/login">Login page</Link>
              {' '}
              you can submit a username which will be sent to the server and
                            stored in the session. Subsequent refreshes will show that you are still logged in.
            </dd>
            <dt>Redirect after state change</dt>
            <dd>
              After you log in, you will be redirected to a Login Success page. This
              {' '}
              <strike>magic</strike>
              {' '}
              logic is
                            performed in
              {' '}
              <code>componentWillReceiveProps()</code>
              {' '}
              in
              {' '}
              <code>App.js</code>
              , but it could be done in any
                            component that listens to the appropriate store slice, via Redux's
              {' '}
              <code>@connect</code>
              , and pulls the
                            router from the context.
            </dd>
            <dt>Auth-required views</dt>
            <dd>
              The aforementioned Login Success page is only visible to you if you are logged in. If you try to
              {' '}
              <Link to="/login-success">go there</Link>
              {' '}
              when you are not logged in, you will be forwarded back to this
                            home page. This
              <strike>magic</strike>
              {' '}
              logic is performed by the
              <code>onEnter</code>
              {' '}
              hook within
              <code>routes.js</code>
              .
            </dd>
            <dt>Forms</dt>
            <dd>
              The
              {' '}
              <Link to="/survey">Survey page</Link>
              {' '}
              uses the still-experimental
              {' '}
              <a href="https://github.com/erikras/redux-form" target="_blank" rel="noopener noreferrer">
                redux-form
              </a>
              {' '}
              to manage form state inside the Redux store. This includes immediate client-side validation.
            </dd>
            <dt>WebSockets / socket.io</dt>
            <dd>
              The
              {' '}
              <Link to="/chat">Chat</Link>
              {' '}
              uses the socket.io technology for real-time communication between
                            clients.
            </dd>
          </dl>

          <h3>From the author</h3>

          <p>
            thanks for checking out this frankenstein, pieced together from many pieces of code from many people.
          </p>
        </Segment>
      </div>
    );
  }
}

export default About;
