console.log("test");

// Number1, Number2, Operator

// number1 {operator} number2

// 10 + 5
// 10 - 5
// 10 / 5
// 10 * 5

/*--

Cancel
    number1 = ""
    number2 = ""
    operator = ""

Numbers & operators
    IF number1 == ""
        THEN number1 = numberPressed
    ELSE
        IF operator == ""
            THEN number 1 += number
        
    IF operator =="" and number1 != ""
        operator = operatorPressed
    ELSE IF oprator == "" AND number1 == ""
        THEN return error
    ELSE IF operator != "" AND number1 != "" AND number2 == ""
        operator == operatorPressed
    ELSE IF operator != "" AND number2 != ""
        THEN number1 == sum(number1,number2,operator) AND operatorPressed AND number 2 ==""

Equals button
    IF number 1 != "" AND number2 != "" AND operator != ""
        THEN sum = sum(number1,number2,operator)
        THEN number 1 = sum
        THEN operator = ""
        THEN number2 = ""

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
                THEN append decimal to end of number1
--*/