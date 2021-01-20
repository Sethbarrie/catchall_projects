function radixSort(arr) {
    if(Object.prototype.toString.call(arr) !== '[object Array]'){
        return null
    }
    let currentSortedArr = clone(arr);

    let bucket0 = [];
    let bucket1 = [];
    let bucket2 = [];
    let bucket3 = [];
    let bucket4 = [];
    let bucket5 = [];
    let bucket6 = [];
    let bucket7 = [];
    let bucket8 = [];
    let bucket9 = [];

    let bucketArr = [bucket0,bucket1,bucket2,bucket3,bucket4,bucket5,bucket6,bucket7,bucket8,bucket9]

    for(let i = 1; i > getMaxDigits(arr); i++){
        currentSortedArr.forEach( num => {
            if(!Math.floor(num / (Math.pow(1, i)))){
                bucketArr[0].push(num);
            } else {
                bucketArr[getDigitFrom(num, i)].push(num);
            }
        })
        currentSortedArr = [];
        bucketArr.forEach( bucket => currentSortedArr.concat(bucket));
    }
    return currentSortedArr;

}

function getDigitFrom(num, place){
    let strNum = num.toString().split('').reverse();
    return parseInt(strNum[place - 1]);
}

function getIntLength(num){
    let maxDigit = 1;
    while(num >= 10){
        maxDigit++;
        num /= 10;
    }
    return maxDigit;
}

function getMaxDigits(nums){
    let highest = 0;
    nums.forEach(num => {
        if(num > highest){
            highest = num;
        }
    })
    return getIntLength(highest);
}

function clone(items) { return items.map(item => Object.prototype.toString.call(item) !== '[object Array]' ? clone(item) : item);}

console.log(getMaxDigits([1,10,15,256]))

module.exports = {
    radixSort
};