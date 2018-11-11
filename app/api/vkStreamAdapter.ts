import { Observable } from 'rxjs';
import { StreamAdapter } from './streamAdapter';
import { VkChatGroup, VkChatItem, VkChatProfile, VkChatResponse, VkStream } from './vkStream';
import { map, tap } from 'rxjs/operators';
import { IMessage, MessageSource } from '../state/chatState';

export class VkStreamAdapter extends StreamAdapter<VkStream> {
  private static profiles: { [index: number]: VkChatProfile } = {};
  private static groups: { [index: number]: VkChatGroup } = {};

  private static convertItems(item: VkChatItem, index: number, list: VkChatItem[]): IMessage {
    let author;
    let name: string;
    if (item.from_id > 0) {
      author = VkStreamAdapter.profiles[item.from_id];
      name = `${author.first_name} ${author.last_name}`;
    } else {
      author = VkStreamAdapter.groups[Math.abs(item.from_id)];
      name = author.name;
    }
    return {
      id: item.id,
      text: item.text,
      source: MessageSource.VK,
      dateTime: item.date,
      displayName: name,
      photo: author.photo_50
    };
  }

  private static convert(input$: Observable<VkChatResponse>): Observable<IMessage[]> {
    return input$.pipe(
      tap((data) => {
        data.profiles.forEach((profile) => {
          VkStreamAdapter.profiles[profile.id] = profile;
        });
        data.groups.forEach((group) => {
          VkStreamAdapter.groups[group.id] = group;
        });
      }),
      map((data): IMessage[] => {
        return data.items
          .filter(item => item.text !== '')
          .map(VkStreamAdapter.convertItems);
      })
    );
  }

  constructor(readonly sourceStream: VkStream) {
    super(sourceStream);
  }

  public getMessages(): Observable<IMessage[]> {
    const sourceStream$ = this.sourceStream.run();
    return VkStreamAdapter.convert(sourceStream$);
  }
}
