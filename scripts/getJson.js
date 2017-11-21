function meetingsToJSON() {
  let allRows = [].slice.call(document.querySelectorAll('table tbody tr')).map((tr) => {
    return tr;
  });
  return JSON.stringify(allRows.reverse().map((row) => { return {
    meeting_id: +row.querySelectorAll('td')[0].innerText,
    tea_brand: row.querySelectorAll('td')[1].innerText,
    tea_type: row.querySelectorAll('td')[2].innerText,
    tea_name: row.querySelectorAll('td')[3].innerText,
    tea_origin: row.querySelectorAll('td')[4].innerText,
    tea_master: row.querySelectorAll('td')[5].innerText,
    meeting_date: row.querySelectorAll('td')[6].innerText
  } }));
}
