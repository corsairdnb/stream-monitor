import { IAbstractStream } from './abstractStream';
import { Observable } from 'rxjs';
import { IMessage } from '../state/chatState';

export abstract class StreamAdapter<S extends IAbstractStream<any>> {
  protected constructor(readonly sourceStream: S) {}
  public abstract getMessages(): Observable<IMessage[]>;
}
