/*jshint sub:true*/

// SHOW NON-FATAL ERRORS
function showErrors(e) {
    $('#errors').html(e);
    $('#errors').slideDown('slow');
}


// GOOGLE MAP API CALL
function googleMap(lat,long,container) {
  let map;
  map = new google.maps.Map(document.getElementById(container), {     // removed callback function as only gets written when circuit api is done.
      center: { lat: parseFloat(lat), lng: parseFloat(long) },        // HAD PROBLEM THAT IT WASNT A NUMBER
      zoom: 18,
      mapTypeId:google.maps.MapTypeId.HYBRID
  });
}

// SHOW CIRCUIT INFO`
function drawCircuit(c) {
  $('#track-details').html(`
    <h2 class="text-upper">${c['circuitName']}</h2>
    <img src="https://chrisdermody.com/content/images/2017/12/engine8.svg" id="track-sectors" alt="${c['circuitName']} track sectors" width="900">
    <h3 class="text-upper">Map</h3>
    <div id="map"></div>
    `);


  if (CIRCUITS[c['circuitId']]) {
      $('#track-sectors').attr("src",`assets/img/circuits/${CIRCUITS[c['circuitId']]['track-sectors']}`);
  }
  else {
      $('#track-sectors').attr("src",``);
  }
  googleMap(c['Location']['lat'],c['Location']['long'],'map');
}

// ERROR WHEN THERE ARE NO LAPS DRIVEN
function drawDriversLapTimes(driverOneId, driverTwoId, containerId) {

  $.when(
    $.getJSON(`https://ergast.com/api/f1/${F1_SEASON}/${F1_ROUND}/drivers/${driverOneId}/laps.json?limit=200`),
    $.getJSON(`https://ergast.com/api/f1/${F1_SEASON}/${F1_ROUND}/drivers/${driverTwoId}/laps.json?limit=200`)
  ).then(
    function(driverOne, driverTwo) {

      if ((!driverOne[0]['MRData']['RaceTable']['Races'][0]) || (!driverTwo[0]['MRData']['RaceTable']['Races'][0])) {
        $('#head2head-graph').html('No data to display');
        return;
      }

        $('#head2head-graph').html('<canvas id="head2head-canvas"></canvas>');
        let ctx = document.getElementById('head2head-canvas').getContext('2d'); // HAS ERROR ON CONSOLE
        //ctx.destroy();
        // error with redrawing - have to clear grap first.
        //ctx.clearRect(0, 0, ctx.width, ctx.height);

        let labelsArray = [];
        let driverOneTimes = [];
        let driverOnePosition = [];
        let driverTwoTimes = [];
        let driverTwoPosition = [];


        driverOne[0]['MRData']['RaceTable']['Races'][0]['Laps'].forEach(lap => {
            labelsArray.push(lap['number']);

            let tempTimeSplit = lap['Timings'][0]['time'].split(":"); // FIX IN THE MS2 BOOKMARKS
            let tempTime = (parseFloat(tempTimeSplit[0])*60)+parseFloat(tempTimeSplit[1]);
            if (tempTime > 300) tempTime = 300;

            driverOneTimes.push(tempTime);
            driverOnePosition.push(lap['Timings'][0]['position']);
        });


        driverTwo[0]['MRData']['RaceTable']['Races'][0]['Laps'].forEach(lap => {

            let tempTimeSplit = lap['Timings'][0]['time'].split(":"); // FIX IN THE MS2 BOOKMARKS
            let tempTime = (parseFloat(tempTimeSplit[0])*60)+parseFloat(tempTimeSplit[1]);
            if (tempTime > 300) tempTime = 300;

            driverTwoTimes.push(tempTime);
            driverTwoPosition.push(lap['Timings'][0]['position']);
        });


        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labelsArray,
                datasets: [
                    {
                        label: `Lap time (s)`,
                        data: driverOneTimes,
                        borderColor: '#E10600',
                        backgroundColor: '#E10600',
                        color: '#E10600',
                        borderWidth: 1,
                        yAxisID: 'y',
                    },
                    {
                        label: 'Track position',
                        data: driverOnePosition,
                        borderColor: '#E10600',
                        backgroundColor: '#E10600',
                        color: '#E10600',
                        borderWidth: 2,
                        yAxisID: 'y1',
                    },
                    {
                      label: `Lap time (s)`,
                        data: driverTwoTimes,
                        borderColor: '#1F1F1F',
                        backgroundColor: '#1F1F1F',
                        color: '#1F1F1F',
                        borderWidth: 1,
                        yAxisID: 'y',
                    },
                    {
                        label: 'Track position',
                        data: driverTwoPosition,
                        borderColor: '#1F1F1F',
                        backgroundColor: '#1F1F1F',
                        color: '#1F1F1F',
                        borderWidth: 2,
                        yAxisID: 'y1',
                    }

                ]
            },
            options: {
                pointRadius: 0,
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        beginAtZero: false
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        min:0,
                        max:20,
                        reverse:true,
                        grid: {
                            drawOnChartArea: false,
                        },
                    },
                }
            }
        });
      },
      function(e) {
        showErrors(`Sorry there was a problem getting the driver lap times. Please try again (${e['statusText']})`);
        $(`#head2head-graph`).html(`<span class="color-accent-bg color-light text-upper text-bold text-pad">${e}</span>`);
      });
}


