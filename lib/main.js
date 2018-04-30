import tableFactory from './chapter2/table-factory';

const header = ['one', 'two', 'three'];

const rows = [
  header,
  ['q', 'w', 'e'],
];

const table = tableFactory(rows);
