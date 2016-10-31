import { Collection } from '../helper';

export default function ({ addItem$ }){
  return Collection.pluck(addItem$, item => item.DOM);
}
