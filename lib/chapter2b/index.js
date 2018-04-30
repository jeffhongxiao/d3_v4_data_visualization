import * as d3 from 'd3';
import chartFactory from '../common/index';

export async function renderSVGStuff() {
  const chart = chartFactory();

  const text = chart.container.append('text')
    .text('This is not a path')
    .attr('x', 50)
    .attr('y', 200)
    .attr('text-anchor', 'start');
}
