let objCalculator = {
    number1:'',
    number2:'',
    operator:'',
    blnEquals:false,
    blnEqualsSuccess:false,
    errorMessageTimeout:false,
     init:function(){
        this.getAllElements();
        this.addEventListeners();
    },
    getAllElements:function(){
        this.objPreview = document.querySelector('.preview');
        this.objPrevious = document.querySelector('.previous');
        this.objSum = document.querySelector('.sum');
        this.objClear = document.querySelector('.clear');
        this.objDecimal = document.querySelector('.decimal');
        this.objEquals = document.querySelector('.equals');
        this.objErrorMessage = document.querySelector('.error_message');

        this.arrNumbers = document.querySelectorAll('.number');
        this.arrOperators = document.querySelectorAll('.operator');
    },
    addEventListeners:function(){
        let _self = this;
        for(counter=0; counter < this.arrNumbers.length; counter++){
            let currentNumber = this.arrNumbers[counter];
            // console.log(currentNumber);
            currentNumber.addEventListener('click',function(event){
                let number = event.target.innerHTML;
                _self.preview(number);
            });
        }
        for(counter=0; counter < this.arrOperators.length; counter++){
            let currentOperator = this.arrOperators[counter];
            // console.log(currentNumber);
            currentOperator.addEventListener('click',function(event){
                let operator = event.target.innerHTML;
                _self.preview(operator);
            });
        }
        this.objClear.addEventListener('click',function(event){
            _self.clear();
        });
        this.objEquals.addEventListener('click',function(event){
            _self.blnEquals = true;
            _self.equals();
        });
        this.objDecimal.addEventListener('click',function(event){
            let decimal = event.target.innerHTML;
            _self.preview(decimal);
        });
    },
    preview:function(data){
        // console.log(data);
        if(this.blnEqualsSuccess){
            this.clear();
            this.blnEqualsSuccess = false;
        }
        let dataType = 'number';
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
        if(dataType == 'number'){
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
            if(dataType == 'decimal'){
                this.addDecimal();
            } else {
                if(this.number1){
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
        this.displayPreview();
    },
    addDecimal:function(){
        if(this.operator){
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
    hasDecimal:function(number){
        let blnHasDecimal = false;
        switch(number){
            case 'number1':
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
    autocomplete: function(operator){
        let strPreviousSum = this.objPreview.value;
        this.objPrevious.value = strPreviousSum;
        let sum = this.calculate();
        this.number1 = sum;
        this.operator = operator;
        this.number2 = '';
        this.displayPreview();
    },
    clear:function(){
        this.number1 = "";
        this.number2 = "";
        this.operator = "";
        this.objPreview.value = "";
        this.objSum.value = "";
        this.objPrevious.value = "";
    },
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
    equals: function(){
        // console.log(this.blnEquals);
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
        if(blnCanDoMaths){
            let sum = this.calculate();
            if(sum !== false){
                this.updateDisplay(sum);
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
        this.blnEquals = false;
    },
    updateDisplay: function(sum){
        this.objSum.value = sum;
    },
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
    outputError:function(strErrorMessage){
        _self = this;
        clearTimeout(this.errorMessageTimeout);
        this.objErrorMessage.innerHTML = strErrorMessage;
        this.objErrorMessage.style.display = 'block';
        this.errorMessageTimeout = setTimeout(function(){
            _self.objErrorMessage.style.display = 'none';
        }, 2500);
    }
}

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