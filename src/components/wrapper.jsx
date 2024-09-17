import Button from "./button";
import Expression from "./expression";
import Result from "./result";
import { useState } from "react";

const Wrapper = () => {

    const operatorSigns = ['+', '-', '*', '/', '%', '÷', '×', '+/-'];
    
    let [expression, setExpression] = useState("");
    let [result, setResult] = useState(0);

    const runCommand = (str) => {
        // console.log(str);

        if(expression == '' && str == 0){
            return;
        }

        let expressionInput = expression;
        let evaluatedResult = result;
        let lastNumber = 0;
        
        switch (str) {
            case "AC":
                expressionInput = "";
                break;

            case "+/-":

                lastNumber = getLastNumber(expression); 
                if(lastNumber == ''){
                    return;
                }
                let alterNumber = 0;
                let tempString = expressionInput;
                // let expStringArray = expressionInput.split("(");

                if(isNaN(lastNumber)){
                    alterNumber = parseFloat(lastNumber);
                    let lastOpenBracketIndex = expressionInput.lastIndexOf("(");
                    
                    tempString = expressionInput.substring(0, lastOpenBracketIndex);
                    
                }else{

                    tempString = expressionInput.substring(0, expressionInput.lastIndexOf(lastNumber))
                    alterNumber = "(" + lastNumber * (-1) + ")";
                   
                }
                
                expressionInput = tempString + alterNumber;
                // console.log("index="+tempString);
                
                // console.log("plus/minus====="+expressionInput);
                break;
            
            case "%":
                lastNumber = getLastNumber(expression); 

                if(lastNumber == ''){
                    return;
                }

                if(expressionInput == ""){
                    expressionInput = expression;

                }else{
                    
                    // console.log(evaluateExpression(expressionInput));
                    // return;
                    expressionInput = evaluateExpression(expressionInput);
                    expressionInput += str;
                    expressionInput = (expressionInput).toString();
                }
                
                break;

            case ".":
                const hasDot = checkDot(expression);

                if(!hasDot){
                    expressionInput += ".";
                }
                break;
            
            case "÷":
            case "×":
            case "+":
            case "-":

                if(expressionInput == ""){
                    expressionInput = expression;

                }else{
                    
                    expressionInput = evaluateExpression(expressionInput);
                    expressionInput += str;
                }
                break;
        
            default:
                expressionInput += str;
                break;
        }

        setExpression(expressionInput);
        console.log(expressionInput);
        
        expressionInput = expressionInput.replaceAll("÷", "/").replaceAll('×', '*').replaceAll('%', '/100');
        console.log(expressionInput);
        evaluatedResult = evaluateResult(expressionInput);
        evaluatedResult = parseFloat(evaluatedResult);
        
        setResult(evaluatedResult);

    }

    const evaluateResult = (expString) => {
        let evalResult = "";

        try {

            if(expString == ""){

                evalResult = 0;
            }else{

                evalResult = eval(expString);
            }
        } catch (e) {

            evalResult = result;
        }

        return evalResult;
    }

    function checkDot(expString){
    
        const lastNumber = getLastNumber(expString);
        
        if(lastNumber.includes(".")){
            return true;
        }else{
            return false;
        }
    }

    function getLastNumber(expString){
        let lastOperator = {
            index: 0,
            symbol: ","
        };

        let currentOperatorIndex = 0;
        
        for(let operatorSign of operatorSigns){
            currentOperatorIndex = expString.lastIndexOf(operatorSign);
            
            if(currentOperatorIndex > lastOperator.index){
                lastOperator.index = currentOperatorIndex;
                lastOperator.symbol = operatorSign;
            }
        }
        
        let expStringArray = expString.split(lastOperator.symbol);
        
        let lastNumber = expStringArray[expStringArray.length - 1];

        return lastNumber;
    }

    function evaluateExpression(expString){
    
        // expString = expString.replaceAll("÷", "/").replaceAll('×', '*');
        let lastCharacter = expString.slice(-1);
        
        if(operatorSigns.includes(lastCharacter)){
            expString = expString.slice(0, -1);
        }
        
        return expString;
        
    }

    return (
        <>
            <div className="wrapper">x
                <div className="input-field">
                    <Expression expression={expression}/>
                    <Result result={result}/>
                </div>
                <div className="button">
                    <Button runCommand={runCommand} btnClass="btn btn-light-gray" name="AC"/>
                    <Button runCommand={runCommand} btnClass="btn btn-plus-minus btn-light-gray" name="+/-"/>
                    <Button runCommand={runCommand} btnClass="btn btn-percentage btn-light-gray" name="%"/>
                    <Button runCommand={runCommand} btnClass="btn btn-operator btn-yellow" name="÷"/>
                    <Button runCommand={runCommand} btnClass="btn btn-number btn-dark-gray" name="7"/>
                    <Button runCommand={runCommand} btnClass="btn btn-number btn-dark-gray" name="8"/>
                    <Button runCommand={runCommand} btnClass="btn btn-number btn-dark-gray" name="9"/>
                    <Button runCommand={runCommand} btnClass="btn btn-operator btn-yellow" name="×"/>
                    <Button runCommand={runCommand} btnClass="btn btn-number btn-dark-gray" name="4"/>
                    <Button runCommand={runCommand} btnClass="btn btn-number btn-dark-gray" name="5"/>
                    <Button runCommand={runCommand} btnClass="btn btn-number btn-dark-gray" name="6"/>
                    <Button runCommand={runCommand} btnClass="btn btn-operator btn-yellow"  name="-"/>
                    <Button runCommand={runCommand} btnClass="btn btn-number btn-dark-gray" name="1"/>
                    <Button runCommand={runCommand} btnClass="btn btn-number btn-dark-gray" name="2"/>
                    <Button runCommand={runCommand} btnClass="btn btn-number btn-dark-gray" name="3"/>
                    <Button runCommand={runCommand} btnClass="btn btn-operator btn-yellow"  name="+"/>
                    <Button runCommand={runCommand} btnClass="btn btn-number btn-dark-gray btn-zero" name="0"/>
                    <Button runCommand={runCommand} btnClass="btn btn-dark-gray" id="btn-dot" name="."/>
                    <Button runCommand={runCommand} btnClass="btn btn-equals-to btn-yellow" name="="/>
                </div>
            </div>
        </>
    )
}

export default Wrapper;