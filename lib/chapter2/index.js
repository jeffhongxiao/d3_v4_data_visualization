import tableFactory from './table-factory';

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

      const p = raw.fact.filter(myfilter).map(mymapper);
      return p;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  const data = await getData();
  data.unshift(['Country', 'Life expectancy (years from birth)']);

  return tableFactory(data);
}
