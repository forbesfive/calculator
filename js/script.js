// Declaring the object that will contain the code for the calculator
let objCalculator = {
    //declaring the objects global variables required for the functionality to work
    number1:'',
    number2:'',
    operator:'',
    blnEquals:false,
    blnEqualsSuccess:false,
    errorMessageTimeout:false,
    //this function is called to initialise the object and prepare all variables that will need to exist for the object to run
    init:function(){
        this.getAllElements();
        this.addEventListeners();
    },
    //this function will set variables populated by a HTML object or an array populated by HTML objects
    getAllElements:function(){
        //single HTML objects
        this.objPreview = document.querySelector('.preview');
        this.objPrevious = document.querySelector('.previous');
        this.objSum = document.querySelector('.sum');
        this.objClear = document.querySelector('.clear');
        this.objDecimal = document.querySelector('.decimal');
        this.objEquals = document.querySelector('.equals');
        this.objErrorMessage = document.querySelector('.error_message');
        //array of HTML objects
        this.arrNumbers = document.querySelectorAll('.number');
        this.arrOperators = document.querySelectorAll('.operator');
    },
    //this function will add event listeners directly to singular HTML objects or loop thorugh an array of HTML objects to attach event listeners
    addEventListeners:function(){
        // because "this" represents the current object (objCalculator) when we attach an event listeners to a HTML object "this" ends up referencing the HTML object and not the current object so we are setting this variable so that we can pass objCalculator to the function being ran inside the event listener
        let _self = this;
        //looping through all objects in arrNumbers to add the same event listener to them
        for(counter=0; counter < this.arrNumbers.length; counter++){
            let currentNumber = this.arrNumbers[counter];
            // console.log(currentNumber);
            currentNumber.addEventListener('click',function(event){
                //getting the data from the button that was clicked
                let number = event.target.innerHTML;
                _self.preview(number);
            });
        }
        //looping through all objects in arrOperators to add the same event listener to them
        for(counter=0; counter < this.arrOperators.length; counter++){
            let currentOperator = this.arrOperators[counter];
            // console.log(currentNumber);
            currentOperator.addEventListener('click',function(event){
                //getting the data from the button that was clicked
                let operator = event.target.innerHTML;
                _self.preview(operator);
            });
        }
        //adding event listener to call the clear function
        this.objClear.addEventListener('click',function(event){
            _self.clear();
        });
        //adding event listener to call the equals function
        this.objEquals.addEventListener('click',function(event){
            //when the equals button is clicked, we need one of the functions to behave differently, so we use this boolean
            _self.blnEquals = true;
            _self.equals();
        });
        //adding event listener to call the preview function
        this.objDecimal.addEventListener('click',function(event){
            //getting the data from the button that was clicked
            let decimal = event.target.innerHTML;
            _self.preview(decimal);
        });
    },
    // this function is used to build up the data required to be displayed in the sum preview area of the calulator
    preview:function(data){
        // console.log(data);
        //if a succesful equals function has been ran and a new preview needs to be displayed, clear all data that is currently set and unset blnEqualsSuccess
        if(this.blnEqualsSuccess){
            this.clear();
            this.blnEqualsSuccess = false;
        }
        // default the dataType to 'number' as there are 10 number buttons and only 4 operators and 1 decimal
        let dataType = 'number';
        // if the data that has been passed to the function matches the cases below, override default dataType
        switch(data){
            case '+':
            case '-':
            case '/':
            case '*':
                dataType = 'operator';
            break;
            case '.':
                dataType = 'decimal';
            break;
        }
        // console.log(dataType);
        //if the dataType is a number then update number1 or number2 else
        if(dataType == 'number'){
            //if an operator has been set, we will update number2, otherwise update number1
            if(this.operator){
                if(this.number2){
                    this.number2 += data;
                } else {
                    this.number2 = data;
                }
            } else {
                if(this.number1){
                    this.number1 += data;
                } else {
                    this.number1 = data;
                }
            }
        } else {
            // determining which of the other2 dataTypes need to be handled
            if(dataType == 'decimal'){
                this.addDecimal();
            } else {
                // if number1 has been set, we can set an operator, otherwise show error message
                if(this.number1){
                    //if number 2 has a value then complete the sum so far and update the display, otherwise overwrite the operator with a new operator
                    if(this.number2){
                        this.autocomplete(data);
                    } else {
                        this.operator = data;
                    }
                } else {
                    this.outputError('You cannot set an operator without number1 having a value');
                }
            }
        }
        // show the updated data on the display
        this.displayPreview();
    },
    //this funtion will add a decimal place to a number if possible to do so
    addDecimal:function(){
        //if an operator has been set then apply logic to number 2 else number1
        if(this.operator){
            //if number2 hasn't been set, assume the user wanted 0. else add a decimal place (if possible) to number2
            if(this.number2){
                if(!this.hasDecimal('number2')){
                    this.number2 += '.';
                } else {
                    this.outputError('Number2 already has a decimal');
                }
            } else {
                this.number2 = '0.';
            }
        } else {
            //if number1 hasn't been set, assume the user wanted 0. else add a decimal place (if possible) to number1
            if(this.number1){
                if(!this.hasDecimal('number1')){
                    this.number1 += '.';
                }  else {
                    this.outputError('Number1 already has a decimal');
                }
            } else {
                this.number1 = '0.';
            }
        }
    },
    //this function takes an instruction of "number1" or "number2" and checks to see if a decimal point has already been added
    hasDecimal:function(number){
        //default the boolean to assume the number doesn't have a decimal added
        let blnHasDecimal = false;
        switch(number){
            case 'number1':
                //if number1 does not contain a decimal blnDecimal = true
                //the reason why we set a negative result as -1 is because the character could be at position 0 and 0 would render false
                if(this.number1.indexOf('.') !== -1){
                    blnHasDecimal = true;
                    this.outputError('you already have a decimal point on number1');
                }
            break;
            case 'number2':
                if(this.number2.indexOf('.') !== -1){
                    blnHasDecimal = true;
                    this.outputError('you already have a decimal point on number2');
                }
            break;
        }
        return blnHasDecimal;
    },
    //this function updates the display and resets the values of each global variable to make user expereince better
    autocomplete: function(operator){
        //take the old preview message
        let strPreviousSum = this.objPreview.value;
        //update the previous input with the old message
        this.objPrevious.value = strPreviousSum;
        //work out the value of the completed sum
        let sum = this.calculate();
        //set the value of the completed sum to number1
        this.number1 = sum;
        //update the operator to the operator passed
        this.operator = operator;
        //set number2 to be blank
        this.number2 = '';
        //update the visual display
        this.displayPreview();
    },
    //this function resets all of the variables to their default value
    clear:function(){
        this.number1 = "";
        this.number2 = "";
        this.operator = "";
        this.objPreview.value = "";
        this.objSum.value = "";
        this.objPrevious.value = "";
        this.blnEquals=false;
        this.blnEqualsSuccess=false;
        this.errorMessageTimeout=false;
    },
    //this function prepares the message to be output in objPreview and calls the equals function to complete the maths
    displayPreview:function(){
        let strMessage = '';
        if(this.number1){
            strMessage += this.number1;
        }
        if(this.operator){
            strMessage += ' '+this.operator;
        }
        if(this.number2){
            strMessage += ' '+this.number2;
        }
        this.objPreview.value = strMessage;
        this.equals();
    },
    //this function will validate if all of the variables that need to be set have been set and then output the sum
    equals: function(){
        // console.log(this.blnEquals);
        // setting the default value of this boolean to assume validation will pass and setting to false if validation fails
        let blnCanDoMaths = true;
        if(!this.number1){
            blnCanDoMaths = false;
        }
        if(!this.operator){
            blnCanDoMaths = false;
        }
        if(!this.number2){
            blnCanDoMaths = false;
        }
        //if validation passes call the calculate function and update the displays as required
        if(blnCanDoMaths){
            let sum = this.calculate();
            if(sum !== false){
                this.updateDisplay(sum);
                //if the equals button was pressed, the displays need to output differently to if a number, operator or decimal preview function called the equals function
                if(this.blnEquals){
                    let strPreviousSum = this.objPreview.value;
                    this.objPrevious.value = strPreviousSum;
                    this.objPreview.value = "";
                    this.number1 = "";
                    this.number2 = "";
                    this.operator = "";
                    this.blnEqualsSuccess = true;
                }
            }
        } else {
            if(this.blnEquals){
                this.outputError('You haven\'t set enough variables');
            }
        }
        //set blnEquals back to default value
        this.blnEquals = false;
    },
    //this function updates objSum with the value passed through
    updateDisplay: function(sum){
        this.objSum.value = sum;
    },
    //this function does the maths when validation has determined that the maths can be done
    calculate(){
        //declaring sum variables
        let sum;
        //Validation for num1 & num2
        if(isNaN(this.number1)){
            this.outputError('Number 1 is not a number');
        }
        if(isNaN(this.number2)){
            this.outputError('Number 2 is not a number');
        }
        //switch statement for operator
        switch(this.operator){
            case '+':
                sum = parseFloat(this.number1) + parseFloat(this.number2);
            break;
            case '-':
                sum = parseFloat(this.number1) - parseFloat(this.number2);
            break;
            case '*':
            case 'x':
                sum = parseFloat(this.number1) * parseFloat(this.number2);
            break;
            case '/':
                sum = parseFloat(this.number1) / parseFloat(this.number2);
            break;
            case '%':
                sum = parseFloat(this.number1) % parseFloat(this.number2);
                break;
            default:
                sum = false;
                this.outputError('You have used an unrecognised operator ' + this.operator);
        }
        return sum;
    },
    //this function will output an error message passed as an argument
    outputError:function(strErrorMessage){
        //see note for self in event listener function
        _self = this;
        //clear any existing timeout function set on this variable
        clearTimeout(this.errorMessageTimeout);
        //update the innerHTML of the hidden HTML element
        this.objErrorMessage.innerHTML = strErrorMessage;
        //display the HTML element after message is set
        this.objErrorMessage.style.display = 'block';
        //add a timeout funtion to hide the error message after 2500 milliseconds
        this.errorMessageTimeout = setTimeout(function(){
            _self.objErrorMessage.style.display = 'none';
        }, 2500);
    }
}
//initialise object
objCalculator.init();

