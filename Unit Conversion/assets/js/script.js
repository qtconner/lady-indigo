function convert() {
    "use strict";


    // Get a reference to the form - Use the ID of the form
    let form = $("#myform");
   
    // If all of the form elements are valid, the get the form values
    if (form.valid()) {
       
        // From Value
        let FromValue = document.getElementById("fromValue").value;


        // From Unit
        // Get the unit associated with the From Value
        let FromUnit;
        if (document.getElementById("cmFromUnit").checked) {
            FromUnit = document.getElementById("cmFromUnit").value;
        }
        if (document.getElementById("mFromUnit").checked) {
            FromUnit = document.getElementById("mFromUnit").value;
        }
        if (document.getElementById("kmFromUnit").checked) {
            FromUnit = document.getElementById("kmFromUnit").value;
        }
        if (document.getElementById("inFromUnit").checked) {
            FromUnit = document.getElementById("inFromUnit").value;
        }
        if (document.getElementById("ftFromUnit").checked) {
            FromUnit = document.getElementById("ftFromUnit").value;
        }
        if (document.getElementById("ydFromUnit").checked) {
            FromUnit = document.getElementById("ydFromUnit").value;
        }
        if (document.getElementById("miFromUnit").checked) {
            FromUnit = document.getElementById("miFromUnit").value;
        }
       
        // To Unit
        // Get the unit associated with the To Value
        let ToUnit;
        if (document.getElementById("cmToUnit").checked) {
            ToUnit = document.getElementById("cmToUnit").value;
        }
        if (document.getElementById("mToUnit").checked) {
            ToUnit = document.getElementById("mToUnit").value;
        }
        if (document.getElementById("kmToUnit").checked) {
            ToUnit = document.getElementById("kmToUnit").value;
        }
        if (document.getElementById("inToUnit").checked) {
            ToUnit = document.getElementById("inToUnit").value;
        }
        if (document.getElementById("ftToUnit").checked) {
            ToUnit = document.getElementById("ftToUnit").value;
        }
        if (document.getElementById("ydToUnit").checked) {
            ToUnit = document.getElementById("ydToUnit").value;
        }
        if (document.getElementById("miToUnit").checked) {
            ToUnit = document.getElementById("miToUnit").value;
        }


        ConvertResult(FromValue, FromUnit, ToUnit);
    }
}


async function ConvertResult(FromValue, FromUnit, ToUnit) {
    "use strict;"
       
        // URL and method used with AJAX Call
        let myURL = "https://brucebauer.info/assets/ITEC3650/unitsconversion.php";


        /* AJAX converter requires FromValue, FromUnit, and ToUnit */
        myURL = myURL + "?FromValue=" + encodeURIComponent(FromValue) + "&FromUnit=" + encodeURIComponent(FromUnit) + "&ToUnit=" + encodeURIComponent(ToUnit);


        /* fetch the results */
        let myConvObject = await fetch(myURL);
        let myResult = await myConvObject.text();
       
        document.getElementById("toValue").innerHTML = myResult;
}


function clearform() {
    "use strict";
   
    /* Set all of the form values to blank or false */
    document.getElementById("fromValue").value = "";
    document.getElementById("fromValueError").innerHTML = "";
    document.getElementById("cmFromUnit").checked = false;
    document.getElementById("mFromUnit").checked = false;
    document.getElementById("kmFromUnit").checked = false;
    document.getElementById("inFromUnit").checked = false;
    document.getElementById("ftFromUnit").checked = false;
    document.getElementById("ydFromUnit").checked = false;
    document.getElementById("miFromUnit").checked = false;
    document.getElementById("cmToUnit").checked = false;
    document.getElementById("mToUnit").checked = false;
    document.getElementById("kmToUnit").checked = false;
    document.getElementById("inToUnit").checked = false;
    document.getElementById("ftToUnit").checked = false;
    document.getElementById("ydToUnit").checked = false;
    document.getElementById("miToUnit").checked = false;
    document.getElementById("fromUnitError").innerHTML = "";
    document.getElementById("toUnitError").innerHTML = "";
    document.getElementById("toValue").innerHTML = "";
}


$( "#myform" ).validate({


});
