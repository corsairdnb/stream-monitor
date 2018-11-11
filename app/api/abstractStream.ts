import { Observable } from 'rxjs';

export interface IAbstractStream<R> {
  run(): Observable<R>;
}
