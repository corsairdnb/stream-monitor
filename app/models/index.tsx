import { createModel } from '@rematch/core';
import { YoutubeStream } from '../api/youtubeStream';
import { combineLatest, Subscription } from 'rxjs';
import { ChatStatus, IChatState, IMessage } from '../state/chatState';
import { VkStream } from '../api/vkStream';
import { VkStreamAdapter } from '../api/vkStreamAdapter';
import { YoutubeStreamAdapter } from '../api/youtubeStreamAdapter';
import { map } from 'rxjs/operators';
import { ISettingsState } from '../state/settingsState';

const path = require('path');
const SETTINGS_PATH = path.resolve(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, '.stream-monitor', '.settings');

require('dotenv').config({ path: SETTINGS_PATH});

const chatState: IChatState = {
  messages: [],
  chatStatus: null
};

let streamSubscription: Subscription;
let retryTimeout: any;

export const chat = createModel({
  state: { ...chatState },
  reducers: {
    onFetch(state: IChatState, payload: IMessage[]): IChatState {
      const newState: IChatState = {
        messages: payload,
        chatStatus: ChatStatus.CONNECTED
      };
      return {...state, ...newState};
    },
    onStop(state: IChatState): IChatState {
      const newState: Partial<IChatState> = {
        chatStatus: null
      };
      return {...state, ...newState};
    },
    onError(state: IChatState): IChatState {
      const newState: Partial<IChatState> = {
        chatStatus: ChatStatus.RECONNECTING
      };
      return {...state, ...newState};
    }
  },
  effects: (dispatch) => ({
    async start() {
      const vkStream = new VkStream(
        process.env.REACT_APP_VK_OWNER_ID as string,
        parseInt(process.env.REACT_APP_POLL_INTERVAL as string, 10)
      );
      const youtubeStream = new YoutubeStream(
        process.env.REACT_APP_YOUTUBE_CHANNEL_ID as string,
        parseInt(process.env.REACT_APP_POLL_INTERVAL as string, 10),
      );

      const vk$ = new VkStreamAdapter(vkStream).getMessages();
      const youtube$ = new YoutubeStreamAdapter(youtubeStream).getMessages();
      const stream$ = combineLatest(vk$, youtube$).pipe(
        map(items => items[0]
          .concat(items[1])
          .sort((a, b) => {
            if (a.dateTime > b.dateTime) {
              return 1;
            } else if (a.dateTime < b.dateTime) {
              return -1;
            } else {
              return 0;
            }
          })
        )
      );

      streamSubscription = stream$.subscribe({
        next: (messages: IMessage[]) => {
          dispatch.chat.onFetch(messages);
        },
        error: () => {
          retryTimeout = setTimeout(dispatch.chat.start, parseInt(process.env.REACT_APP_RETRY_INTERVAL as string, 10));
          console.error('Error trying to connect the live chat');
          dispatch.chat.onError();
        }
      });
    },
    async stop() {
      if (streamSubscription && !streamSubscription.closed) {
        streamSubscription.unsubscribe();
      }
      clearTimeout(retryTimeout);
      dispatch.chat.onStop();
    }
  })
});


const settingsState: ISettingsState = {
  homePath: SETTINGS_PATH,
};

export const settings = createModel({
  state: { ...settingsState },
  reducers: {
    onSave(state: ISettingsState, payload: {}): ISettingsState {
      return {...state, ...payload};
    }
  }
});
