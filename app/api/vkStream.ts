import { Observable } from 'rxjs';
import { IAbstractStream } from './abstractStream';
// @ts-ignore
import VK from 'vk-io';
import * as rx from 'rxjs';
import { switchMap } from 'rxjs/operators';

require('dotenv').config();

const vkStream = new VK();
vkStream.token = process.env.REACT_APP_VK_TOKEN;

let video: any;

export class VkStream implements IAbstractStream<any> {
  private readonly ownerId: string;
  private readonly pollInterval: number = 5000;

  constructor(ownerlId: string, pollInterval: number) {
    this.ownerId = ownerlId;
    this.pollInterval = pollInterval;
  }

  public run(): Observable<VkChatResponse> {
    const request = () => rx.from(getChatMessages(this.ownerId));
    return rx.timer(0, this.pollInterval).pipe(
      switchMap(_ => request())
    );
  }
}

async function getVideo(ownerId: string) {
  const response = await vkStream.api.video.get({
    owner_id: `-${ownerId}`,
  });

  const live = (response.items as object[]).find(item => 'live' in item);

  if (live) {
    return live;
  }

  throw new Error('VK live video not found');
}

export async function getChatMessages(ownerId: string): Promise<VkChatResponse> {
  if (!video) {
    video = await getVideo(ownerId);
  }

  const response: VkChatResponse = await vkStream.api.video.getComments({
    owner_id: `-${ownerId}`,
    video_id: video.id,
    sort: 'desc',
    count: 100,
    extended: 1
  });

  response.items.reverse();
  return response;
}

export interface VkChatResponse {
  count: number,
  items: VkChatItem[],
  profiles: VkChatProfile[],
  groups: VkChatGroup[]
}

export interface VkChatItem {
  id: number,
  from_id: number,
  date: number,
  text: string
}

export interface VkChatProfile {
  id: number,
  first_name: string,
  last_name: string,
  sex: number,
  screen_name: string,
  photo_50: string,
  photo_100: string,
  online: number
}

export interface VkChatGroup {
  id: number,
  name: string,
  screen_name: string,
  is_closed: boolean,
  deactivated: string,
  is_admin: number,
  admin_level: number,
  is_member: number,
  invited_by: number,
  type: string,
  photo_50: string,
  photo_100: string,
  photo_200: string,
}
