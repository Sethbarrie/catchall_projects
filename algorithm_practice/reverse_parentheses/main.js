// function reverseInParentheses(inputString) {  
//     for(let i = 0;i < inputString.length; i++){
//         if(inputString[i] === '('){
//             let firstPointer = i;
//             for(let j = i + 1; j < inputString.length; j++){
//                 if(inputString[j] === '('){
//                     firstPointer = j;
//                 }
//                 if(inputString[j] === ')'){
//                     let str = inputString.slice(firstPointer, j + 1);
//                     let revstr = str.split('').reverse();
//                     revstr.pop();
//                     revstr.shift();
//                     revstr = revstr.join('');
//                     console.log(revstr)
//                     inputString = inputString.replace(str, revstr);
//                     i = 0;               
//                     break;   
//                 }
//             }
//         }
//     }
//     return inputString;
// }
function reverseInParentheses(inputString) {
    let currentParentheses = true;
    
    while(currentParentheses){
        currentParentheses = false;
        let frontParentheses = 0;
        for(let i = 0; i < inputString.length; i++){
            if(inputString[i] === '('){
                currentParentheses = true;
                frontParentheses = i;
            } else if (inputString[i] === ')'){
                let tempString = inputString.slice(frontParentheses, i + 1);
                let newString = tempString.slice(0).split('');
                newString.pop();
                newString = newString.reverse();
                newString.pop();
                newString = newString.join('');
                inputString = inputString.replace(tempString, newString);
                break;
            }
        }
    }
    
    return inputString
}

let string1 = reverseInParentheses("(bar)");
let compString1 = "rab";
console.log(string1 === compString1)
let string2 = reverseInParentheses("foo(bar)baz");
let compString2 = "foorabbaz";
console.log(string2 === compString2)
let string3 = reverseInParentheses("foo(bar)baz(blim)");
let compString3 = "foorabbazmilb";
console.log(string3 === compString3)
let string4 = reverseInParentheses("foo(bar(baz))blim");
let compString4 = "foobazrabblim";
console.log(string4 === compString4)
let string5 = reverseInParentheses("");
let compString5 = "";
console.log(string5 === compString5)
let string6 = reverseInParentheses("()");
let compString6 = "";
console.log(string6,compString6)
let string7 = reverseInParentheses("(abc)d(efg)");
let compString7 = "cbadgfe";
console.log(string7 === compString7)