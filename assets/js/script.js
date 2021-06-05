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
        'nationality' : 'Monegasque',
        'code' : 'MC'
    }
]





function drawCircuit(c) {

    $('#body h1').html(c['circuitName']);
    $('#track').attr("src",`assets/img/${c['circuitId']}.png`);
    $('#track-sectors').attr("src",`assets/img/${c['circuitId']}-sectors.png`);
    // $('#track').attr("src",`assets/img/${circuits[c['circuitId']]['track-outline']}`);
    // $('#track-sectors').attr("src",`assets/img/${circuits[c['circuitId']]['track-sectors']}`);


    // GOOGLE MAP API CALL
    let map;
    map = new google.maps.Map(document.getElementById("map"), {     // removed callback function as only gets written when circuit api is done.
        center: { lat: parseFloat(c['Location']['lat']), lng: parseFloat(c['Location']['long']) },        // HAD PROBLEM THAT IT WASNT A NUMBER
        zoom: 18,
        mapTypeId:google.maps.MapTypeId.HYBRID
    });
}

// ERROR WHEN THERE ARE NO LAPS DRIVEN
function drawDriversLapTimes(driverId) {
    $.ajax({
        "url": `https://ergast.com/api/f1/${F1_SEASON}/${F1_ROUND}/drivers/${driverId}/laps.json?limit=200`,
        "method": "GET",
        "timeout": 0 }).done(function (response) {

            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart);
            $(window).resize(drawChart);            // REDRAW WHEN WINDOW CHANGES - SEE BOKMARKS
            function drawChart() {

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Lap');
            data.addColumn('number', 'Seconds');

            response['MRData']['RaceTable']['Races'][0]['Laps'].forEach(lap => {
                let tempTimeSplit = lap['Timings'][0]['time'].split(":"); // FIX IN THE MS2 BOOKMARKS
                let tempTime = (parseFloat(tempTimeSplit[0])*60)+parseFloat(tempTimeSplit[1]);

                data.addRows([[
                    lap['number'],
                    tempTime
                ]]);
            });

            var options = {
                title: `Lap times (${driverId})`,
                curveType: 'function',
                legend: { position: 'bottom' },
                chartArea: {
                    // leave room for y-axis labels
                    width: '94%',
                    height: '94%'
                },
                width: '100%',
                height: '100%'
            };

            var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

            chart.draw(data, options);
        }
    });    
}



    function drawRaceStandings(r) {
        r.forEach(e => {

            let flag = countryFlags.find(i => i['nationality'] === e['Driver']['nationality']);
            let flagImg = (flag) ? `<img src="https://www.countryflags.io/${flag['code']}/flat/24.png" alt="${e['Driver']['nationality']}">` : '';
            let gain = parseInt(e['grid'])-parseInt(e['position']);
            
            $('#race-standings tbody').append(`<tr>
                <td>${e['position']}</td>
                <td>${e['number']}</td>
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


    function showErrors(e) {
        $('#errors').html(e);
        $('#errors').slideDown('slow');
    }


    function getWikiJSON(url) {
        $.when($.getJSON(url)).then(
            function(response) {
                console.log('WIKI GET SUCCESS',response);
                return response;
            },
            function(e) {
                console.log('WIKI GET ERROR',e);
                showErrors(e['statusText']);
            }
        );
    }



        // CHANGE SO THERE IS NO PAGE RELOAD AND PARMS GET CHANGED (USE VAR) AND ROUNDS LIST GETS UPDATED ON NEW SEASON
    let urlParams = new URLSearchParams(window.location.search);

    const F1_SEASON = (urlParams.has('season')) ? urlParams.get('season') : 'current';
    const F1_ROUND = (urlParams.has('round')) ? urlParams.get('round') : 'last';


    $(document).ready(function() {


        $.when($.getJSON(`https://ergast.com/api/f1/${F1_SEASON}/${F1_ROUND}/results.json`)).then(
            function(response) {
                console.log('SUCCESS',response);

                let race = response['MRData']['RaceTable']['Races'][0];

                if (!race) {
                    showErrors('Array Empty');
                    return;
                }

                drawCircuit(race['Circuit']);
                drawRaceStandings(race['Results']);
                drawDriversLapTimes(race['Results'][0]['Driver']['driverId']);// DO THIS AS A MODAL POPUP FOR EACH DRIVER
                
//  https://en.wikipedia.org/w/api.php?action=parse&page=1950_Formula_One_season&format=json&origin=*
//  NinoFarina.jpg
//  action=query&titles=Image:INSERT_EXAMPLE_FILE_NAME_HERE.jpg&prop=imageinfo&iiprop=url

                // GET RACE WIKI 
                $.when($.getJSON(`https://en.wikipedia.org/w/api.php?action=parse&page=1950_Formula_One_season&format=json&origin=*`)).then(
                    function(wiki) {
                        wiki = wiki['parse'];
                        console.log('SUCCESS WIKI',wiki);
                        $('#wiki').html(wiki['externallinks'][0]);
                        
                        // wiki['images'].forEach(img => {
                        //     $('#wiki').append(`<img src="https://en.wikipedia.org/wiki/File:${img}">`);
                        // });

                        $.when($.getJSON(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url&titles=File:NinoFarina.jpg|File:Alfa_Romeo_158_fr.jpg&origin=*`)).then(
                            function(wiki) {
                                wiki = wiki['query']['pages'];
                                console.log('SUCCESS WIKI IMG',wiki);
                                console.log('SUCCESS WIKI IMG',wiki[-1]);
                               for (i=0; i < length.wiki; i++) {               
                                    console.log(wiki[i]);
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
                
            },
            function(e) {
                console.log('ERROR',e);
                showErrors(e['statusText']);
                // if (errorResponse.status === 404) {
                //     $("#error").html(
                //         `<h2>No info found for user ${username}</h2>`);
                // } else if (errorResponse.status === 403) {
                //     var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset') * 1000);
                //     $("#error").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`);
                // } else {
                //     console.log(errorResponse);
                //     $("#error").html(
                //         `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
                // }
            }
        );


        // $('#nav-season ul').slideUp('show');
        
        $('#nav-season').click(function(){
            $('#nav-season ul').slideToggle('show');
        });


        // HELP WITH DATE
        $.when($.getJSON(`https://ergast.com/api/f1/seasons.json?limit=9999`)).then(
            function(response) {
                response['MRData']['SeasonTable']['Seasons'].push({season: 'current'});
                console.log('SUCCESS SEASONS',response);
                response['MRData']['SeasonTable']['Seasons'].forEach(e => {                
                    $('#nav-season ul').prepend(`<li class="${(e['season'] == F1_SEASON) ? 'nav-selected' : '' }"><a href="?season=${e['season']}&round=${F1_ROUND}">${e['season']}</a></li>`);
                });
            },
            function(e) {
                console.log('ERROR',e);
                showErrors(e['statusText']);
            }
        );        

        $.when($.getJSON(`https://ergast.com/api/f1/${F1_SEASON}.json`)).then(
            function(response) {
                response['MRData']['RaceTable']['Races'].unshift({raceName: '', round: 'last'});
                console.log('SUCCESS ROUNDS',response);
                response['MRData']['RaceTable']['Races'].forEach(e => {                
                    $('#nav-round ul').append(`<li class="${(e['round'] == F1_ROUND) ? 'nav-selected' : '' }"><a href="?season=${F1_SEASON}&round=${e['round']}">${e['round']} - ${e['raceName']}</a></li>`);
                });
            },
            function(e) {
                console.log('ERROR',e);
                showErrors(e['statusText']);
            }
        );        


        // $('#season').append(`<option value="current" ${('current' === F1_SEASON) ? 'selected' : '' }>current</option>`);
    });