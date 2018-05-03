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
  drawSineLine(chart, sineData, line);
  const g2 = drawSineArea(chart, sineData, line, [xScale, yScale]);
  const g3 = drawArc(chart, sineData, line);
  drawSymbols(sineData, g2, [xScale, yScale]);
  const g4 = chart.container.append('g')
    .attr('transform', 'translate(300, 150)');
  drawChords(g4);
}

function drawChords(group) {
  const data = d3.zip(d3.range(0, 12), 
    d3.shuffle(d3.range(0, 12)));

  const colors = ['linen', 'lightsteelblue', 'lightcyan', 
    'lavender', 'honeydew', 'gainsboro'];

  const ribbon = d3.ribbon()
    .source(d => d[0])
    .target(d => d[1])
    .radius(150)
    .startAngle(d => -2 * Math.PI * (1/data.length) * d)
    .endAngle(d => -2 * Math.PI * (1/data.length) * ((d-1) % data.length));

  group.append('g')
    .selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('d', ribbon)
    .attr('fill', (d, i) => colors[i % colors.length])
    .attr('stroke', (d, i) => colors[(i+1) % colors.length] );
}

function drawSymbols(sineData, group, [xScale, yScale]) {
  const symbols = d3.symbol()
    .type(d => {
      return d[1] > 0 ? d3.symbolTriangle : d3.symbolDiamond;
    })
    .size((d, i) => {
      return i % 2 ? 0 : 64
    });
  
  group.selectAll('path')
    .data(sineData)
    .enter()
    .append('path')
    .attr('d', symbols)
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr('fill', 'white')
    .attr('transform', d => `translate(
      ${xScale(d[0])},
      ${yScale(d[1])}
    )`);
}

function drawArc(chart, sineData, line) {
  const arc = d3.arc();
  const g3 = chart.container.append('g')
    .attr('transform', `translate(
      ${chart.margin.left + chart.margin.right},
      ${(chart.height / 2) + (chart.margin.top + chart.margin.bottom)}
    )
    `);

    g3.append('path')
      .attr('d',
        arc({
          outerRadius: 100,
          innerRadius: 50,
          startAngle: -Math.PI * 0.25,
          endAngle: Math.PI * 0.5,
        }))
      .attr('transform', 'translate(150, 150)')
      .attr('fill', 'lightgreen');

  return g3;
}

function drawSineLine(chart, sineData, line) {
  const g = chart.container.append("g");
  g.append("path")
    .datum(sineData)
    .attr("d", line.curve(d3.curveBasisOpen))
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("fill", "none");
}

function drawSineArea(chart, sineData, line, [xScale, yScale]) {
  const g2 = chart.container.append("g").attr("transform", `
      translate(
        ${chart.width / 2 + (chart.margin.left + chart.margin.right)},
        ${chart.margin.top}
      )
      `);

  // path generator - area()
  const area = d3
    .area()
    .x(d => xScale(d[0]))
    .y0(chart.height / 2)
    .y1(d => yScale(d[1]))
    .curve(d3.curveBasisOpen);

  g2
    .append("path")
    .datum(sineData)
    .attr("d", area)
    .attr("fill", "orange")
    .attr("fill-opacity", 0.4);

  // use line() on g2
  g2
    .append("path")
    .datum(sineData)
    .attr("d", line.curve(d3.curveBasisOpen))
    .attr("stroke", "green")
    .attr("stroe-width", 2)
    .attr("fill", "none");

  return g2;
}

yayPaths();
