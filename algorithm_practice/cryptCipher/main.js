//This function takes in a string and a 2d array of numbers and letters.
// the string corresponds to the 2d array, and the values of strings get
// replaced by the corresponding number. Then you check if the crypt is a valid
// function in this format

// crypt[0] + crypt[1] === crypt[2]

//if it is, and there are no leading 0s, then return true, otherwise, false.

function isCryptSolution(crypt, solution) {
    //Nicer format to work in plus it's searchable
    let keyHash = {};
    for(let pair of solution){
        keyHash[pair[0]] = pair[1];
    }
    //cleaner method for checking leading zeros
    let num1 = parseInt(keyHash[crypt[0][0]]);
    let num2 = parseInt(keyHash[crypt[1][0]]);
    let num3 = parseInt(keyHash[crypt[2][0]]);
    //catches if any are leading zeros, not just the left side of the equation
    let flag = [num1, num2, num3].some((num, idx) => !num && crypt[idx].length > 1);
    if(!flag){
        //lovely one liner to replace each of the crypt words with the number after the letters are swapped out for the key values
        let numArr = crypt.map(word => parseInt(word.split('').map( letter => keyHash[letter]).join('')))
        //Final boolean return
        return ((numArr[0] + numArr[1]) === numArr[2])
    } else {
        //conditional if there is a leading zero, doesn't matter how correct that equation is
        return false;
    }
}
