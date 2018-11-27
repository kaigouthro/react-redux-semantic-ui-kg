import React, { Component } from 'react';
import { CounterButton } from 'components';
import config from 'config';
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
        <Container>
          <div className={styles.counterContainer}>
            <CounterButton multireducerKey="counter1" color="red" />
            <CounterButton multireducerKey="counter2" color="green" />
            <CounterButton multireducerKey="counter3" color="blue" />
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
