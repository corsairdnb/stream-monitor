import * as React from 'react';
import { Col, Row } from 'reactstrap';
import { IProps } from '../containers/ChatPage';
import { IMessage } from '../state/chatState';
import { format, parse } from 'date-fns';

const styles = require('./Chat.scss');

export function Message(props: IMessage) {
  const icon = `icon-${props.source.toString().toLowerCase()}`;
  return (
    <div className={styles.message}>
      <Row>
        <Col xs={10}>
          <i className={styles[icon]} />
          <span className={styles.displayName}>{props.displayName} </span>
          <span className={styles.text}>{props.text}</span>
        </Col>
        <Col xs={10} className="ml-auto">
          <span className={styles.dateTime}>{format(parse(new Date(props.dateTime * 1000)), 'HH:mm')}</span>
        </Col>
      </Row>
    </div>
  );
}

export function Chat({ messages }: IProps) {
  return (
    <Row className="mb-auto">
      <Col>
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
      </Col>
    </Row>
  );
}
