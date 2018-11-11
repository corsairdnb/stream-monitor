import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import * as rx from 'rxjs';
import { Observable } from 'rxjs';
import { IAbstractStream } from './abstractStream';

import { youtube_v3 } from 'googleapis';
import Schema$LiveChatMessage = youtube_v3.Schema$LiveChatMessage;
import { switchMap } from 'rxjs/operators';

require('dotenv').config();

const keys = JSON.parse(process.env.REACT_APP_GOOGLE_CLIENT_SECRET as string);
const oauth2Client = new OAuth2Client(
  keys.installed.client_id,
  keys.installed.client_secret,
  // keys.installed.redirect_uris[0]
);
oauth2Client.credentials = JSON.parse(process.env.REACT_APP_YOUTUBE_CREDENTIALS as string);

const youtubeStream = google.youtube({
  auth: process.env.REACT_APP_GOOGLE_API_KEY,
  version: 'v3'
});

let streamId: string;
let chatId: string;

export class YoutubeStream implements IAbstractStream<YoutubeChatResponse> {
  private readonly channelId: string;
  private readonly pollInterval: number = 5000;

  constructor(channelId: string, pollInterval: number) {
    this.channelId = channelId;
    this.pollInterval = pollInterval;
  }

  public run(): Observable<YoutubeChatResponse> {
    const request = () => rx.from(getChatMessages(this.channelId));
    return rx.timer(0, this.pollInterval).pipe(
      switchMap(_ => request())
    );
  }
}

async function getChatMessages(channelId: string): Promise<YoutubeChatResponse> {
  if (!streamId) {
    streamId = await getLiveStreamId(channelId).catch((e) => {
      throw new Error(e);
    });
  }
  if (!chatId) {
    chatId = await getLiveChatId(streamId).catch((e) => {
      throw new Error(e);
    });
  }
  return await getLiveChatMessages(chatId);
}

async function getLiveStreamId(channelId: string): Promise<string> {
  const live = await youtubeStream.search.list({
    channelId,
    eventType: 'live',
    maxResults: 1,
    part: 'id',
    type: 'video'
  });

  // @ts-ignore
  if (live.data.items.length > 0) {
    // @ts-ignore
    return live.data.items[0].id.videoId;
  }
  throw new Error('Unable to get live stream id. Maybe it is not run.');
}

async function getLiveChatId(id: string): Promise<string> {
  const video = await youtubeStream.videos.list({
    auth: oauth2Client,
    part: 'id,snippet,liveStreamingDetails',
    id
  });

  // @ts-ignore
  if (video.data.items.length > 0) {
    // @ts-ignore
    return video.data.items[0].liveStreamingDetails.activeLiveChatId;
  }
  throw new Error('Unable to get live chat id');
}

async function getLiveChatMessages(liveChatId: string): Promise<YoutubeChatResponse> {
  try {
    const messages = await youtubeStream.liveChatMessages.list({
      auth: oauth2Client,
      part: 'id,snippet,authorDetails',
      liveChatId
    });
    let items;
    if ('items' in messages.data) {
      items = messages.data.items;
    } else {
      items = [];
    }
    return convert(items as Schema$LiveChatMessage[]);
  } catch (e) {
    throw new Error('Unable to get live chat');
  }
}

function convertItem(item: Schema$LiveChatMessage): YoutubeChatItem {
  return {
    id: item.id ? item.id : '',
    // @ts-ignore
    text: item.snippet.displayMessage,
    // @ts-ignore
    time: item.snippet.publishedAt,
    // @ts-ignore
    author: {
      // @ts-ignore
      displayName: item.authorDetails.displayName,
      // @ts-ignore
      isChatModerator: item.authorDetails.isChatModerator,
      // @ts-ignore
      isChatOwner: item.authorDetails.isChatOwner,
      // @ts-ignore
      isChatSponsor: item.authorDetails.isChatSponsor,
      // @ts-ignore
      profileImageUrl: item.authorDetails.profileImageUrl
    }
  };
}

function convert(items: Schema$LiveChatMessage[]): YoutubeChatResponse {
  return {
    items: items.map(convertItem)
  };
}

export interface YoutubeChatResponse {
  items: YoutubeChatItem[]
}

export interface YoutubeChatItem {
  id: string | number,
  text: string,
  time: string,
  author: YoutubeChatProfile
}

export interface YoutubeChatProfile {
  displayName: string,
  isChatModerator: boolean,
  isChatOwner: boolean,
  isChatSponsor: boolean,
  profileImageUrl: string
}
