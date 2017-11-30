const showTeaMasterRanking = () => {
  const meetings = [...document.querySelectorAll('table tbody tr')].map((row) => {
    const curTd = row.querySelectorAll('td');

    return {
      meeting_id: +curTd[0].innerText,
      tea_brand: curTd[1].innerText,
      tea_type: curTd[2].innerText,
      tea_name: curTd[3].innerText,
      tea_origin: curTd[4].innerText,
      tea_master: curTd[5].innerText,
      meeting_date: curTd[6].innerText
    }
  }).reverse();

  const uniqueMeetings = meetings.reduce((list, currentMeeting) => {
    return (list.find(item => item.tea_name === currentMeeting.tea_name && item.tea_brand === currentMeeting.tea_brand))
      ? [...list]
      : [...list, currentMeeting];
  }, []);

  const teaMastersWithCount = uniqueMeetings.reduce((list, currentMeeting) => {
    const teaMaster = list.find(item => item.tea_master === currentMeeting.tea_master);
    if (teaMaster) {
      const listNoMaster = list.filter(item => item.tea_master !== currentMeeting.tea_master);
      return [...listNoMaster, { 
        tea_master: currentMeeting.tea_master, 
        teas: [...teaMaster.teas, {
          tea_brand: currentMeeting.tea_brand, 
          tea_name: currentMeeting.tea_name,
        }],
        count: ++teaMaster.count, 
      }];
    }
    return [...list, {
      tea_master: currentMeeting.tea_master, 
      teas: [ {
        tea_brand: currentMeeting.tea_brand, 
        tea_name: currentMeeting.tea_name,
      }], 
      count: 1,
    }];
  }, []);

  const teaMastersWithCountSortedDesc = teaMastersWithCount.sort((teaMaster1, teaMaster2) => {
    return +teaMaster2.count - +teaMaster1.count;
  });

  return teaMastersWithCountSortedDesc;
};