console.log(objCalculator);

/*--
Variables - Number1, Number2, Operator

Cancel
    number1 = "";
    number2 = "";
    operator = "";
Numbers & Operators
    IF number1 == ""
        THEN number1 = numberPressed
    ELSE 
        IF operator == ""
            THEN number1 += number
    IF operator == "" AND number1 != ""
        operator = operatorPressed
    ELSE IF operator == ""  AND number1 == ""
        THEN return error
    ELSE IF operator != "" and number1 != "" AND number2 == ""
        operator = operatorPressed
    ELSE IF operator != "" AND number2 != ""
        THEN number1 == sum(number1,number2,operator)
        THEN operator == operatorPressed
        THEN number2 == "";
Equals Button
    IF number1 != "" AND number2 !="" AND operator != ""
        THEN sum = sum(number1,number2,operator);
        THEN number1 = sum
        THEN operator = ""
        THEN number2 = "";
Decimal
    IF operator == ""
        IF number1 == ""
            THEN return "0."
        IF number1 != ""
            IF number1 has a decimal
                THEN return error
            ELSE
                THEN append decimal to end of number1
    ELSE
        IF number2 == ""
            THEN return "0."
        IF number2 != ""
            IF number2 has a decimal
                THEN return error
            ELSE
                THEN append decimal to end of number2
    
    
--*/