export default function({ itemValue$, addItem$ }) {
  return itemValue$.sample(addItem$).startWith("");
}
