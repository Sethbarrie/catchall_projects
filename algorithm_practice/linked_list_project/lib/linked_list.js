// ============================================================================
// Implementation Exercise: Singly Linked List
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement a Singly Linked List and all of its methods below!
//
// ------------
// Constraints:
// ------------
//
// Make sure the time and space complexity of each is equivalent to those 
// in the table provided in the Time and Space Complexity Analysis section
// of your Linked List reading!
//
// -----------
// Let's Code!
// -----------

// TODO: Implement a Linked List Node class here
class Node {
    constructor(val) {
        this.value = val ? val : null;
        this.next = null;
    }
}

// TODO: Implement a Singly Linked List class here
class LinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    // TODO: Implement the addToTail method here
    addToTail(val) {
        let newNode = new Node(val);
        if(!this.head){
            this.head = newNode;
        }
        if(this.tail) {
            this.tail.next = newNode;
        }
        this.tail = newNode;
        this.length++;
        return this;
    }

    // TODO: Implement the removeTail method here
    removeTail() {
        if(!this.length){
            return undefined;
        }

        let deletedNode = this.tail;
        
        if(this.length === 1){
            this.head = null;
            this.tail = null;
        }

        this.length --;

        if(this.length){
            let prevNode = this.head;
            while(prevNode.next !== deletedNode){
                prevNode = prevNode.next;
            }
            prevNode.next = null;
            this.tail = prevNode;
        }
        return deletedNode;
    }

    // TODO: Implement the addToHead method here
    addToHead(val) {
        let newNode = new Node(val);
        if(!this.length){
            this.tail = newNode;
        } else {
            newNode.next = this.head;
        }
        this.head = newNode;
        this.length++;
        return this;

    }

    // TODO: Implement the removeHead method here
    removeHead() {
        if(!this.length){
            return undefined;
        }
        let deletedNode = this.head;
        this.length--;

        if(!this.length){
            this.head = null;
            this.tail = null;
        } else {
            this.head = deletedNode.next;
        }
        return deletedNode;
    }

    // TODO: Implement the contains method here
    contains(target) {
        let currentNode = this.head;
        if(!currentNode.next){
            return target === currentNode.value;
        } else {
            while(currentNode.next){
                if(target === currentNode.value){
                    return true;
                }
                currentNode = currentNode.next;
            }
        }
        return currentNode.value === target;
    }

    // TODO: Implement the get method here
    get(index) {
        let currentNode = this.head;
        while( index ){
            if(!currentNode.next && index >= 1){
                return null
            }
            currentNode = currentNode.next;
            index--;
        }
        return currentNode;
    }

    // TODO: Implement the set method here
    set(index, val) {
        let newNodeValue = this.get(index);
        if(newNodeValue){
            newNodeValue.value = val;
            return true;
        } else {
            return false;
        }
    }

    // TODO: Implement the insert method here
    insert(index, val) {
        let prevNode;
        if(!index){
            prevNode = this.head;
        } else {
            prevNode = this.get(index - 1);
        }
        if(prevNode && prevNode.next){
            let tempNode = prevNode.next;
            let newNode = new Node(val);
            prevNode.next = newNode;
            newNode.next = tempNode;
            this.length++;
            return true;
        } else {
            return false;
        }
    }

    // TODO: Implement the remove method here
    remove(index) {
        let prevNode;
        if(!index){
            prevNode = this.head;
        } else {
            prevNode = this.get(index - 1);
        }
        if(!prevNode || !prevNode.next){
            return undefined;
        }
        let deletedNode = prevNode.next;
        let nextNode;
        if(deletedNode && deletedNode.next){
            nextNode = deletedNode.next;
        }
        this.length--;
        prevNode.next = nextNode;
        return deletedNode;

    }

    // TODO: Implement the size method here
    size() {
        let count = 0;
        let currentNode = this.head;
        if(currentNode){
            while(currentNode){
                count++;
                currentNode = currentNode.next;
            }
        }
        return count;
    }
}

exports.Node = Node;
exports.LinkedList = LinkedList;
