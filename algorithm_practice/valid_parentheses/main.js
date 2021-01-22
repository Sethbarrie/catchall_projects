function validParentheses(s) {
    let checkLeftHash = {
        '{': '{',
        '[': '[',
        '(': '(',
        
    }
    let checkRightHash = {
        '}': '{',
        ']': '[',
        ')': '('
    }
    let queue = [];
    for(let char of s){
        if(checkLeftHash[char]){
            queue.push(char)
        } else {
            switch(char){
                case '}':
                case ']':
                case ')':
                    if(queue[(queue.length - 1)] !== checkRightHash[char]){
                        return false
                    } else {
                        queue.pop();
                    }
                    break;
                default:
                    console.log('Leetcode said there would only be those inputs!')
            }
        }
    }
    return !!!queue.length
};