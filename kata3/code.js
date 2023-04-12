export function add(stringInput){
    if(stringInput === "") return 0;
    let arrayOperands = getOperands(stringInput);
    const negatives = getNegatives(arrayOperands);
    if(negatives.length !== 0){
        return "negatives not allowed " + negatives.join(", ");
    }
    arrayOperands = deleteThousands(arrayOperands);
    return arrayOperands.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

export function checkNewDelimiterSyntax(stringInput){
    const pattern = new RegExp(/\/\/(.{1}|(\[([^\[\]]+)\])+)\n/g);
    return pattern.test(stringInput);
}

export function getOperands(stringInput){
    const operandsString = stringInput.match(/(-?\d[\s\S]*)/)[1];
    const regexForSplit = formRegexSplit(stringInput);
    const arrayString = operandsString.split(regexForSplit);
    return arrayString.map(stringNumber => parseInt(stringNumber));
}

function formRegexSplit(stringInput){
    if(checkNewDelimiterSyntax(stringInput)){
        let delimiters = getDelimiters(stringInput);
        delimiters = delimiters.map(scapeRegex);
        delimiters = delimiters.join("|")
        return new RegExp("\\n|" + delimiters);
    }
    return new RegExp(/\n|,/g);
}
function scapeRegex(delimiter){
    return delimiter.replace(/[\[\]\{\}\(\)\\\^\$\.\|\?\*\+]/g, "\\$&")
}
function getNegatives(intOperands){
    return intOperands.filter(operand => operand<0);
}
function deleteThousands(operands){
    return operands.filter(operand => operand <= 1000);
}
export function getDelimiters(stringInput){
    const matches = stringInput.matchAll(/(\[([^\[\]]+)\]|^\/\/([^\[\]]{1}))/g);
    return Array.from(matches).map(match => match[2] === undefined ? match[3] : match[2]);
}