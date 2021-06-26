const circuits = {
    'bahrain' : {
        'track-outline' : 'monaco.png',
        'track-sectors' : 'monaco-sectors.png',
        'countryCode' : 'BH' },
    'imola' : {
        'track-outline' : 'monaco.png',
        'track-sectors' : 'monaco-sectors.png',
        'countryCode' : 'IT' },
    'portimao' : {
        'track-outline' : 'monaco.png',
        'track-sectors' : 'monaco-sectors.png',
        'countryCode' : 'PT' },
    'catalunya' : {
        'track-outline' : 'monaco.png',
        'track-sectors' : 'monaco-sectors.png',
        'countryCode' : 'ES' },
    'monaco' : {
        'track-outline' : 'monaco.png',
        'track-sectors' : 'monaco-sectors.png',
        'countryCode' : 'MC' },
    'BAK' : {
        'track-outline' : 'azerbaijan.png',
        'track-sectors' : 'azerbaijan-sectors.png',
        'countryCode' : 'AZ' },
    'ricard' : {
        'track-outline' : '',
        'track-sectors' : '',
        'countryCode' : 'FR' },
    'red_bull_ring' : {
        'track-outline' : '',
        'track-sectors' : '',
        'countryCode' : 'AT' },
    'silverstone' : {
        'track-outline' : '',
        'track-sectors' : '',
        'countryCode' : 'GB' },
    'hungaroring' : {
        'track-outline' : '',
        'track-sectors' : '',
        'countryCode' : 'HU' },
    'spa' : {
        'track-outline' : '',
        'track-sectors' : '',
        'countryCode' : 'BE' },
    'zandvoort' : {
        'track-outline' : '',
        'track-sectors' : '',
        'countryCode' : 'NL' },
    'monza' : {
        'track-outline' : '',
        'track-sectors' : '',
        'countryCode' : 'IT' },
    'sochi' : {
        'track-outline' : '',
        'track-sectors' : '',
        'countryCode' : 'RU' },
    'marina_bay' : {
        'track-outline' : '',
        'track-sectors' : '',
        'countryCode' : 'SG' },
    'suzuka' : {
        'track-outline' : '',
        'track-sectors' : '',
        'countryCode' : 'JP' },
    'americas' : {
        'track-outline' : '',
        'track-sectors' : '',
        'countryCode' : 'US' },
    'rodriguez' : {
        'track-outline' : '',
        'track-sectors' : '',
        'countryCode' : 'MX' },
    'interlagos' : {
        'track-outline' : '',
        'track-sectors' : '',
        'countryCode' : 'BR' },
    'albert_park' : {
        'track-outline' : '',
        'track-sectors' : '',
        'countryCode' : 'AU' },
    'jeddah' : {
        'track-outline' : '',
        'track-sectors' : '',
        'countryCode' : 'SA' },
    'yas_marina' : {
        'track-outline' : '',
        'track-sectors' : '',
        'countryCode' : 'AE' },


};


const countryFlags = [
    {
        'nationality' : 'Dutch',
        'code' : 'NL'
    },
    {
        'nationality' : 'Spanish',
        'code' : 'ES'
    },
    {
        'nationality' : 'British',
        'code' : 'GB'
    },
    {
        'nationality' : 'Mexican',
        'code' : 'MX'
    },
    {
        'nationality' : 'German',
        'code' : 'DE'
    },
    {
        'nationality' : 'Canadian',
        'code' : 'CA'
    },
    {
        'nationality' : 'French',
        'code' : 'FR'
    },
    {
        'nationality' : 'Italian',
        'code' : 'IT'
    },
    {
        'nationality' : 'Finnish',
        'code' : 'FI'
    },
    {
        'nationality' : 'Australian',
        'code' : 'AU'
    },
    {
        'nationality' : 'Japanese',
        'code' : 'JP'
    },
    {
        'nationality' : 'Russian',
        'code' : 'RU'
    },
    {
        'nationality' : 'Thai',
        'code' : 'TH'
    },
    {
        'nationality' : 'Danish',
        'code' : 'DK'
    },
    {
        'nationality' : 'Polish',
        'code' : 'PL'
    },
    {
        'nationality' : 'Belgian',
        'code' : 'BE'
    },
    {
        'nationality' : 'Swedish',
        'code' : 'SE'
    },
    {
        'nationality' : 'Brazilian',
        'code' : 'BR'
    },
    {
        'nationality' : 'New Zealander',
        'code' : 'NZ'
    },
    {
        'nationality' : 'Monegasque',
        'code' : 'MC'
    }
];


