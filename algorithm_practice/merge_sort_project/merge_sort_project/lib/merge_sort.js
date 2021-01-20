function merge(array1, array2) {

    let mergedArr = [];

    while(array1.length && array2.length){
        if(array1[0] < array2[0]){
            mergedArr.push(array1.shift());
        } else {
            mergedArr.push(array2.shift());
        }
    }

    return [...mergedArr, ...array1, ...array2]
}

function mergeSort(array) {
    if(array.length <= 1){
        return array;
    }

    let pivot = Math.floor(array.length / 2);

    let leftArr = mergeSort(array.slice(0, pivot));
    let rightArr = mergeSort(array.slice(pivot));

    return merge(leftArr, rightArr);
}


module.exports = {
    merge,
    mergeSort
};