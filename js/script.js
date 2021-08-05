let objCalculator = {
    init:function(){
        this.getAllElements();
        this.addEventListeners();
    },
    getAllElements:function(){
        this.objPreview = document.querySelector('.preview');
        this.objSum = document.querySelector('.sum');
        this.objClear = document.querySelector('.clear');
        this.objDecimal = document.querySelector('.decimal');
        this.objEquals = document.querySelector('.equals');

        this.arrNumbers = document.querySelectorAll('.number');
        this.arrOperators = document.querySelectorAll('.operator');
    },
    addEventListeners:function(){
        for(counter=0; counter < this.arrNumbers.length; counter++){
            let currentNumber = this.arrNumbers[counter];
            // console.log(currentNumber);
            currentNumber.addEventListener('click',function(event){
            console.log(event.target.innerHTML);
            });
        }
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