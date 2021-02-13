function isAnagram(string1, string2) {
    let strCount = {};
    for(let char of string1){
        strCount[char]? strCount[char]++ : strCount[char] = 1;
    }
    let flag;
    for(let char of string2){
        strCount[char] ? strCount[char]-- : flag = true;
    }
    if(flag) return false;
    return Object.keys(strCount).every( char => !strCount[char])
};