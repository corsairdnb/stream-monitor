import { Observable } from 'rxjs';
import { StreamAdapter } from './streamAdapter';
import { map } from 'rxjs/operators';
import { YoutubeChatItem, YoutubeChatResponse, YoutubeStream } from './youtubeStream';
import { IMessage, MessageSource } from '../state/chatState';
import { parse } from 'date-fns';

export class YoutubeStreamAdapter extends StreamAdapter<YoutubeStream> {

  private static convertItems(item: YoutubeChatItem, index: number, list: YoutubeChatItem[]): IMessage {
    return {
      id: item.id,
      text: item.text,
      source: MessageSource.YOUTUBE,
      dateTime: Math.floor(parse(item.time).getTime() / 1000),
      displayName: item.author.displayName,
      photo: item.author.profileImageUrl,
    };
  }

  private static convert(input$: Observable<YoutubeChatResponse>): Observable<IMessage[]> {
    return input$.pipe(
      map((data): IMessage[] => {
        return data.items
          .filter(item => item.text !== '')
          .map(YoutubeStreamAdapter.convertItems);
      })
    );
  }

  constructor(readonly sourceStream: YoutubeStream) {
    super(sourceStream);
  }

  public getMessages(): Observable<IMessage[]> {
    const sourceStream$ = this.sourceStream.run();
    return YoutubeStreamAdapter.convert(sourceStream$);
  }
}
