import * as d3 from 'd3';

export default function tableFactory(_rows) {
  const rows = Array.from(_rows);
  const header = rows.shift();  // remove first row for header
  const data = rows;

  const table = d3.select('body')
    .append('table')
    .attr('class', 'table');


  // const tableHeader = table.append('thead').append('tr');
  // header.forEach(value => {
  //   tableHeader.append('th').text(value);
  // });
  table.append('thead')
    .append('tr')
    .selectAll('td')
    .data(header)
    .enter()
      .append('th')
      .text(d => d);


  // const tableBody = table.append('tbody');
  // data.forEach(row => {
  //   const tableRow = tableBody.append('tr');
  //   row.forEach(value => {
  //     tableRow.append('td').text(value);
  //   })
  // });
  table.append('tbody')
    .selectAll('tr')
    .data(rows)
    .enter()
      .append('tr')
      .selectAll('td')
      .data(d => d)
      .enter()
        .append('td')
        .text(d => d);


  return {
    table: table,
    header: header,
    data: data,
  };
}
