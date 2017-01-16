import { Observable } from 'rxjs';

export default function ({ lock$ }) {
  return Observable.merge(lock$);
}
