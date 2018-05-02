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

  // path generator - line()
  const line = d3.line()
    .x(d => xScale(d[0]))
    .y(d => yScale(d[1]));

  // draw it
  // const g = chart.container.append('g');
  // g.append('path')
  //   .datum(sineData)
  //   .attr('d', line.curve(d3.curveBasisOpen))
  //   .attr('stroke', 'steelblue')
  //   .attr('stroke-width', 2)
  //   .attr('fill', 'none');

  const g2 = chart.container.append('g')
    .attr('transform', `
      translate(
        ${(chart.width / 2) + (chart.margin.left + chart.margin.right)},
        ${chart.margin.top}
      )
      `);

  // path generator - area()
  const area = d3.area()
    .x(d => xScale(d[0]))
    .y0(chart.height / 2)
    .y1(d => yScale(d[1]))
    .curve(d3.curveBasisOpen);

  g2.append('path')
    .datum(sineData)
    .attr('d', area)
    .attr('fill', 'orange')
    .attr('fill-opacity', 0.4);

  // use line() on g2
  g2.append('path')
    .datum(sineData)
    .attr('d', line.curve(d3.curveBasisOpen))
    .attr('stroke', 'green')
    .attr('stroe-width', 2)
    .attr('fill', 'none');
}

yayPaths();
