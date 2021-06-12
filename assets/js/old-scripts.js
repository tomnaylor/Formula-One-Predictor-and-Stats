const circuits = {
    'bahrain' : { 
        'track-outline' : 'monaco.png',
        'track-sectors' : 'monaco-sectors.png' },
    'imola' : { 
        'track-outline' : 'monaco.png',
        'track-sectors' : 'monaco-sectors.png' },
    'portimao' : { 
        'track-outline' : 'monaco.png',
        'track-sectors' : 'monaco-sectors.png' },
    'catalunya' : { 
        'track-outline' : 'monaco.png',
        'track-sectors' : 'monaco-sectors.png' },
    'monaco' : { 
        'track-outline' : 'monaco.png',
        'track-sectors' : 'monaco-sectors.png' },
    'azerbaijan' : { 
        'track-outline' : 'azerbaijan.png',
        'track-sectors' : 'azerbaijan-sectors.png' },
        
};

// const CONSTRUCTORS = {
//     'alfa' : {
//         'car-image' : 'alra_romeo.png'
//     },
//     'alphatauri' : {
//         'car-image' : 'alphatauri.png'
//     },
//     'alpine' : {
//         'car-image' : 'alpine.png'
//     },
//     'aston_martin' : {
//         'car-image' : 'aston_martin.png'
//     },
//     'ferrari' : {
//         'car-image' : 'ferrari.png'
//     },
//     'haas' : {
//         'car-image' : 'haas.png'
//     },
//     'mclaren' : {
//         'car-image' : 'mclaren.png'
//     },
//     'mercedes' : {
//         'car-image' : 'mercedes.png'
//     },
//     'red_bull' : {
//         'car-image' : 'red_bull.png'
//     },
//     'williams' : {
//         'car-image' : 'williams.png'
//     },
// }

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

    //  	
]





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


    // GOOGLE MAP API CALL
    let map;
    map = new google.maps.Map(document.getElementById("map"), {     // removed callback function as only gets written when circuit api is done.
        center: { lat: parseFloat(c['Location']['lat']), lng: parseFloat(c['Location']['long']) },        // HAD PROBLEM THAT IT WASNT A NUMBER
        zoom: 18,
        mapTypeId:google.maps.MapTypeId.HYBRID
    });
}

// ERROR WHEN THERE ARE NO LAPS DRIVEN
        //"url": `https://ergast.com/api/f1/${F1_SEASON}/${F1_ROUND}/drivers/${driverId}|verstapan/laps.json?limit=200`,
