const circuits = {
    'monaco' : { 
        'track-outline' : 'monaco.png',
        'track-sectors' : 'monaco-sectors.png' },
    'azerbaijan' : { 
        'track-outline' : 'azerbaijan.png',
        'track-sectors' : 'azerbaijan-sectors.png' },
        
};







function drawCircuit(c) {

    $('#body h1').html(c['circuitName']);
    $('#track').attr("src",`assets/img/${circuits[c['circuitId']]['track-outline']}`);
    $('#track-sectors').attr("src",`assets/img/${circuits[c['circuitId']]['track-sectors']}`);


    // GOOGLE MAP API CALL
    let map;
    map = new google.maps.Map(document.getElementById("map"), {     // removed callback function as only gets written when circuit api is done.
        center: { lat: parseFloat(c['Location']['lat']), lng: parseFloat(c['Location']['long']) },        // HAD PROBLEM THAT IT WASNT A NUMBER
        zoom: 18,
        mapTypeId:google.maps.MapTypeId.HYBRID
    });
}


$(document).ready(function() {

    $.ajax({
        "url": "https://ergast.com/api/f1/current/last/results.json",
        "method": "GET",
        "timeout": 0 }).done(function (response) {

        let race = response['MRData']['RaceTable']['Races'][0];
        // console.log(race);
        // console.log(race['raceName']);
        // console.log(race['season']);
        // console.log(race['Results'][0]['Driver']['code']);
        // console.log(response);

        drawCircuit(race['Circuit']);

    });


    $.ajax({
        "url": "https://ergast.com/api/f1/current/next/circuits.json",         // turn back to next
        "method": "GET",
        "timeout": 0 }).done(function (response) {

            console.log(response);

        let race = response['MRData']['CircuitTable']['Circuits'][0];
        console.log(race);
        console.log(race['circuitName']);
        console.log(race['circuitId']);
        console.log(race['Location']);

        
    });



    // $.when(
    //     $.getJSON(`https://ergast.com/api/f1/drivers?=123`),
    //     $.getJSON(`https://ergast.com/api/f1/drivers?=123`)
    // ).then(
    //     function(firstResponse, secondResponse) {
    //         console.log(firstResponse[0]);
    //         console.log(secondResponse[0]);
    //         var userData = firstResponse[0];
    //         var repoData = secondResponse[0];
    //         $("#body").html(userData[0]);
    //         $("#body2").html(repoData);
    //     },
    //     function(errorResponse) {
    //         if (errorResponse.status === 404) {
    //             $("#error").html(
    //                 `<h2>No info found for user ${username}</h2>`);
    //         } else if (errorResponse.status === 403) {
    //             var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset') * 1000);
    //             $("#error").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`);
    //         } else {
    //             console.log(errorResponse);
    //             $("#error").html(
    //                 `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
    //         }
    //     }
    // );

});