// DRAW RACE RESULT TABLE
function drawRaceStandings(r) {
  $('#race-standings').html(`
    <h2 class="text-upper">Race standings</h2>
    <table>
        <thead>
            <tr class="color-black-bg color-white text-upper">
              <th>Pos</th>
              <th class="hide-on-mobile"></th>
              <th>Driver</th>
              <th>Car</th>
              <th>H2H</th>
              <th>Pts.</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>`);

    r.forEach((e, key) => {

    let flag = COUNTRIES.find(i => i['nationality'] === e['Driver']['nationality']);
    let flagImg = (flag) ? `<img src="https://www.countryflags.io/${flag['code']}/flat/24.png" alt="${e['Driver']['nationality']}">` : '';
    let gain = parseInt(e['grid'])-parseInt(e['position']);

    $('#race-standings table tbody').append(`<tr>
        <td title="Started P${e['grid']}. Places gained/lossed: ${gain}">
          <span class="text-bold">${e['position']}</span>
          ${(gain >= 1) ? '<i class="fas fa-angle-up text-smaller"></i>' : (gain < 0) ? '<i class="fas fa-angle-down text-smaller color-red"></i>' : '' }
        </td>
        <td class="hide-on-mobile" title="${e['Driver']['nationality']}">${flagImg}</td>
        <td><span class="text-smaller text-bold">#${e['number']}</span> ${e['Driver']['givenName']} ${e['Driver']['familyName']}</td>

        <td class="race-standings-car"><img src="assets/img/constructors/thumb/${e['Constructor']['constructorId']}.png" alt="${e['Constructor']['name']}" title="${e['Constructor']['name']}"></td>

        <td>
            <button class="head2head-select1 color-red-bg color-white" data-key="${key}">a</button>
            <button class="head2head-select2 color-black-bg color-white" data-key="${key}">b</button>
        </td>
        <td>${(e['points'] > 0) ? e['points'] : ''}</td>
    </tr>`);
  });

  $(".head2head-select1").click(function() {
      headToHead(r[this.dataset.key],F1_HEAD2HEAD_2);
  });

  $(".head2head-select2").click(function() {
      headToHead(F1_HEAD2HEAD_1,r[this.dataset.key]);
  });
}


// DRAW HEAD TO HEAD BOXES
function headToHeadTable() {
  $('#head2head').html(`
      <h2 class="text-upper">Head to Head</h2>
      <table>
        <tr id="head2head-car">
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr id="head2head-driver">
          <td class="color-red"></td>
          <td>Vs</td>
          <td></td>
        </tr>
        <tr id="head2head-flag">
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr id="head2head-position">
          <td></td>
          <td>Finished</td>
          <td></td>
        </tr>
        <tr id="head2head-points">
          <td></td>
          <td>Points</td>
          <td></td>
        </tr>
        <tr id="head2head-grid">
          <td></td>
          <td>Grid</td>
          <td></td>
        </tr>
        <tr id="head2head-gain">
          <td></td>
          <td>Gain</td>
          <td></td>
        </tr>
        <tr id="head2head-time">
          <td></td>
          <td>Total time</td>
          <td></td>
        </tr>
        <tr id="head2head-fastestlap">
          <td></td>
          <td>Fastest lap</td>
          <td></td>
        </tr>
        <tr id="head2head-averagespeed">
          <td></td>
          <td>Average speed</td>
          <td></td>
        </tr>
      </table>
      <h2 class="text-upper">Lap times</h2>
      <div id="head2head-graph"></div>`);
}


