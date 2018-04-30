import tableFactory from './table-factory';
import * as d3 from 'd3';

export default async function lifeExpectancyTable() {
  const getData = async () => {
    try {
      const response = await fetch('data/who-gho-life-expectancy.json');
      const raw = await response.json();

      const myfilter = d => {
        if (d.dim.GHO === 'Life expectancy at birth (years)'
          && d.dim.SEX === 'Both sexes'
          && d.dim.YEAR === '2014') {
            return true;
        }
        return false;
      };
      const mymapper = d => [
        d.dim.COUNTRY,
        d.Value,
      ];

      return raw.fact.filter(myfilter).map(mymapper);
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  const data = await getData();
  data.unshift(['Country', 'Years']);

  return tableFactory(data)
    .table.selectAll('tr')
    .sort(d3.descending);
}
