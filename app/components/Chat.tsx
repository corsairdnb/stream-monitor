import * as React from 'react';
import { Button } from 'reactstrap';
import { IProps } from '../containers/ChatPage';
import { IMessage, ChatStatus } from '../state/chatState';
import { format, parse } from 'date-fns';

const styles = require('./Chat.scss');

export function Message(props: IMessage) {
  const icon = `icon-${props.source.toString().toLowerCase()}`;
  return (
    <div className={styles.message}>
      <div className="row">
        <div className="col-10">
          <i className={styles[icon]} />
          <span className={styles.displayName}>{props.displayName} </span>
          <span className={styles.text}>{props.text}</span>
        </div>
        <div className="col-1 ml-auto">
          <span className={styles.dateTime}>{format(parse(new Date(props.dateTime * 1000)), 'HH:mm')}</span>
        </div>
      </div>
    </div>
  );
}

export function Chat({ messages, chatStatus, start, stop }: IProps) {
  return (
    <div>
      <div className="controls">
        <div className="row justify-content-center">
          <div className="col-xs-5 col-sm-4 ml-auto">
            <span className="controls-status">Connection status: </span>
            {chatStatus === ChatStatus.CONNECTED &&
            <span className="text-success">Connected</span>
            }
            {chatStatus === ChatStatus.RECONNECTING &&
            <span className="text-warning">Trying to connect...</span>
            }
            {chatStatus === null &&
            <span className="text-info">Not connected</span>
            }
          </div>

          <div className="col-xs-2 col-sm-1">
            {chatStatus === ChatStatus.CONNECTED || chatStatus === ChatStatus.RECONNECTING ? (
              <Button
                className="btn-primary"
                onClick={stop}>
                Stop
              </Button>
            ) : (
              <Button
                className="btn-primary"
                onClick={start}>
                Start
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="col-md-10 offset-md-1">
          {messages && messages.map((message: IMessage) =>
            <Message
              text={message.text}
              key={message.id.toString()}
              id={message.id}
              source={message.source}
              dateTime={message.dateTime}
              displayName={message.displayName}
              photo={message.photo}
            />
          )}
        </div>
      </div>
    </div>
  );
}
