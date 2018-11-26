import React, { Component } from 'react';
import { CounterButton } from 'components';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Container, Header, Segment } from 'semantic-ui-react';
import config from '../../config';

@connect(state => ({
  online: state.online,
}))
class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <Segment textAlign="center" raised>
          <Container text>
            <div className={styles.logo}>
              <img src={logoImage} alt="presentation" />
              <img
                src="https://react.semantic-ui.com/logo.png"
                alt="semantic-ui-react"
              />
            </div>
            <Header as="h1" content={config.app.title} />
            <Header as="h2" content={config.app.description} />
          </Container>
        </Segment>

        <Container raised color="teal">
          <div className={styles.counterContainer}>
            <CounterButton multireducerKey="counter1" color="red" />
            <CounterButton multireducerKey="counter2" color="green" />
            <CounterButton multireducerKey="counter3" color="blue" />
          </div>
        </Container>
        <Segment>

          <p>This starter boilerplate app uses the following technologies:</p>

          <ul>
            <li>
              <a href="https://medium.com/@mjackson/universal-javascript-4761051b7ae9">
                Universal
              </a>
              {' '}
              rendering
            </li>
            <li>
              Both client and server make calls to load data from separate API server
            </li>
            <li>
              <a
                href="https://github.com/facebook/react"
                target="_blank"
                rel="noopener noreferrer"
              >
                React
              </a>
            </li>
            <li>
              <a
                href="https://github.com/rackt/react-router"
                target="_blank"
                rel="noopener noreferrer"
              >
                React Router
              </a>
            </li>
            <li>
              <a
                href="http://expressjs.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Express
              </a>
            </li>
            <li>
              <a
                href="http://babeljs.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                Babel
              </a>
              {' '}
              for ES6 and ES7 magic
            </li>
            <li>
              <a
                href="http://webpack.github.io"
                target="_blank"
                rel="noopener noreferrer"
              >
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
              <a
                href="https://github.com/glenjamin/webpack-hot-middleware"
                target="_blank"
                rel="noopener noreferrer"
              >
                Webpack Hot Middleware
              </a>
            </li>
            <li>
              <a
                href="https://github.com/rackt/redux"
                target="_blank"
                rel="noopener noreferrer"
              >
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
              <a
                href="https://github.com/gaearon/redux-devtools"
                target="_blank"
                rel="noopener noreferrer"
              >
                Redux Dev Tools
              </a>
              {' '}
              for next generation DX (developer experience). Watch
              {' '}
              <a
                href="https://www.youtube.com/watch?v=xsSnOQynTHs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dan Abramov's talk
              </a>
              .
            </li>
            <li>
              <a
                href="https://github.com/rackt/redux-router"
                target="_blank"
                rel="noopener noreferrer"
              >
                Redux Router
              </a>
              {' '}
              Keep your router state in your Redux store
            </li>
            <li>
              <a
                href="http://eslint.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                ESLint
              </a>
              {' '}
              to maintain a consistent code style
            </li>
            <li>
              <a
                href="https://github.com/erikras/redux-form"
                target="_blank"
                rel="noopener noreferrer"
              >
                redux-form
              </a>
              {' '}
              to manage form state in Redux
            </li>
            <li>
              <a
                href="https://github.com/erikras/multireducer"
                target="_blank"
                rel="noopener noreferrer"
              >
                multireducer
              </a>
              {' '}
              combine several identical reducer states into one key-based reducer
            </li>
            <li>
              <a
                href="https://github.com/webpack/style-loader"
                target="_blank"
                rel="noopener noreferrer"
              >
                style-loader
              </a>
              {' '}
              and
              {' '}
              <a
                href="https://github.com/jtangelder/sass-loader"
                target="_blank"
                rel="noopener noreferrer"
              >
                sass-loader
              </a>
              {' '}
              to allow import of stylesheets
            </li>
            <li>
              <a
                href="https://github.com/Semantic-Org/Semantic-UI-React"
                target="_blank"
                rel="noopener noreferrer"
              >
                Semantic-UI-React
              </a>
            </li>
            <li>
              <a
                href="https://github.com/FortAwesome/Font-Awesome"
                target="_blank"
                rel="noopener noreferrer"
              >
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
      </div>
    );
  }
}

export default Home;
