import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Form, Container, Icon, Label
} from 'semantic-ui-react';
import { Animate } from 'react-simple-animate';
import { socket } from 'app';

@connect(state => ({ user: state.auth.user }))
class Chat extends Component {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string,
    }),
  };

  static defaultProps = {
    user: null,
  };

  state = {
    message: '',
    messages: [],
  };

  componentDidMount() {
    socket.on('msg', this.onMessageReceived);
    setTimeout(() => {
      socket.emit('history', { offset: 0, length: 100 });
    }, 100);
  }

  componentWillUnmount() {
    socket.removeListener('msg', this.onMessageReceived);
  }

  onMessageReceived = data => {
    const { messages } = this.state;
    messages.push(data);
    this.setState({ messages });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { user } = this.props;
    const msg = this.state.message;
    if (!msg.trim()) return false;

    this.setState({ message: '' });

    socket.emit('msg', {
      from: (user && user.email) || 'Anonymous',
      text: msg,
    });
  };

  render() {
    const styles = require('./Chat.scss');

    return (
      <div className={`${styles.chat} container`}>
        <h1>Chat</h1>
        <Container style={{ minHeight: '15em', padding: '0em' }}>
          <Form>
            <Form.Input
              type="text"
              ref={c => {
                this.message = c;
              }}
              placeholder="Enter your message"
              value={this.state.message}
              minWidth="10em"
              attached="top"
              onChange={event => {
                this.setState({ message: event.target.value });
              }}
            />
            <Button attached="bottom" onClick={this.handleSubmit}>
              Must Press to send.
            </Button>
          </Form>
          <ui>
            {this.state.messages
              .slice(0)
              .reverse()
              .map(msg => (
                <ui key={`chat.msg.${msg.id}`}>
                  <Animate
                    play="true"
                    startStyle={{ transform: 'translateX(60em)', opacity: '0', easetype: 'easeOutBounce' }}
                    endStyle={{ opacity: '1' }}
                    durationSeconds=".7"
                  >
                    <Label Icon name="chat" color="blue">
                      <Icon name="chat" size="small" />
                      {msg.from}
                    </Label>
                    <Label basic color="teal" pointing="left">
                      {' '}
                      {msg.text}
                    </Label>
                  </Animate>
                </ui>
              ))}
          </ui>
        </Container>
      </div>
    );
  }
}

export default Chat;

// To show that chat messages can come in any method
// I put them in animated labels.
// Get creative! semantic - ui - React is pretty fun.
