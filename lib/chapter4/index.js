import chartFactory from '../common/index';
import * as d3 from 'd3';

const ScaleDemo = (
    enabled => {
        if (enabled) {
            const chart = chartFactory();

            ordinalScales(chart);
            quantitativeScales(chart);
        }    
    }
)(true);


function ordinalScales(chart) {
    const data = d3.range(30);

    const colors = d3.scaleOrdinal(d3.schemeCategory10);
    const points = d3.scalePoint()
        .domain(data)
        .range([0, chart.height])
        .padding(1.0)
    const bands = d3.scaleBand()
        .domain(data)
        .range([0, chart.width])
        .padding(0.1);

    // draw circles
    chart.container.selectAll('path')
        .data(data)
        .enter()
        .append('path')
        .attr('d', d3.symbol()
            .type(d3.symbolCircle)
            .size(10)
        )
        .attr('transform', d => `translate(${(chart.width / 2)}, ${points(d)})`)
        .style('fill', d => colors(d));


    // draw rects
    ['10', '20', '20b', '20c'].forEach((scheme, i) => {
        const height = 10;
        const padding = 5;
        const categoryScheme = `schemeCategory${scheme}`;
        const selector = `rect.scheme${scheme}`;
        const categoryColor = d3.scaleOrdinal(d3[categoryScheme]);

        chart.container.selectAll(selector)
            .data(data.slice())
            .enter()
            .append('rect')
            .classed(selector, true)
            .attr('x', d => bands(d))
            .attr('y', chart.height / 2 - (i * height + padding * i))
            .attr('width', bands.bandwidth)
            .attr('height', height)
            .style('fill', d => categoryColor(d));
    });

};


function quantitativeScales(chart) {
    const weierstrass = (x) => {
        const a = 0.5;
        const b = (1 + 3 * Math.PI / 2) / a;

        const mapped = d3.range(100).map(
            n => Math.pow(a, n) * Math.cos(Math.pow(b, n) * Math.PI * x)
        );

        return d3.sum(mapped);
    }

    const data = d3.range(-100, 100).map(d => d / 200);
    const extent = d3.extent(data.map(weierstrass));
    const colors = d3.scaleOrdinal(d3.schemeCategory10);
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data))
        .range([0, chart.width]);
    
    const drawSingle = line => chart.container.append('path')
        .datum(data)
        .attr('d', line)
        .style('stroke-width', 2)
        .style('fill', 'none');

    const linear = d3.scaleLinear()
        .domain(extent)
        .range([chart.height / 4, 0]);
    const line1 = d3.line()
        .x(xScale)
        .y(d => linear(weierstrass(d)));

    drawSingle(line1)
        .attr('transform', `translate(0, ${chart.height / 16})`)
        .style('stroke', colors(0));

};