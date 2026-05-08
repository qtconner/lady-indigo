async function convCurrency() {
    "use strict";


    // Get a reference to the form - Use the ID of the form
    let form = $("#myform");
   
    // If all of the form elements are valid, the get the form values
    if (form.valid()) {
       
        let baseCurrency = document.getElementById("baseCurrency").value;
        let toCurrency = document.getElementById("toCurrency").value;
        let apiKey = "uVFhJsaAtoeFUuK6ycmOUcClt9EsVaRD"
        let FromDate = document.getElementById("FromDate").value;
        let ToDate = document.getElementById("ToDate").value;


        // Create the forex ticker pair
        let forexTicker = "C:" + baseCurrency + toCurrency;


        /* URL for AJAX Call */
        let myURL1 = "https://api.polygon.io/v2/aggs/ticker/" + forexTicker+ "/range/1/day/"+ FromDate+ "/"+ ToDate+ "?adjusted=true&sort=asc&limit=5000&apiKey="+ apiKey;


        /* Make the AJAX call */
        let msg1Object = await fetch(myURL1);


        /* Check the status */
        if (msg1Object.status >= 200 && msg1Object.status <= 299) {            
            let msg1JSONText = await msg1Object.text();
            // Parse the JSON string into an object
            let msg = JSON.parse(msg1JSONText);


            /* Your code to process the result goes here -
               display the returned message */
            let currencyDate = [];
            let currencyValue = [];


            let numDays = msg.results.length;
            if (numDays > 0) {
                for (let i = 0; i < numDays; i++) {
                    currencyValue[i] = msg.results[i].c;


                    let tempDate = new Date(msg.results[i].t);
                    currencyDate[i] = tempDate.toLocaleDateString();
                }
            }


            let ctx = document.getElementById("chartjs");
                let myChart = new Chart(ctx, {
                    "type":"line",
                    "data": {
                        "labels": currencyDate,
                        "datasets":[{"label":"Stock Close",
                        "data": currencyValue,
                        "fill":false,
                        "borderColor":"rgb(75, 192, 192)",
                        "lineTension":0.1}]
                    },
                        "options":{
                            responsive: false,
                            maintainAspectRatio: true,
                        }
                }
            );        
        }
        else {
            alert("No currency data found for that date range");
        }
    }      
}


function ClearForm() {
    "use strict;"


    document.getElementById("baseCurrency").value = "";
    document.getElementById("baseCurrencyError").innerHTML = "";
    document.getElementById("toCurrency").value = "";
    document.getElementById("toCurrencyError").innerHTML = "";
    document.getElementById("FromDate").value = "";
    document.getElementById("FromDateError").innerHTML = "";
    document.getElementById("ToDate").value = "";
    document.getElementById("ToDateError").innerHTML = "";
   
    /* Ugly Code to Erase Canvas */
    let canvas0 = document.getElementById("chartjs");
    let context0 = canvas0.getContext('2d');    
    context0.clearRect(0, 0, canvas0.width, canvas0.height);
}