// CALCULATE HEAD TO HEAD INFO
function headToHead(one,two) {

  headToHeadTable();

  F1_HEAD2HEAD_1 = one;
  F1_HEAD2HEAD_2 = two;

  // MAKE ARRAY OF DRIVERS TO MAKE LOOPING EASIER
  let drivers = [one,two];
  let key = 1;

  drawDriversLapTimes(one['Driver']['driverId'],two['Driver']['driverId'],`head2head-graph`);

  drivers.forEach(driver => {
      let flag = COUNTRIES.find(key => key['nationality'] === driver['Driver']['nationality']);
      let gain = parseInt(driver['grid'])-parseInt(driver['position']);

      $(`#head2head-car td:nth-child(${key})`).html(`<img  src="assets/img/constructors/medium/${driver['Constructor']['constructorId']}.png" alt="${driver['Constructor']['name']}">`);
      $(`#head2head-driver td:nth-child(${key})`).html(driver['Driver']['givenName']+' '+driver['Driver']['familyName']);
      $(`#head2head-flag td:nth-child(${key})`).html(`<img class="head2head-flag" src="https://www.countryflags.io/${flag['code']}/flat/64.png" alt="${driver['Driver']['nationality']}">`);
      $(`#head2head-position td:nth-child(${key})`).html(driver['position']);
      $(`#head2head-points td:nth-child(${key})`).html(driver['points']);
      $(`#head2head-grid td:nth-child(${key})`).html(driver['grid']);
      $(`#head2head-gain td:nth-child(${key})`).html(`${gain} ${(gain >= 1) ? '<i class="fas fa-angle-up"></i>' : (gain < 0) ? '<i class="fas fa-angle-down"></i>' : '' }`);
      $(`#head2head-time td:nth-child(${key})`).html(('Time' in driver) ? driver['Time']['time'] : '-');
      $(`#head2head-fastestlap td:nth-child(${key})`).html(('FastestLap' in driver) ? `${driver['FastestLap']['Time']['time']} (#${driver['FastestLap']['rank']})` : '-');
      $(`#head2head-averagespeed td:nth-child(${key})`).html(('FastestLap' in driver) ? `${driver['FastestLap']['AverageSpeed']['speed']}${driver['FastestLap']['AverageSpeed']['units']}` : '-');

      // SET KEY TO 3 TO TARGET THE THIRD CHILD TD ON THE TABLE
      key = 3;
  });
}


// CALCULATE RACE POINTS
function calculateRacePoints(position) {

  switch(position) {
    case 1: points = 25; break;
    case 2: points = 18; break;
    case 3: points = 16; break;
    case 4: points = 12; break;
    case 5: points = 10; break;
    case 6: points = 8; break;
    case 7: points = 6; break;
    case 8: points = 4; break;
    case 9: points = 2; break;
    case 10: points = 1; break;
    default : points = 0;
  }

  return points;
}


