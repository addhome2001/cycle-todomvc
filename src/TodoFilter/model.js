export default function ({ filterStatus$ }) {
  return filterStatus$.startWith('All');
}
