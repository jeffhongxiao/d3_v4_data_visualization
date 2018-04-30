import * as d3 from 'd3';
import chartFactory from '../common/index';

export async function renderSVGStuff() {
  const chart = chartFactory();

  const text = chart.container.append('text')
    .text('This is not a path')
    .attr('x', 50)
    .attr('y', 200)
    .attr('text-anchor', 'start');

  const circle = chart.container.append('circle')
    .attr('cx', 350)
    .attr('cy', 250)
    .attr('r', 100)
    .attr('fill', 'green')
    .attr('fill-opacity', 0.5)
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 5);
}
