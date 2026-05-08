function calculate() {
    "use strict";
    /* Make sure that the form is valid */
    if ($( "#myform" ).valid()) {
       
        /* get the operands from the form */
        let operand1 = document.getElementById("Operand1").value;
        let operand2 = document.getElementById("Operand2").value;
       
        /* convert the operands from string to floating point */
        let operand1fp = parseFloat (operand1);
        let operand2fp = parseFloat (operand2);
       
        /* figure out which operator was checked and place the value in operator */
        let operator;
        if (document.getElementById("addOperator").checked) {
            operator = document.getElementById("addOperator").value;
        }
        if (document.getElementById("subOperator").checked) {
            operator = document.getElementById("subOperator").value;
        }
        if (document.getElementById("multOperator").checked) {
            operator = document.getElementById("multOperator").value;
        }
        if (document.getElementById("divOperator").checked) {
            operator = document.getElementById("divOperator").value;
        }


        let result;
       
        /* if the operator was "Add" then add the operands together */
        if (operator == "Add") {
            result = operand1fp + operand2fp;
        }
 
        /* if the operator was "Sub" then subtract the second operand from the first operand */
        if (operator == "Subtract") {
            result = operand1fp - operand2fp;
        }


        /* if operator was "Multiply" then multiply the two operands */
        if (operator == "Multiply") {
            result = operand1fp * operand2fp;
        }


        /* if operator was "Divide" then divide the first operand by the second operand */
        if (operator == "Divide") {
            if (operand2fp != 0) {
                result = operand1fp / operand2fp;
            }
            else
                result = "Error";
        }
       
        /* convert the result to a string and display it */
        document.getElementById("Result").innerHTML = result.toString();
    }
}


function clearform() {
   
    /* Set all of the form values to blank or false */
    document.getElementById("Operand1").value = "";
    document.getElementById("Operand2").value = "";
    document.getElementById("Operand1Error").innerHTML = "";
    document.getElementById("Operand2Error").innerHTML = "";
    document.getElementById("addOperator").checked = false;
    document.getElementById("subOperator").checked = false;
    document.getElementById("multOperator").checked = false;
    document.getElementById("divOperator").checked = false;
    document.getElementById("OperatorError").innerHTML = "";
    document.getElementById("Result").innerHTML = "";
}


/* Form Validation */
$( "#myform" ).validate({
 
});
