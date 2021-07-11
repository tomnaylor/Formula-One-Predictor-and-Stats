$.when(
  $.getJSON(`https://ergast.com/api/f1/${season}/${round}/results.json`)
).then(
  function(response) {

  },
  function(e) {
    showErrors(`Sorry there was a problem getting the race results`);
    $(`#race-standings`).html(`No data avaliable`);
  }
);
