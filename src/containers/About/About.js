import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { provideHooks } from 'redial';
import MiniInfoBar from '../../components/MiniInfoBar/MiniInfoBar';
import { isLoaded as isInfoLoaded, load as loadInfo } from '../../redux/modules/info';
import { Button, Link, Segment } from 'semantic-ui-react';

class About extends component {
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
        <Helmet title="About" />
        <h1>
          This project has many contributions from the open source community.
          Thank you to all the contributions.
          I'm looking forward to what i can build on the backs of giants.
        </h1>
        <h3>
          Mini Bar!
          {' '}
          <span style={{ color: '#aaa' }}>(not that kind)</span>
        </h3>
        <p>
          Hey! You found the mini info bar!
          The following component is display-only. Note that it shows the same time as the info bar.
        </p>
        <MiniInfoBar />
        <h3>Images </h3>
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
        {showKitten
          && (
            <div>
              <img src={kitten} alt="kitchen" />
            </div>
          )}
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
                Redux. The API endpoint that delivers the widget data intentionally fails 33% of the time to highlight
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
                <a
                  href="https://github.com/erikras/redux-form"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
              I cobbled this together from a wide variety of places. It's my own personal frankenstein
            </p>
            <p>Thanks for taking the time to check this out.</p>
            <p>kai.</p>
          </Segment>
      </div>
    );
  }
}

export default About;
