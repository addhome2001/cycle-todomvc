import { Observable } from 'rxjs';

export default function (situation) {
  return Observable.merge(...situation);
}
