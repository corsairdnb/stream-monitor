export enum ChatStatus {
  CONNECTED,
  RECONNECTING,
}
export enum MessageSource {
  YOUTUBE = 'youtube',
  VK = 'vk',
}
export interface IChatState {
  messages: IMessage[];
  chatStatus: ChatStatus | null;
}
export interface IMessage {
  id: string | number;
  text: string;
  source: MessageSource,
  displayName: string,
  dateTime: number,
  photo: string
}
