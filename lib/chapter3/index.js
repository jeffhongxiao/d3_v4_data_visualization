import * as d3 from 'd3';
import chartFactory from '../common/index';

export function yayPaths() {
  const chart = chartFactory();

  // data
  const sineData = d3.range(0, 10)
    .map(k => {
      const x = 0.5 * k * Math.PI;
      return [x, Math.sin(x)];
    });

  // scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(sineData, d => d[0]))
    .range([0, (chart.width / 2) - (chart.margin.left + chart.margin.right),]);
  const yScale = d3.scaleLinear()
    .domain([-1, 1])
    .range([(chart.height / 2) - (chart.margin.top + chart.margin.bottom), 0,]);

  // path generator
  const line = d3.line()
    .x(d => xScale(d[0]))
    .y(d => yScale(d[1]));

  // draw it
  const g = chart.container.append('g');
  g.append('path')
    .datum(sineData)
    .attr('d', line.curve(d3.curveBasisOpen))
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
}

yayPaths();
