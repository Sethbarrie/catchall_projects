function reverseInParentheses(inputString) {  
    for(let i = 0;i < inputString.length; i++){
        if(inputString[i] === '('){
            let firstPointer = i;
            for(let j = i + 1; j < inputString.length; j++){
                if(inputString[j] === '('){
                    firstPointer = j;
                }
                if(inputString[j] === ')'){
                    let str = inputString.slice(firstPointer, j + 1);
                    let revstr = str.split('').reverse();
                    revstr.pop();
                    revstr.shift();
                    revstr = revstr.join('');
                    console.log(revstr)
                    inputString = inputString.replace(str, revstr);
                    i = 0;               
                    break;   
                }
            }
        }
    }
    return inputString;
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


function someFunction(input){

    let arr = [];
    for(let value of Object.values(input)){
        let innerArr = [value.name, ...value.shoes.map(innerVal => (`${innerVal.name} ${innerVal.price}`))]
        arr.push(innerArr.join(', '))
    }
    return arr.join('\n')

}

let currentInventory = [
    {
      name: 'Brunello Cucinelli',
      shoes: [
        {name: 'tasselled black low-top lace-up', price: 1000},
        {name: 'tasselled green low-top lace-up', price: 1100},
        {name: 'plain beige suede moccasin', price: 950},
        {name: 'plain olive suede moccasin', price: 1050}
      ]
    },
    {
      name: 'Gucci',
      shoes: [
        {name: 'red leather laced sneakers', price: 800},
        {name: 'black leather laced sneakers', price: 900}
      ]
    }
  ];

let x = someFunction(currentInventory)
// console.log(x)