async function getTemp(){
    "use strict";


    // Get a reference to the form - Use the ID of the form
    let form = $("#myform");


    // If all of the form elements are valid, the get the form values
    if (form.valid()) {
        // Set location from input
        let location = document.getElementById("location").value;


        // URL for call
        let url1 = "https://geocoding-api.open-meteo.com/v1/search?name=" + location + "&count=10&language=en&format=json";


        // Make call
        let msg1Object = await fetch(url1);


        let msg1JSONText = await msg1Object.text();
        // Parse JSON string into object
        let msg1 = JSON.parse(msg1JSONText);


        // Check status
        if (msg1Object.status >= 200 && msg1Object.status <= 299) {
           


            // Check if result was found
            if (msg1.results) {
                document.getElementById("name").innerHTML = msg1.results[0].name + ",";
                document.getElementById("admin1Location").innerHTML = msg1.results[0].admin1 + ",";
                document.getElementById("country").innerHTML = msg1.results[0].country;
                document.getElementById("latitude").innerHTML = "Latitude:&nbsp;" + msg1.results[0].latitude;
                document.getElementById("longitude").innerHTML = "Longitude:&nbsp;" + msg1.results[0].longitude;
            }
            else {
                //Error message
                alert("No Match Found")
                return;
            }
        }
       


        // URL for call
        let url2 = "https://api.open-meteo.com/v1/forecast?latitude=" + msg1.results[0].latitude + "&longitude=" + msg1.results[0].longitude + "&hourly=temperature_2m&temperature_unit=fahrenheit";


        // Make call
        let msg2Object = await fetch(url2);


        // Check status
        if (msg2Object.status >= 200 && msg2Object.status <= 299) {
            let msg2JSONText = await msg2Object.text();
            // Parse JSON string into object
            let msg2 = JSON.parse(msg2JSONText);


            let date = [];
            let temp = [];
            let numHours = msg2.hourly.time.length;
            if (numHours >= 0) {
                for (let i = 0; i < numHours; i++) {
                    temp[i] = msg2.hourly.temperature_2m[i];
               
                    // Convert date to unix milliseconds
                    let unixmillsec = Date.parse(msg2.hourly.time[i]);
                    // Create temporary date variable
                    let tempdate = new Date(unixmillsec);
                    // Extract the date/time string for a more friendly format
                    date[i] = tempdate.toLocaleString();
                }
            }


            let tempTable = "";
            if (numHours > 0) {
                tempTable = tempTable + "<table><caption>Temperature</caption><tr><th>Date</th><th>Temperature</th></tr>";
                for (let i = 0; i < numHours; i++) {
                    tempTable = tempTable + "<tr><td>" + date[i] + "</td><td>" + temp[i] + "</td></tr>";
                }
                tempTable = tempTable + "</table>";
                document.getElementById("weatherTable").innerHTML = tempTable;
            }


            let ctx = document.getElementById("chartjs");
            let myChart = new Chart(ctx, {
                "type":"line",
                "data": {
                    "labels": date,
                    "datasets":[{"label":"Temperature",
                        "data": temp,
                        "fill":false,
                        "borderColor":"#CB674C",
                        "color":"#000",
                        "pointRadius":2,
                        "pointBackgroundColor":"#fff",
                        "lineTension":0.1
                    }]},
                        "options":{
                            responsive: false,
                                                        mantainAspectRatio: true,
                            "legend": {
                                "labels": {
                                    "fontColor": "#fff"
                                }
                            },
                            "scales":{
                                "yAxes": [{
                                    "ticks": {
                                        "fontColor": "#fff"
                                    }
                                }],
                                "xAxes": [{
                                    "ticks": {
                                        "fontColor": "#fff"
                                    }
                                }]
                            },
                           
                        }
                }
            );
        }
    }
}


function clearform(){
    "use strict;"


    document.getElementById("location").value = "";
    document.getElementById("location").innerHTML = "";
    document.getElementById("latitude").value = "";
    document.getElementById("latitude").innerHTML = "Latitude: ";
    document.getElementById("longitude").value = "";
    document.getElementById("longitude").innerHTML = "Longitude: ";
    document.getElementById("name").innerHTML = "";
    document.getElementById("admin1Location").innerHTML = "";
    document.getElementById("country").innerHTML = "";
    document.getElementById("weatherTable").innerHTML = "";




    /* Ugly Code to Erase Canvas */
    let canvas0 = document.getElementById("chartjs");
    let context0 = canvas0.getContext('2d');    
    context0.clearRect(0, 0, canvas0.width, canvas0.height);
}
