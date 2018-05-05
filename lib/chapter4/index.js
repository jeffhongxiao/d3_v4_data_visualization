import chartFactory from '../common/index';
import * as d3 from 'd3';

const ScaleDemo = (
    enabled => {
        if (enabled) {
            // main code here
        }    
    }
)(true);

(function ordinalScales() {
    const chart = chartFactory();

    const data = d3.range(5);

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

})();