// SHOW SEASON RESULTS
function seasonResults(season) {

  $('main').html(`
    <section id="season-standings">
      <h2 class="text-upper">Season standings</h2>
      <table></table>
    </section>`);

  $.when($.getJSON(`https://ergast.com/api/f1/${season}/results.json?limit=5000`)).then(function(response) {

    let races = response['MRData']['RaceTable']['Races'];
    let driverResult = {};

    $('#season-standings').fadeIn();

    $('#season-standings table').html(`
      <thead>
        <tr class="color-white">
          <th class="color-black-bg"></th>
        </tr>
      </thead>
      <tbody></tbody>`);

    // DRIVER NAMES BASED ON WHO WON FIRST RACE
    races[0]['Results'].forEach((driver,driverId) => {
      let flag = COUNTRIES.find(i => i['nationality'] === driver['Driver']['nationality']);
      let flagImg = (flag) ? `<img src="https://www.countryflags.io/${flag['code']}/flat/24.png" alt="${driver['Driver']['nationality']}">` : '';

      $('#season-standings table tbody').append(`
        <tr id="season-standings-driver-tr-${driver['number']}">
          <th>
            ${flagImg}
            <div class="text-upper">
              <div class="text-bold">#${driver['number']}</div>
              ${driver['Driver']['familyName']}
            </div>
          </th>
        </tr>`);
    });


    // PAST RACES WITH ACTUAL RESULTS
    races.forEach(race => {

      // RACE HEADERS
      // id="season-standings-tr-${race['round']}"
      $('#season-standings table thead tr').append(`
        <th class="text-upper color-black-bg">
          ${(CIRCUITS[race['Circuit']['circuitId']]) ? `<img src="assets/img/circuits/${CIRCUITS[race['Circuit']['circuitId']]['track-outline']}">` : `<div class="color-white text-bold">${race['round']}</div>` }
          ${dateFormat(race['date'], "d")}
          <div class="text-smaller">${dateFormat(race['date'], "mmm")}</div>
        </th>`);

      // DRAW INDIVIDUAL RACE RESULTS TD - FIX FOR WHEN THERE WERE MISSING RACES
      races[0]['Results'].forEach(driver => {
        $(`#season-standings-driver-tr-${driver['number']}`).append(`<td id="season-standings-driver-tr-${driver['number']}-round-${race['round']}"></td>`);
      });



      // RACE RESULTS
      race['Results'].forEach(result => {

        let x = result['number'];

        if (x in driverResult) {
            driverResult[x]['multiply'] = driverResult[x]['multiply'] + 1;
            driverResult[x]['finalPoints'] = driverResult[x]['finalPoints'] + parseInt(result['points']);
            driverResult[x]['avGrid'] = driverResult[x]['avGrid'] + parseInt(result['grid']);
            driverResult[x]['avPosition'] = driverResult[x]['avPosition'] + parseInt(result['position']);
        }
        else
          driverResult[x] = {
            'multiply' : 1,
            'finalPoints' : parseInt(result['points']),
            'finalPosition' : 10,
            'avGrid' : parseInt(result['grid']),
            'avPosition' : parseInt(result['position']),
          };

        $(`#season-standings-driver-tr-${x}-round-${race['round']}`).append(`
           ${result['position']}<br>
          <div class="text-smaller">${result['points']}<span class="text-smaller">pts</span></div>
          <div class="season-standings-moreinfo">
            <span class="text-smaller">Q3:</span> ${result['grid']}<br>
            <span class="text-smaller">Cumulative:</span> ${driverResult[x]['finalPoints']}pts
          </div>
          `);
      });

    });


    // GET FUTURE RACES AVERAGES (MAP FUNCTION FROM https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays)
    Object.keys(driverResult).map(key => {
      driverResult[key] = {
        ...driverResult[key],
        'avGrid': (driverResult[key]['avGrid'] / driverResult[key]['multiply']),
        'avPosition': (driverResult[key]['avPosition'] / driverResult[key]['multiply']),
        'predictedRaces' : []
      };
    });


    // START LOOKING AT THE PREVIOUS TWO RACES
    $.when(
      $.getJSON(`https://ergast.com/api/f1/${season}.json?limit=100&offset=${races.length}`),
      $.getJSON(`https://ergast.com/api/f1/${season-1}/results.json?limit=2000`),
      $.getJSON(`https://ergast.com/api/f1/${season-2}/results.json?limit=2000`)
    ).then(
        function(thisSeason, lastSeason, twoSeason) {

          // DRILL DOWN INTO RETURNED OBJECTS
          thisSeason = thisSeason[0]['MRData']['RaceTable']['Races'];
          lastSeason = lastSeason[0]['MRData']['RaceTable']['Races'];
          twoSeason = twoSeason[0]['MRData']['RaceTable']['Races'];

          // LOOP THRU EACH OF THE REMAINING ROUNDS
          thisSeason.forEach((thisSeason_round, thisSeason_roundId) => {


            // USE THIS TO FIND DRIVER RESULT FOR LAST YEAR AT THAT TRACK..
            let lastSeasonsTrackResult = lastSeason.find(key => key['Circuit']['circuitId'] === thisSeason_round['Circuit']['circuitId']);
            let twoSeasonsTrackResult = twoSeason.find(key => key['Circuit']['circuitId'] === thisSeason_round['Circuit']['circuitId']);


            // ADD CIRCUIT NAME TO THEAD
            $('#season-standings table thead tr').append(`
              <th class="text-upper color-black-bg">
                ${(CIRCUITS[thisSeason_round['Circuit']['circuitId']]) ? `<img src="assets/img/circuits/${CIRCUITS[thisSeason_round['Circuit']['circuitId']]['track-outline']}" class="season-stangings-circuit-future">` : `<div class="color-white text-bold">${thisSeason_round['round']}</div>` }
                ${dateFormat(thisSeason_round['date'], "d")}
                <div class="text-smaller">${dateFormat(thisSeason_round['date'], "mmm")}</div>
              </th>`);


            // LOOP FOR EACH OF THE DRIVERS RESULTS FOR THIS RACE (DRIVERS TAKEN FROM RACE 1 RESULTS)
            races[0]['Results'].forEach((result) => {


              // SEE IF DRIVER TOOK PART IN LAST YEARS RACE
              // WORK OUT AVERAGE FINISH THIS YEAR IF NO VALUE
              let lastSeasonDriverResult = driverResult[result['number']]['avPosition']; // MAKE MIDDLE OF THE ROAD IF NO PREVIOUS RACE
              let lastSeasonDriverGrid = driverResult[result['number']]['avGrid']; // MAKE MIDDLE OF THE ROAD IF NO PREVIOUS RACE

              let twoSeasonDriverResult = driverResult[result['number']]['avPosition']; // MAKE MIDDLE OF THE ROAD IF NO PREVIOUS RACE
              let twoSeasonDriverGrid = driverResult[result['number']]['avGrid']; // MAKE MIDDLE OF THE ROAD IF NO PREVIOUS RACE


              if (lastSeasonsTrackResult) {
                for (i=0; i < lastSeasonsTrackResult['Results'].length; i++) {
                  if (lastSeasonsTrackResult['Results'][i]['number'] === result['number']) {
                      lastSeasonDriverResult = parseFloat(lastSeasonsTrackResult['Results'][i]['position']);
                      lastSeasonDriverGrid = parseFloat(lastSeasonsTrackResult['Results'][i]['grid']);
                      break;
                    }
                }
              }

              if (twoSeasonsTrackResult) {
                for (i=0; i < twoSeasonsTrackResult['Results'].length; i++) {
                  if (twoSeasonsTrackResult['Results'][i]['number'] === result['number']) {
                      twoSeasonDriverResult = parseFloat(twoSeasonsTrackResult['Results'][i]['position']);
                      twoSeasonDriverGrid = parseFloat(twoSeasonsTrackResult['Results'][i]['grid']);
                      break;
                    }
                }
              }


              // MATHS FOR PREDICTADED SCORE - CALCULATE WEIGHTED RESULT
              let weightedTotal =
                (driverResult[result['number']]['avPosition']*1) +
                (driverResult[result['number']]['avGrid']*0.6) +
                (lastSeasonDriverResult*0.3) +
                (lastSeasonDriverGrid*0.1) +
                (twoSeasonDriverResult*0.3) +
                (twoSeasonDriverGrid*0.1);


              driverResult[result['number']]['predictedRaces'][thisSeason_roundId] = {
                'position' : driverResult[result['number']]['avPosition'],
                'grid' : driverResult[result['number']]['avGrid'],
                'previous' : lastSeasonDriverResult,
                'previousGrid' : lastSeasonDriverGrid,
                'twoPrevious' : twoSeasonDriverResult,
                'twoPreviousGrid' : twoSeasonDriverGrid,
                'total' : weightedTotal,
                'rankPosition' : 10,
              };

            });


            // AFTER ALL DRIVERS FOR THIS ROUND ARE COMPLETE WORK OUT THE RANK FOR EACH ONE
            Object.keys(driverResult).map(driverId => {
              for (let driverIdCompare in driverResult) {

                let driverForCompare = driverResult[driverId]['predictedRaces'][thisSeason_roundId];
                let driverBenchmark = driverResult[driverIdCompare]['predictedRaces'][thisSeason_roundId];

                driverResult[driverId]['predictedRaces'][thisSeason_roundId]['rankPosition'] += (driverForCompare['total'] < driverBenchmark['total']) ? -0.5 : 0.5;
              }

              // CALCULATE POINTS FOR TOP 10
              calculatedPoints = calculateRacePoints(driverResult[driverId]['predictedRaces'][thisSeason_roundId]['rankPosition']);


              driverResult[driverId]['predictedRaces'][thisSeason_roundId]['points'] = calculatedPoints;

              driverResult[driverId]['predictedRaces'][thisSeason_roundId]['curPoints'] = driverResult[driverId]['finalPoints'] + calculatedPoints;
              // ADD UP CUMULATIVE POINTS
              driverResult[driverId]['finalPoints'] = driverResult[driverId]['finalPoints'] + calculatedPoints;

            });

          });

          // CALCULATE FINAL SEASON POSITION
          Object.keys(driverResult).map(driverId => {
            for (let driverIdCompare in driverResult) {
              driverResult[driverId]['finalPosition'] += (driverResult[driverId]['finalPoints'] > driverResult[driverIdCompare]['finalPoints']) ? -0.5 : 0.5;
            }
          });


          for (let driverId in driverResult) {

            driverResult[driverId]['predictedRaces'].forEach(thisResult => {
              $(`#season-standings-driver-tr-${driverId}`).append(`
                <td class="color-red">
                  ${(thisResult['rankPosition'])}<br>
                  <div class="text-smaller">${(thisResult['points'])}<span class="text-smaller">pts</span></div>

                  <div class="season-standings-moreinfo">
                    <span class="text-smaller">Average #:</span> ${driverResult[driverId]['avPosition'].toFixed(2)}<br>
                    <span class="text-smaller">Average Q3:</span> ${driverResult[driverId]['avGrid'].toFixed(2)}<br>
                    <span class="text-smaller">Previous #:</span> ${thisResult['previous'].toFixed(0)}<br>
                    <span class="text-smaller">Previous Q3:</span> ${thisResult['previousGrid'].toFixed(0)}<br>
                    <span class="text-smaller">Two Previous #:</span> ${thisResult['twoPrevious'].toFixed(0)}<br>
                    <span class="text-smaller">Two Previous Q3:</span> ${thisResult['twoPreviousGrid'].toFixed(0)}<br>
                    <span class="text-smaller">Score:</span> ${thisResult['total'].toFixed(3)}<br>
                    <span class="text-smaller">Cumulative:</span> ${thisResult['curPoints']}pts
                  </div>
                </td>`);
            });
          }


          // SHOW FINAL RESULTS
          $('#season-standings table thead tr').append(`<th class="color-red-bg">FINAL</th>`);
          for (let driverId in driverResult) {
            $(`#season-standings-driver-tr-${driverId}`).append(`
              <td>
                <div class="${((driverResult[driverId]['finalPosition']) <= 3) ? `color-red-bg color-white` : ``}">${(driverResult[driverId]['finalPosition'])}</div>
                ${(driverResult[driverId]['finalPoints'])}<span class="text-smaller">pts</span>
              </td>`);
          };

          $('#season-standings table tbody td').click(function() {
            $('.season-standings-moreinfo',this).slideToggle();
          });


       },
        function(e) {
            showErrors(`Error getting list of future rounds for current season (${e['statusText']})`);
            $(`#season-standings`).html(`No results avaliable`);
        }
    );
  },
  function(e) {
    showErrors(`Sorry there was a problem getting the season reults`);
    $(`#season-standings`).html(`No results avaliable`);
  });
}


