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

    const axes = [
        d3.axisBottom().scale(xScale),
        d3.axisTop().scale(xScale).ticks(5),
        d3.axisBottom().scale(xScale).tickSize(10, 5, 10),
        d3.axisTop().scale(xScale).tickValues([0, 20, 50, 70, 100])
            .tickFormat((d, i) => ['a', 'e', 'i', 'o', 'u'][i]),
    ];
    
    axes.forEach((axis, i) => {
        chart.container.append('g')
        .data(d3.range(0, amount))
        .attr('transform', `translate(0, ${i*50 + chart.margin.top})`)
        .call(axis)
    });
}

axisDemos();