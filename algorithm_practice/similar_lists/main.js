function areSimilar(a, b) {
    let a1,b1,a2,b2;
    for(let i = 0; i < a.length; i++){
        if(a[i] !== b[i]){
            if(isDefined(a1,b1,a2,b2)){
                return false
            } else if (isDefined(a1,b1)){
                a2 = a[i];
                b2 = b[i];
            } else {
                a1 = a[i];
                b1 = b[i];
            }
        }
    }
    if(a1 === b2 && a2 === b1){
        return true;
    } else {
        return false;
    }
}

function isDefined(...args){
    return args.every(ele => ele !== undefined)
}


let a = [1, 2, 3]
let b = [1, 2, 3]

console.log(areSimilar(a,b)) //true

a = [1, 2, 3]
b = [2, 1, 3]

console.log(areSimilar(a,b)) //true

a = [1, 2, 2]
b = [2, 1, 1]

console.log(areSimilar(a,b)) //false

a = [1, 1, 4]
b = [1, 2, 3]

console.log(areSimilar(a,b)) //false

a = [1, 2, 3]
b = [1, 10, 2]

console.log(areSimilar(a,b)) //false

a = [2, 3, 1]
b = [1, 3, 2]

console.log(areSimilar(a,b)) //true

a = [2, 3, 9]
b = [10, 3, 2]

console.log(areSimilar(a,b)) //false

a = [4, 6, 3]
b = [3, 4, 6]

console.log(areSimilar(a,b)) //false

a = [832, 998, 148, 570, 533, 561, 894, 147, 455, 279]
b = [832, 998, 148, 570, 533, 561, 455, 147, 894, 279]

console.log(areSimilar(a,b)) //true

a = [832, 998, 148, 570, 533, 561, 894, 147, 455, 279]
b = [832, 570, 148, 998, 533, 561, 455, 147, 894, 279]

console.log(areSimilar(a,b)) //false