function drawDriversLapTimes(driverId) {
    
    jsonCall(`https://ergast.com/api/f1/${F1_SEASON}/${F1_ROUND}/laps.json?limit=2000`, function(response) {

            let driverIds = {};
            let driverLaps = [];

            response['MRData']['RaceTable']['Races'][0]['Laps'][0]['Timings'].forEach(lap => {
                driverIds[lap['driverId']] = lap['position'];
            });

            console.log('driverIds',driverIds);
            
            response['MRData']['RaceTable']['Races'][0]['Laps'].forEach(lap => {
                lap['Timings'].forEach(lap => {
                    let tempTimeSplit = lap['Timings'][0]['time'].split(":"); // FIX IN THE MS2 BOOKMARKS
                    let tempTime = (parseFloat(tempTimeSplit[0])*60)+parseFloat(tempTimeSplit[1]);

                    tempRow.push(tempTime);
                });
            });


        // google.charts.load('current', {'packages':['bar']});
        // google.charts.setOnLoadCallback(drawChart);
        // $(window).resize(drawChart);            // REDRAW WHEN WINDOW CHANGES - SEE BOKMARKS

        // function drawChart() {
        //     var data = new google.visualization.DataTable();

        //     data.addColumn('string', 'Lap');

        //     response['MRData']['RaceTable']['Races'][0]['Laps'][0]['Timings'].forEach(lap => {
        //             data.addColumn('number', lap['driverId']);
        //     });

        //     response['MRData']['RaceTable']['Races'][0]['Laps'].forEach(lap => {
        //         tempRow = [lap['number']];

        //         lap['Timings'].forEach(driver => {
        //             let tempTimeSplit = lap['Timings'][0]['time'].split(":"); // FIX IN THE MS2 BOOKMARKS
        //             let tempTime = (parseFloat(tempTimeSplit[0])*60)+parseFloat(tempTimeSplit[1]);

        //             tempRow.push(tempTime);
        //         });
        //         data.addRows([tempRow]);
        //     });


        //     var options = {
        //     chart: {
        //         title: 'Company Performance',
        //         subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        //     },
        //     bars: 'vertical' // Required for Material Bar Charts.
        //     };

        //     var chart = new google.charts.Bar(document.getElementById('curve_chart'));

        //     chart.draw(data, google.charts.Bar.convertOptions(options));
        // }





        //     google.charts.load('current', {'packages':['bar']});
        //     google.charts.setOnLoadCallback(drawChart);
        //     $(window).resize(drawChart);            // REDRAW WHEN WINDOW CHANGES - SEE BOKMARKS
        //     function drawChart() {

        //     var data = new google.visualization.DataTable();
        //     data.addColumn('string', 'Lap');
        //     data.addColumn('number', 'Seconds');

        //     response['MRData']['RaceTable']['Races'][0]['Laps'].forEach(lap => {
        //         let tempTimeSplit = lap['Timings'][0]['time'].split(":"); // FIX IN THE MS2 BOOKMARKS
        //         let tempTime = (parseFloat(tempTimeSplit[0])*60)+parseFloat(tempTimeSplit[1]);

        //         data.addRows([[
        //             lap['number'],
        //             tempTime
        //         ]]);
        //     });

        //     var options = {
        //         title: `Lap times (${driverId})`,
        //         curveType: 'function',
        //         legend: { position: 'bottom' },
        //         chartArea: {
        //             // leave room for y-axis labels
        //             width: '94%',
        //             height: '94%'
        //         },
        //         width: '100%',
        //         height: '100%'
        //     };

        //     var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        //     chart.draw(data, options);
        // }
    });    
}



    function drawRaceStandings(r) {
        $('#race-standings tbody').empty();
        r.forEach(e => {

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
                <td><a href="#" onCLick="drawDriversLapTimes('${e['Driver']['driverId']}')">Show lap times</a></td>
                <td>${e['grid']}</td>
                <td>${gain}</td>
                <td>${(gain >= 1) ? '<i class="fas fa-angle-double-up"></i>' : (gain < 0) ? '<i class="fas fa-angle-double-down"></i>' : '' }</td>
                <td>${('Time' in e) ? e['Time']['time'] : ''}</td>
                <td>${(e['status'] === 'Finished') ? '<i class="fas fa-flag-checkered"></i>' : e['status'] }</td>
            </tr>`);
        });
    }


    function headToHead(one,two) {

        let loop = one;

        for (i=1; i<=2; i++) {
            let flag = countryFlags.find(i => i['nationality'] === loop['Driver']['nationality']);
            let gain = parseInt(loop['grid'])-parseInt(loop['position']);

            $(`#head2head-${i}`).html(`
                <img class="head2head-car" src="assets/img/constructors/${loop['Constructor']['constructorId']}.png">
                <h3>${loop['Driver']['familyName']} [${loop['Driver']['permanentNumber']}]</h3>
                <img class="head2head-flag" src="https://www.countryflags.io/${flag['code']}/flat/64.png" alt="${loop['Driver']['nationality']}">

                <div class="head2head-position">#${loop['position']}</div>
                <div class="head2head-points">${loop['points']} pts</div>
                <div class="head2head-grid">${gain} ${(gain >= 1) ? '<i class="fas fa-angle-double-up"></i>' : (gain < 0) ? '<i class="fas fa-angle-double-down"></i>' : '' }</div>
                <div class="head2head-fastestLap">Fastest Lap ${loop['FastestLap']['Time']['time']} (#${loop['FastestLap']['rank']})</div>
                <div class="head2head-averageSpeek">${loop['FastestLap']['AverageSpeed']['speed']}${loop['FastestLap']['AverageSpeed']['units']}</div>




                `);

            loop = two;
        }
    }




    function showErrors(e) {
        $('#errors').html(e);
        $('#errors').slideDown('slow');
    }


    // function getWikiJSON(url) {
    //     $.when($.getJSON(url)).then(
    //         function(response) {
    //             console.log('WIKI GET SUCCESS',response);
    //             return response;
    //         },
    //         function(e) {
    //             console.log('WIKI GET ERROR',e);
    //             showErrors(e['statusText']);
    //         }
    //     );
    // }


function getWikiInfo(url) {
    //  https://en.wikipedia.org/w/api.php?action=parse&page=1950_Formula_One_season&format=json&origin=*
    //  NinoFarina.jpg
    //  action=query&titles=Image:INSERT_EXAMPLE_FILE_NAME_HERE.jpg&prop=imageinfo&iiprop=url
    //  "https://en.wikipedia.org/wiki/2020_Formula_One_World_Championship"

    // GET RACE WIKI 
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


    // CHANGE SO THERE IS NO PAGE RELOAD AND PARMS GET CHANGED (USE VAR) AND ROUNDS LIST GETS UPDATED ON NEW SEASON
    // let urlParams = new URLSearchParams(window.location.search);

    // const F1_SEASON = (urlParams.has('season')) ? urlParams.get('season') : 'current';
    // const F1_ROUND = (urlParams.has('round')) ? urlParams.get('round') : 'last';

function jsonCall(url,callback, error = 'Default error'){
    $.when($.getJSON(url)).then(
        function(response) {
            console.log(`JSON SUCCESS: ${url}`,response);
            callback(response);
       },
        function(e) {
            console.log(error,e);
            showErrors(`${error} (${e['statusText']})`);
        }
    );
}




    // GAME WHERE YOU GUESS WHERE CARS FINISH BEFORE THE TABLE IS MATCHED UP. POINTS FOR EACH ONE RIGHT.


function navRounds(season) {
    // SHOW ALL ROUNDS FOR THIS SEASON
    jsonCall(`https://ergast.com/api/f1/${season}.json`, function(response) {
        $('#nav-round ul').html('');
        response['MRData']['RaceTable']['Races'].forEach(e => {                
            $('#nav-round ul').append(`
                <li id="nav-round-${season}-${e['round']}" onClick="changeRound(${e['round']})">
                    <div class="nav-round-num">${e['round']}</div>
                    <div class="nav-round-date">${e['date']} ${e['time']}</div>
                    <div class="nav-round-name">${e['raceName']}</div>
                </li>`);
        });
        $(`#nav-round-${F1_SEASON}-${F1_ROUND}`).addClass('nav-selected');

    });   
}



function raceResults(season, round) {

    F1_SEASON = season;
    F1_ROUND = round;

    $('nav ul').slideUp('slow');

    jsonCall(`https://ergast.com/api/f1/${season}/${round}/results.json`, function(response) {


        let race = response['MRData']['RaceTable']['Races'][0];

        if (!race) {
            showErrors('Array Empty');
            return;
        }

        $('h1').html(`${season} Season | Round ${round} | ${ race['raceName'] }`);

        drawCircuit(race['Circuit']);
        headToHead(race['Results'][0],race['Results'][1]);
        drawRaceStandings(race['Results']);
        drawDriversLapTimes(race['Results'][0]['Driver']['driverId']);// DO THIS AS A MODAL POPUP FOR EACH DRIVER
    

    });    
}

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

// SETUP GLOBAL VARS
var F1_ROUND, F1_SEASON;


    $(document).ready(function() {


        // GET FIRST JSON CALL FOR SEASON AND ROUND NUMBERS
        jsonCall('https://ergast.com/api/f1/current/last/results.json', function(response) {
            
            F1_SEASON = response['MRData']['RaceTable']['season'];
            F1_ROUND = response['MRData']['RaceTable']['round'];


            // SHOW ALL SEAONS
            jsonCall(`https://ergast.com/api/f1/seasons.json?limit=9999`, function(response) {


                response['MRData']['SeasonTable']['Seasons'].forEach(e => {
                    $('#nav-season ul').prepend(`<li id="nav-season-${e['season']}" onClick="changeSeason(${e['season']})">${e['season']}</li>`);
                });
                
                $(`#nav-season-${F1_SEASON}`).addClass('nav-selected');
            });        


            navRounds(F1_SEASON);
            raceResults(F1_SEASON,F1_ROUND);

        });





        // $('nav').slideUp(0);
        
        $('h1').click(function(){
            $('nav ul').slideToggle('slow');
        });




        // $('#season').append(`<option value="current" ${('current' === F1_SEASON) ? 'selected' : '' }>current</option>`);
    });