// GET RACE RESULTS READY TO BE DRAWN
function raceResults(season, round) {

  $.when($.getJSON(`https://ergast.com/api/f1/${season}/${round}/results.json`)).then(function(response) {

    let race = response['MRData']['RaceTable']['Races'][0];

    $('main').html(`
      <section id="race-standings"></section>
      <section id="head2head"></section>
      <section id="track-details"></section>`);

    $('h1').html(race['raceName'] + ' - Round ' + round + ', ' + season);

    drawCircuit(race['Circuit']);
    drawRaceStandings(race['Results']);
    headToHead(race['Results'][0], race['Results'][1]);
  },
  function(e) {
    showErrors(`Sorry there was a problem getting the race results`);
    $(`#race-standings`).html(`No data avaliable`);
  });
}


// CHANGE ROUND LIST TO THE SEASON YEAR CLICKED ON
function changeSeason(season) {
    F1_SEASON = season;
    $(`#nav-season li`).removeClass('color-black-bg');
    $(`#nav-season-${season}`).addClass('color-black-bg');
    $('h1').html(`${F1_SEASON} Season roundup`);

    navRounds(season);
    seasonResults(season);
}


// PROBLEM - SELECTED ROUND DOES NOT WORK
function changeRound(round) {
    F1_ROUND = round;
    $(`#nav-round li`).removeClass('color-red-bg');
    $(`#nav-round-${F1_SEASON}-${F1_ROUND}`).addClass('color-red-bg');

    raceResults(F1_SEASON, F1_ROUND);
}


