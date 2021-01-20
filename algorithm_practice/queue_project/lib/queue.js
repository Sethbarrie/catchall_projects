// ============================================================================
// Implementation Exercise: Queue
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement a Queue and all of its methods below!
//
// ------------
// Constraints:
// ------------
//
// Make sure the time and space complexity of each is equivalent to those 
// in the table provided in the Time and Space Complexity Analysis section
// of your Stack reading!
//
// -----------
// Let's Code!
// -----------

class Node {

    constructor(value){
        this.value = value;
        this.next = null;
    }

}

class Queue {

    constructor(){
        this.front = null;
        this.back = null;
        this.length = 0;
    }

    enqueue(val){

        let newNode = new Node(val);
        if(!this.length){
            this.front = newNode;
        } else if(this.length === 1){
            this.front.next = newNode;
        } else {
            this.back.next = newNode;
        }
        this.back = newNode;
        this.length++

        return this.length;

    }

    dequeue(){
        if(!this.length){
            return null;
        }
        this.length--;
        if(!this.length){
            this.back = null;
        }
        let removedNode = this.front;
        this.front = this.front.next;

        return removedNode.value;

    }

    size(){
        return this.length;
    }

}

exports.Node = Node;
exports.Queue = Queue;