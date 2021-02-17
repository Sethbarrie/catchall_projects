function kWeakestRows(array, num) {
    let soldierCount = array.map( subArr => subArr.reduce((acc, ele) => ele === 1 ? acc + 1 : acc, 0))
    let armyObj = {}
    soldierCount.forEach(( ele, idx) => {
        armyObj[ele] ? armyObj[ele].push(idx) : armyObj[ele] = [idx];
    })
    let returnArr = [];
    for(let arr of Object.keys(armyObj)){
        if(returnArr.length < num){
            returnArr = returnArr.concat(armyObj[arr])
        }
        if(returnArr.length < num){
            continue
        } else {
            while(returnArr.length > num){
                returnArr.pop()
            }
            return returnArr
        }
    }
    return returnArr;
};