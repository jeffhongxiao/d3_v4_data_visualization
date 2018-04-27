import * as d3 from 'd3';

const chart = d3.select('body')
  .append('svg')
  .attr('id', 'chart');

const req = new window.XMLHttpRequest();
req.addEventListener('load', mungeData);
req.open('GET', 'data/result.csv');
req.send();

function mungeData() {
  const data = d3.csvParse(this.responseText);
  const regions = data.reduce((last, row) => {
    if (!last[row.Region]) {
      last[row.Region] = [];
    }

    last[row.Region].push(row);
    return last;
  }, {});

  console.log(regions);

  const turnout = Object.entries(regions)
    .map(([region, areas]) => ({
      region,
      meanTurnout: d3.mean(areas, d => d.Pct_Turnout),
    }));

  console.log(turnout);

  renderChart(turnout);
}

function renderChart(data) {
  chart.attr('width', window.innerWidth)
    .attr('height', window.innerHeight);

  const xScale = d3.scaleBand()
    .domain(data.map(d => d.region))
    .rangeRound([50, window.innerWidth - 50])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.meanTurnout)])
    .range([window.innerHeight - 50, 0]);

  const xAxis = d3.axisBottom().scale(xScale);
  const yAxis = d3.axisLeft().scale(yScale);

  // draw xAxis and yAxis
  chart.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0, ${window.innerHeight - 50})`)
    .call(xAxis);
  chart.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(50, 0)')
    .call(yAxis);

  // draw data
  chart.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d.region))
    .attr('y', d => yScale(d.meanTurnout))
    .attr('width', xScale.bandwidth())
    .attr('height', d => (window.innerHeight - 50) - yScale(d.meanTurnout));
}