// SHOW NON-FATAL ERRORS
function showErrors(e) {
    $('#errors').html(e);
    $('#errors').slideDown('slow');
    // console.log(`ERROR`, e)
}


// JSON CALL FUNCTION. RETURN ERROR IF NEEDED
function jsonCall(url,callback, error = 'Default error', errorCallBack){
    $.when($.getJSON(url)).then(
        function(response) {
            console.log(`JSON SUCCESS: ${url}`,response);
            callback(response);
       },
        function(e) {
            console.log(`JSON ERROR:`,error,e);
            showErrors(`${error} (${e['statusText']})`);
            errorCallBack(`${error}`);
        }
    );
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


function drawCircuit(c) {

    $('#body h1').html(c['circuitName']);
    // $('#track').attr("src",`assets/img/${c['circuitId']}.png`);
    // $('#track-sectors').attr("src",`assets/img/${c['circuitId']}-sectors.png`);
    if (circuits[c['circuitId']]) {
        $('#track').attr("src",`assets/img/${circuits[c['circuitId']]['track-outline']}`);
        $('#track-sectors').attr("src",`assets/img/${circuits[c['circuitId']]['track-sectors']}`);
    }
    else {
        $('#track').attr("src",``);
        $('#track-sectors').attr("src",``);
    }
    googleMap(c['Location']['lat'],c['Location']['long'],'map');
}


// ERROR WHEN THERE ARE NO LAPS DRIVEN
function drawDriversLapTimes(driverId, containerId) {

    jsonCall(`https://ergast.com/api/f1/${F1_SEASON}/${F1_ROUND}/drivers/${driverId}/laps.json?limit=200`, function(response) {

        let ctx = document.getElementById(containerId).getContext('2d'); // HAS ERROR ON CONSOLE
        let labelsArray = [];
        let dataArrayTimes = [];
        let dataArrayPosition = [];

        response['MRData']['RaceTable']['Races'][0]['Laps'].forEach(lap => {
            labelsArray.push(lap['number']);

            let tempTimeSplit = lap['Timings'][0]['time'].split(":"); // FIX IN THE MS2 BOOKMARKS
            let tempTime = (parseFloat(tempTimeSplit[0])*60)+parseFloat(tempTimeSplit[1]);
            if (tempTime > 300) tempTime = 300;

            dataArrayTimes.push(tempTime);
            dataArrayPosition.push(lap['Timings'][0]['position']);
        });


        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labelsArray,
                datasets: [
                    {
                        label: 'Lap time (s)',
                        data: dataArrayTimes,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        yAxisID: 'y',
                    },
                    {
                        label: 'Track position',
                        data: dataArrayPosition,
                        borderColor: 'rgba(0, 0, 132, 0.3)',
                        borderWidth: 1,
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
                        min:1,
                        max:20,
                        grid: {
                            drawOnChartArea: false,
                        },
                    },
                }
            }
        });
    },
    'Sorry there was a problem getting the driver lap times. Please try again',
    (e) => $(`#${containerId}`).replaceWith(`<span class="color-accent-bg color-light text-upper text-bold text-pad">${e}</span>`));
}



    function drawRaceStandings(r) {
        $('#race-standings tbody').empty();
        r.forEach((e, key) => {

            let flag = countryFlags.find(i => i['nationality'] === e['Driver']['nationality']);
            let flagImg = (flag) ? `<img src="https://www.countryflags.io/${flag['code']}/flat/24.png" alt="${e['Driver']['nationality']}">` : '';
            let gain = parseInt(e['grid'])-parseInt(e['position']);

            $('#race-standings tbody').append(`<tr>
                <td>${e['position']}</td>
                <td>${e['number']}</td>
                <td>${e['Driver']['nationality']}</td>
                <td>${flagImg}</td>
                <td>${e['Driver']['givenName']} ${e['Driver']['familyName']}</td>
                <td><img src="assets/img/constructors/${e['Constructor']['constructorId']}.png" width="50"></td>
                <td>${e['Constructor']['name']}</td>
                <td>${e['points']}</td>
                <td>
                    <button class="button head2head-select1" data-key="${key}">a</button>
                    <button class="button head2head-select2" data-key="${key}">b</button>
                </td>
                <td>${e['grid']}</td>
                <td>${gain}</td>
                <td>${(gain >= 1) ? '<i class="fas fa-angle-double-up"></i>' : (gain < 0) ? '<i class="fas fa-angle-double-down"></i>' : '' }</td>
                <td>${('Time' in e) ? e['Time']['time'] : ''}</td>
                <td>${(e['status'] === 'Finished') ? '<i class="fas fa-flag-checkered"></i>' : e['status'] }</td>
            </tr>`);
        });

        $(".head2head-select1").click(function() {
            headToHead(r[this.dataset.key],F1_HEAD2HEAD_2);
        });

        $(".head2head-select2").click(function() {
            headToHead(F1_HEAD2HEAD_1,r[this.dataset.key]);
        });
    }


    function headToHead(one,two) {


        F1_HEAD2HEAD_1 = one;
        F1_HEAD2HEAD_2 = two;

        let drivers = [one,two]; // old way was to have a for loop and i be either 1 or 2 to match the input one or two

        drivers.forEach((driver,key) => {
            let idNum = key + 1; // ++ was the wrong side of key
            let flag = countryFlags.find(key => key['nationality'] === driver['Driver']['nationality']);
            let gain = parseInt(driver['grid'])-parseInt(driver['position']);
            let otherDriver = (key == 0) ? drivers[1] : drivers[0];
            //<span class="text-smaller">${(driver['position'] < otherDriver['position']) ? '+' : 'red'}</span>

            $(`#head2head-${idNum}`).html(`
                <img class="head2head-car" src="assets/img/constructors/${driver['Constructor']['constructorId']}.png">
                <h3>${driver['Driver']['familyName']} [${driver['Driver']['permanentNumber']}]</h3>
                <img class="head2head-flag" src="https://www.countryflags.io/${flag['code']}/flat/64.png" alt="${driver['Driver']['nationality']}">

                <div class="head2head-position">#${driver['position']}</div>
                <div class="head2head-points">${driver['points']} pts</div>
                <div class="head2head-grid">${gain} ${(gain >= 1) ? '<i class="fas fa-angle-double-up"></i>' : (gain < 0) ? '<i class="fas fa-angle-double-down"></i>' : '' }</div>

                ${ (driver['FastestLap']) ? `
                    <div class="head2head-fastestLap">Fastest Lap ${driver['FastestLap']['Time']['time']} (#${driver['FastestLap']['rank']})</div>
                    <div class="head2head-averageSpeek">${driver['FastestLap']['AverageSpeed']['speed']}${driver['FastestLap']['AverageSpeed']['units']}</div>` : `` }

                <h4>Lap Times</h4>
                <canvas id="head2head-laptimes-${idNum}" width="400" height="400"></canvas>
                `);

            $(`#head2head-${idNum}`).slideDown('slow');
            drawDriversLapTimes(driver['Driver']['driverId'],`head2head-laptimes-${idNum}`);
        });

    }




// GET RACE WIKI
function getWikiInfo(url) {
    $.when($.getJSON(`https://en.wikipedia.org/w/api.php?action=parse&page=2021_Monaco_Grand_Prix&format=json&origin=*`)).then(
        function(wiki) {
            wiki = wiki['parse'];
            console.log('SUCCESS WIKI',wiki);
            $('#wiki').html(wiki['externallinks'][0]);

            let imageURL = '';
            wiki['images'].forEach(img => {
                imageURL += `|File:${img}`;
            });

            $.when($.getJSON(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url&titles=${imageURL}&origin=*`)).then(
                function(wiki) {
                    wiki = wiki['query']['pages'];
                    console.log('SUCCESS WIKI IMG',wiki);
                    for (let key in wiki) {
                        $('#wiki').append(`<img src="${wiki[key]['imageinfo'][0]['url']}" width="100">`);
                        // console.log(wiki[i]);
                    };

                },
                function(e) {
                    console.log('ERROR IMG WIKI',e);
                    showErrors('Error getting WIKI images');
                }
            );

        },
        function(e) {
            console.log('ERROR WIKI',e);
            showErrors(e['statusText']);
        }
    );
}




    // GAME WHERE YOU GUESS WHERE CARS FINISH BEFORE THE TABLE IS MATCHED UP. POINTS FOR EACH ONE RIGHT.



// races[0]['Results'].forEach((driver,driverId) => {
//   console.log('xxxx',race['Results'].find(i => i['number'] == driverId));
// });
function newseasonResults(season) {


  jsonCall(`https://ergast.com/api/f1/${season}/results.json?limit=5000`, function(response) {
      let races = response['MRData']['RaceTable']['Races'];
      let driverResult = {};

      // DRIVER NAMES BASED ON WHO WON FIRST RACE
      races[0]['Results'].forEach((driver,driverId) => {
        $('#season-standings tbody').append(`<tr id="season-standings-driver-tr-${driver['number']}"><th>${driver['Driver']['familyName']}</th></tr>`);
      });


      // PAST RACES WITH ACTUAL RESULTS
      races.forEach((race,raceId) => {

        // RACE HEADERS
        $('#season-standings thead tr').append(`<th id="season-standings-tr-${race['round']}">${race['raceName']}</th>`);

        // RACE RESULTS

        race['Results'].forEach((result,resultId) => {

// ????????? DELETE lowest result?

          if (result['laps'] > 1) {

            if (result['number'] in driverResult) {
                driverResult[result['number']]['multiply'] = driverResult[result['number']]['multiply'] + 1;
                driverResult[result['number']]['finalPoints'] = driverResult[result['number']]['finalPoints'] + parseInt(result['points']);
                driverResult[result['number']]['avGrid'] = driverResult[result['number']]['avGrid'] + parseInt(result['grid']);
                driverResult[result['number']]['avPosition'] = driverResult[result['number']]['avPosition'] + parseInt(result['position']);
            }
            else
              driverResult[result['number']] = {
                'multiply' : 1,
                'finalPoints' : parseInt(result['points']),
                'finalPosition' : 10,
                'avGrid' : parseInt(result['grid']),
                'avPosition' : parseInt(result['position']),
              };


            $(`#season-standings-driver-tr-${result['number']}`).append(`
              <td class="color-light-bg">
                #${result['position']}<br>
                ${result['points']}pts<br>
                Q3: ${result['grid']}<br>
                <hr>
                Cumulative points: ${driverResult[result['number']]['finalPoints']}
              </td>`);
          }
          else {
            $(`#season-standings-driver-tr-${result['number']}`).append(`<td class="color-accent-bg">Points: ${result['points']} <br>Grid: ${result['grid']}</td>`);//position
          }
        });

      });

// ??????????????????? SHOUD WE DELETE THE LOWEST RESULT

      // GET FUTURE RACES AVERAGES
      // BELOW IS FROM https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
      // https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
      Object.keys(driverResult).map(function(key, index) {

        // driverResult[key] = {
        //   'multiply' : driverResult[key]['multiply'],
        //   'avGrid' : (Math.round(((driverResult[key]['avGrid'] / driverResult[key]['multiply']) + Number.EPSILON) * 1000) / 1000),
        //   'avPosition' : (Math.round(((driverResult[key]['avPosition'] / driverResult[key]['multiply']) + Number.EPSILON) * 1000) / 1000),
        //   'predictedRaces' : [],
        //   //'rankPosition' : 10,
        //   //'rankPoints' : 10,
        //   //'rankGrid' : 11, // THIS WAS A PAIN TO DO INCLUDING THE +0.5 BELOW.
        // };
        driverResult[key]['avGrid'] = (Math.round(((driverResult[key]['avGrid'] / driverResult[key]['multiply']) + Number.EPSILON) * 1000) / 1000);
        driverResult[key]['avPosition'] = (Math.round(((driverResult[key]['avPosition'] / driverResult[key]['multiply']) + Number.EPSILON) * 1000) / 1000);
        driverResult[key]['predictedRaces'] = [];


        // for (element of ['avPoints','avGrid','avFastest','avSpeed']) {
        //   driverResult[key][element] = (Math.round(((driverResult[key][element] / driverResult[key]['multiply']) + Number.EPSILON) * 10) / 10);
        // };
        // driverResult[key]['rankPoints'] = 10;
      });


      // FIND HIGHEST FOR EACH VALUE

      // Object.keys(driverResult).map(driverId => {
      //   for (driverIdCompare in driverResult) {
      //     driverResult[driverId]['rankPoints'] = (driverResult[driverId]['avPoints'] > driverResult[driverIdCompare]['avPoints']) ? driverResult[driverId]['rankPoints']-0.5 : driverResult[driverId]['rankPoints']+0.5;
      //     driverResult[driverId]['rankGrid'] = (driverResult[driverId]['avGrid'] > driverResult[driverIdCompare]['avGrid']) ? driverResult[driverId]['rankGrid']+0.5 : driverResult[driverId]['rankGrid']-0.5;
      //     driverResult[driverId]['rankPosition'] = (driverResult[driverId]['avPosition'] > driverResult[driverIdCompare]['avPosition']) ? driverResult[driverId]['rankPosition']+0.5 : driverResult[driverId]['rankPosition']-0.5;
      //   };
      // });


console.log(driverResult);


$.when(
  $.getJSON(`https://ergast.com/api/f1/${season}.json?limit=100&offset=${races.length}`),
  $.getJSON(`https://ergast.com/api/f1/${season-1}/results.json?limit=2000`)
).then(
    function(thisSeason,lastSeason) {
      thisSeason = thisSeason[0]['MRData']['RaceTable']['Races'];
      lastSeason = lastSeason[0]['MRData']['RaceTable']['Races'];

      console.log(`THIS SEASON`,thisSeason);
      console.log(`LAST SEASON`,lastSeason);


      thisSeason.forEach((thisSeason_round, thisSeason_roundId) => {

        // ADD CIRCUIT NAME FOR THEAD
        let lastSeasonsTrackResult = lastSeason.find(key => key['Circuit']['circuitId'] === thisSeason_round['Circuit']['circuitId']);

        // USE THIS TO FIND DRIVER RESULT FOR LAST YEAR AT THAT TRACK..

        $('#season-standings thead tr').append(`<th id="season-standings-tr-${thisSeason_round['round']}">${thisSeason_round['raceName']}<hr>${thisSeason_round['Circuit']['circuitId']}<hr>${(lastSeasonsTrackResult) ? lastSeasonsTrackResult['date'] : ''}</th>`);


        // LOOP FOR EACH OF THE DRIVERS RESULTS FOR THIS RACE (DRIVERS TAKEN FROM RACE 1 RESULTS)
        races[0]['Results'].forEach((result) => {


          // SEE IF DRIVER TOOK PART IN LAST YEARS RACE
          // WORK OUT AVERAGE FINISH THIS YEAR IF NO VALUE
          let lastSeasonDriverResult = driverResult[result['number']]['avPosition']; // MAKE MIDDLE OF THE ROAD IF NO PREVIOUS RACE
          let lastSeasonDriverGrid = driverResult[result['number']]['avGrid']; // MAKE MIDDLE OF THE ROAD IF NO PREVIOUS RACE
          // ADD LAST YEAR GRID

          if (lastSeasonsTrackResult) {
            for (i=0; i < lastSeasonsTrackResult['Results'].length; i++) {
              if (lastSeasonsTrackResult['Results'][i]['number'] === result['number']) {
                  lastSeasonDriverResult = lastSeasonsTrackResult['Results'][i]['position'];
                  lastSeasonDriverGrid = lastSeasonsTrackResult['Results'][i]['grid'];
                  break;
                }
            }
          }


          // MATHS FOR PREDICTADED SCORE - CALCULATE WEIGHTED RESULT
          // let weightedPosition = (driverResult[result['number']]['avPosition']);
          // let weightedGrid = (driverResult[result['number']]['avGrid']) * 0.5;
          // let weightedPrevious = (lastSeasonDriverResult) * 0.3;

          let weightedTotal = (driverResult[result['number']]['avPosition']) + (driverResult[result['number']]['avGrid']*0.5) + (lastSeasonDriverResult*0.3) + (lastSeasonDriverGrid*0.3);


          driverResult[result['number']]['predictedRaces'][thisSeason_roundId] = {
            'position' : driverResult[result['number']]['avPosition'],
            'grid' : driverResult[result['number']]['avGrid'],
            'previous' : lastSeasonDriverResult,
            'previousGrid' : lastSeasonDriverGrid,
            'total' : weightedTotal,
            'rankPosition' : 10,
          };

        });

        // AFTER ALL DRIVERS FOR THIS ROUND ARE COMPLETE WORK OUT THE RANK FOR EACH ONE
        Object.keys(driverResult).map(driverId => {
          for (driverIdCompare in driverResult) {

            let driverForCompare = driverResult[driverId]['predictedRaces'][thisSeason_roundId];
            let driverBenchmark = driverResult[driverIdCompare]['predictedRaces'][thisSeason_roundId];

            driverResult[driverId]['predictedRaces'][thisSeason_roundId]['rankPosition'] += (driverForCompare['total'] < driverBenchmark['total']) ? -0.5 : 0.5;
          };

          // CALCULATE POINTS FOR TOP 10
          switch(driverResult[driverId]['predictedRaces'][thisSeason_roundId]['rankPosition']) {
            case 1: calculatedPoints = 25; break;
            case 2: calculatedPoints = 18; break;
            case 3: calculatedPoints = 16; break;
            case 4: calculatedPoints = 12; break;
            case 5: calculatedPoints = 10; break;
            case 6: calculatedPoints = 8; break;
            case 7: calculatedPoints = 6; break;
            case 8: calculatedPoints = 4; break;
            case 9: calculatedPoints = 2; break;
            case 10: calculatedPoints = 1; break;
            default : calculatedPoints = 0;
          };


          driverResult[driverId]['predictedRaces'][thisSeason_roundId]['points'] = calculatedPoints;

          driverResult[driverId]['predictedRaces'][thisSeason_roundId]['curPoints'] = driverResult[driverId]['finalPoints'] + calculatedPoints;
          // ADD UP CUMULATIVE POINTS
          driverResult[driverId]['finalPoints'] = driverResult[driverId]['finalPoints'] + calculatedPoints;

        });

      });

      // CALCULATE FINAL SEASON POSITION
      Object.keys(driverResult).map(driverId => {
        for (driverIdCompare in driverResult) {
          driverResult[driverId]['finalPosition'] += (driverResult[driverId]['finalPoints'] > driverResult[driverIdCompare]['finalPoints']) ? -0.5 : 0.5;
        };
      });

      console.log(driverResult);

      for (driverId in driverResult) {
        driverResult[driverId]['predictedRaces'].forEach(thisResult => {
          $(`#season-standings-driver-tr-${driverId}`).append(`
            <td class="color-accent">
              Average # ${driverResult[driverId]['avPosition']}<br>
              Average Q3: ${driverResult[driverId]['avGrid']}<br>
              Previous # ${(thisResult['previous'])}<br>
              Previous Q3: ${(thisResult['previousGrid'])}<br>
              = ${(thisResult['total'])}
              <hr>
              Prediction<br>
              # ${(thisResult['rankPosition'])}<br>
              ${(thisResult['points'])}pts
              <hr>
              Cumulative points: ${Math.round(thisResult['curPoints'])}

            </td>`);
        });
      };

   },
    function(e) {
        console.log(`JSON ERROR:`,e);
        showErrors(`Error getting list of future rounds for current season (${e['statusText']})`);
    }
);







  },
  'Error getting season results',
  (e) => $(`#race-standings tbody`).html(`<tr><td colspan="14" class="color-accent text-upper text-bold">${e}</td></tr>`));
}
newseasonResults(2021);








function raceResults(season, round) {

    // F1_SEASON = season;
    // F1_ROUND = round;

    $('nav ul').slideUp('slow');

    jsonCall(`https://ergast.com/api/f1/${season}/${round}/results.json`, function(response) {

        let race = response['MRData']['RaceTable']['Races'][0];

        if (!race) {
            showErrors('Array Empty');
            return;
        }

        $('h1 > span').html(`${season} Season | Round ${round} | ${ race['raceName'] }`);

        drawCircuit(race['Circuit']);


        drawRaceStandings(race['Results']);
        // drawDriversLapTimes(race['Results'][0]['Driver']['driverId']);// DO THIS AS A MODAL POPUP FOR EACH DRIVER
        headToHead(race['Results'][0], race['Results'][1]);
    },
    'Error getting race results',
    (e) => $(`#race-standings tbody`).html(`<tr><td colspan="14" class="color-accent text-upper text-bold">${e}</td></tr>`));
}


// CHANGE ROUND LIST TO THE SEASON YEAR CLICKED ON
function changeSeason(season) {
    F1_SEASON = season;
    $(`#nav-season ul li`).removeClass('nav-selected');
    $(`#nav-season-${season}`).addClass('nav-selected');
    navRounds(season);
}


// PROBLEM - SELECTED ROUND DOES NOT WORK
function changeRound(round) {
    F1_ROUND = round;
    $(`#nav-round ul li`).removeClass('nav-selected');
    $(`#nav-round-${F1_SEASON}-${F1_ROUND}`).addClass('nav-selected');
    raceResults(F1_SEASON, F1_ROUND);
}


function navRounds(season) {
    // SHOW ALL ROUNDS FOR THIS SEASON
    jsonCall(`https://ergast.com/api/f1/${season}.json`, function(response) {
        $('#nav-round ul').html('');
        response['MRData']['RaceTable']['Races'].forEach(e => {

          $('#nav-round ul').append(`
              <li id="nav-round-${season}-${e['round']}" onClick="changeRound(${e['round']})">
                  ${(circuits[e['Circuit']['circuitId']]) ? `<img src="https://www.countryflags.io/${circuits[e['Circuit']['circuitId']]['countryCode']}/flat/64.png">` : ''}
                  <div class="nav-round-num">${e['round']}</div>
                  <div class="nav-round-date">${e['date']} ${e['time']}</div>
                  <div class="nav-round-name">${e['raceName']}</div>
                  ${e['Circuit']['Location']['country']}



              </li>`);
            // GET FLAGS
            // jsonCall(`https://restcountries.eu/rest/v2/name/${e['Circuit']['Location']['country']}?fullText=true`, function(response) {
            //   console.log(response);
            // });
        });
        $(`#nav-round-${F1_SEASON}-${F1_ROUND}`).addClass('nav-selected');

    },
    'Error getting list of rounds',
    (e) => $(`#nav-round ul`).addClass('color-accent text-center text-upper text-bold').html(`<li>${e}</li>`));
}



// SETUP GLOBAL VARS
var F1_ROUND, F1_SEASON, F1_HEAD2HEAD_1, F1_HEAD2HEAD_2, F1_HEAD2HEAD_3;

    $(`#head2head-1,#head2head-2`).slideUp(0);

$(document).ready(function() {


    // GET FIRST JSON CALL FOR SEASON AND ROUND NUMBERS
    jsonCall('https://ergast.com/api/f1/current/last/results.json', function(response) {

        F1_SEASON = response['MRData']['RaceTable']['season'];
        F1_ROUND = response['MRData']['RaceTable']['round'];


        // // SHOW ALL SEASONS
        // jsonCall(`https://ergast.com/api/f1/seasons.json?limit=999`, function(response) {
        //
        //
        //     response['MRData']['SeasonTable']['Seasons'].forEach(e => {
        //         $('#nav-season ul').prepend(`<li id="nav-season-${e['season']}" onClick="changeSeason(${e['season']})">${e['season']}</li>`);
        //     });
        //
        //     $(`#nav-season-${F1_SEASON}`).addClass('nav-selected');
        // },
        // 'Error getting list of seasons',
        // (e) => $(`#nav-season ul`).addClass('color-accent text-center text-upper text-bold').html(`<li>${e}</li>`));

        for (i = 2020; i <= parseInt(new Date().getFullYear()); i++) {
          $('#nav-season ul').prepend(`<li id="nav-season-${i}" onClick="changeSeason(${i})">${i}</li>`);
        }

        $(`#nav-season-${F1_SEASON}`).addClass('nav-selected');

        navRounds(F1_SEASON);
        raceResults(F1_SEASON,F1_ROUND);
        // $('nav ul').slideDown('slow');

    },
    'Error getting current season and round',
    (e) => $(`body`).addClass('color-accent-bg text-center').html(`<span class="color-light text-upper text-bold">${e}</span>`));



    $('header > h1').click(function(){
        $('nav ul').slideToggle('slow');
    });

});
