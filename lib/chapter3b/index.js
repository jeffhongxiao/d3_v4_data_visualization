import chartFactory from '../common/index';
import * as d3 from 'd3';

export function axisDemos() {
    const chart = chartFactory({
        margin: {top: 30, bottom: 10, left: 50, right: 50},
    });

    const amount = 200;

    const xScale = d3.scaleLinear()
        .domain([0, amount])
        .range([0, chart.width - chart.margin.right - chart.margin.left - 20]);

    const axis = d3.axisBottom().scale(xScale);
    
    chart.container.append('g')
        .data(d3.range(0, amount))
        .call(axis);
}

axisDemos();