// SHOW ALL ROUNDS FOR A GIVEN SEASON ON NAV BAR
function navRounds(season) {
  $.when($.getJSON(`https://ergast.com/api/f1/${season}.json`)).then(function(response) {

    // ADD MOBILE DROP DOWN LINK
    $('#nav-round').html(`<li id="nav-round-mobile-more" class="color-white" onClick="$('#nav-round').css({'height':'100%'})"><i class="fas fa-angle-double-down"></i></li>`);

    let dateNowcheck = new Date();

    response['MRData']['RaceTable']['Races'].forEach(round => {

      let pastRace = (Date.parse(round['date']+' '+round['time']) < dateNowcheck);

      $('#nav-round').append(`
          <li id="nav-round-${season}-${round['round']}" ${(pastRace) ? `class="nav-round-past" onClick="changeRound(${round['round']})"` : 'class="nav-round-future"'}>
              ${(CIRCUITS[round['Circuit']['circuitId']]) ? `<img src="assets/img/circuits/nav/${CIRCUITS[round['Circuit']['circuitId']]['track-outline']}" alt="${round['raceName']}" class="nav-round-circuit">` : `<div class="color-white text-bold">${round['round']}</div>` }
              <div class="nav-round-hover color-white-bg">
                <div class="nav-round-num">${round['round']}</div>
                <div class="nav-round-name">${round['raceName']}</div>
                <div class="nav-round-date">${dateFormat(round['date']+' '+round['time'], "dS mmm HH:MM")}</div>
                ${(CIRCUITS[round['Circuit']['circuitId']]) ? `<div><img src="https://www.countryflags.io/${CIRCUITS[round['Circuit']['circuitId']]['countryCode']}/flat/64.png"></div>` : `` }
                ${round['Circuit']['Location']['country']}
              </div>
          </li>`);
    });

    // ADD UNDERLINE TO MOST RECENT RACE
    $(`#nav-round-${F1_CURRENT_SEASON}-${F1_ROUND}`).addClass('nav-round-current');

    // SHOW EXTRA ROUND INFO ON HOVER
    $("#nav-round li").mouseenter(function() { $('.nav-round-hover',this).fadeTo(300,0.9); }).mouseleave(function() { $('.nav-round-hover',this).fadeOut(100); });

  },
  function(e) {
    showErrors(`Sorry there was a problem getting the list of rounds`);
    $(`#nav-round`).html(`<li>No data avaliable</li>`);
  });
}


// SETUP GLOBAL VARS READY TO BE ASSIGNED
var F1_ROUND, F1_SEASON, F1_HEAD2HEAD_1, F1_HEAD2HEAD_2, F1_CURRENT_SEASON, F1_CURRENT_ROUND;


// WHEN DOCUMENT IS READY LOAD API
$(document).ready(function() {

  // GET FIRST JSON CALL FOR SEASON AND ROUND NUMBERS
  $.when($.getJSON(`https://ergast.com/api/f1/current/last/results.json`)).then(function(response) {

    F1_CURRENT_SEASON = F1_SEASON = response['MRData']['RaceTable']['season'];
    F1_CURRENT_ROUND = F1_ROUND = response['MRData']['RaceTable']['round'];

    for (let i = parseInt(new Date().getFullYear()); i >= 2010; i--) {
      $('#nav-season').append(`<li id="nav-season-${i}" onClick="changeSeason(${i})">${i}</li>`);
    }

    $(`#nav-season-${F1_SEASON}`).addClass('nav-season-current');

    navRounds(F1_SEASON);
  },
  function(e) {
    showErrors(`Error getting current season and round`);
    $(`main`).html(`No data avaliable`);
  });



});
