import chartFactory from '../common/index';
import * as d3 from 'd3';

const ScaleDemo = (
    enabled => {
        if (enabled) {
            const chart = chartFactory();

            ordinalScales(chart);
            quantitativeScales(chart);  // both continuous and discreet
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


    // draw line 2
    const identity = d3.scaleIdentity().domain(extent);
    const line2 = line1.y(d => identity(weierstrass(d)));
    drawSingle(line2)
        .attr('transform', `translate(0, ${chart.height / 12})`)
        .style('stroke', colors(1));


    // draw line 3
    const power = d3.scalePow()
        .exponent(0.2)
        .domain(extent)
        .range([chart.height / 2, 0]);

    const line3 = line1.y(d => power(weierstrass(d)));
    drawSingle(line3)
        .attr('transform', `translate(0, ${chart.height / 8})`)
        .style('stroke', colors(2))

    // draw line 4
    const log = d3.scaleLog()
        .domain(d3.extent(data.filter(d => (d > 0 ? d : 0))))
        .range([0, chart.width]);

    const line4 = line1.x(d => (d > 0 ? log(d) : 0))
        .y(d => linear(weierstrass(d)));

    drawSingle(line4)
        .attr('transform', `translate(0, ${chart.height / 4})`)
        .style('stroke', colors(3));


    // draw line 5
    const offset = 100;
    const quantize = d3.scaleQuantize()
        .domain(extent)
        .range(d3.range(-1, 2, 0.5).map(d => d * 100));

    const line5 = line1.x(xScale)
        .y(d => quantize(weierstrass(d)));

    drawSingle(line5)
        .attr('transform', `translate(0, ${(chart.height / 2) + offset})`)
        .style('stroke', colors(4))


    // draw line 6
    const threshold = d3.scaleThreshold()
        .domain([-1, 0, 1])
        .range([-50, 0, 50, 100]);

    const line6 = line1.x(xScale)
        .y(d => threshold(weierstrass(d)));

    drawSingle(line6)
        .attr('transform', `translate(0, ${(chart.height / 2) + (offset * 2)})`)
        .style('stroke', colors(5));
};
