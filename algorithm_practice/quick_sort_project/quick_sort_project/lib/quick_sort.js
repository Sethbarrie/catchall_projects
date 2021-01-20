function quickSort(array) {

    if(array.length <= 1){
        return array
    }
    let pivot = array[0];

    let smallerArr = array.slice(1).filter(num => pivot > num);
    let largerArr = array.slice(1).filter(num => pivot <= num);

    smallerArr = quickSort(smallerArr);
    largerArr = quickSort(largerArr);

    return [...smallerArr, pivot, ...largerArr];
}


module.exports = {
    quickSort
};