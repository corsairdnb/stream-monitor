import * as React from 'react';
import { ICommonProps } from '../routes';
import { Button, Navbar } from 'reactstrap';
import { ChatStatus } from '../state/chatState';

export function StatusBar({chatStatus, start, stop}: Partial<ICommonProps>) {
  return (
    <Navbar color="light" light={true}>
      <div>
        {chatStatus === ChatStatus.CONNECTED || chatStatus === ChatStatus.RECONNECTING ? (
          <Button
            color="link"
            onClick={stop}>
            Stop
          </Button>
        ) : (
          <Button
            color="link"
            onClick={start}>
            Start
          </Button>
        )}
      </div>

      <div>
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
    </Navbar>
  );
}
