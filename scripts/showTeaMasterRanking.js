const showTeaMasterRanking = () => {

  const meetingsTable = [].slice.call(document.querySelectorAll('table tbody tr')).map((tr) => {
    return tr;
  });

  const meetings = meetingsTable.reverse().map((row) => { return {
    meeting_id: +row.querySelectorAll('td')[0].innerText,
    tea_brand: row.querySelectorAll('td')[1].innerText,
    tea_type: row.querySelectorAll('td')[2].innerText,
    tea_name: row.querySelectorAll('td')[3].innerText,
    tea_origin: row.querySelectorAll('td')[4].innerText,
    tea_master: row.querySelectorAll('td')[5].innerText,
    meeting_date: row.querySelectorAll('td')[6].innerText
  } });

  const uniqueMeetings = meetings.reduce((list, value) => {
    if (list.find(item => item.tea_name === value.tea_name)) {
      return [ ...list ];
    }
    return [ ...list, value ];
  }, []);

  const teaMastersWithCount = uniqueMeetings.reduce((list, value) => {
    const teaMaster = list.find(item => item.tea_master === value.tea_master);
    if (teaMaster) {
      const listNoMaster = list.filter(item => item.tea_master !== teaMaster.tea_master);
      return [ ...listNoMaster, { tea_master: teaMaster.tea_master, count: teaMaster.count + 1 } ];
    }
    return [ ...list, { tea_master: value.tea_master, count: 1 } ];
  }, []);

  const teaMastersWithCountSortedDesc = teaMastersWithCount.sort((teaMaster1, teaMaster2) => {
    return parseInt(teaMaster2.count, 10) - parseInt(teaMaster1.count, 10);
  });

  return teaMastersWithCountSortedDesc;

};
