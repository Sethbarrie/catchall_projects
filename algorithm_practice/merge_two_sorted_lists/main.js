function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

function mergeTwoLists(l1, l2) {
    if(!l1){
        return l2;
    }
    if(!l2){
        return l1;
    }
    let headNode, currentNode, leftNode, rightNode
    if(l1.val > l2.val){
        headNode = l2;
        leftNode = l1;
        rightNode = l2.next;
    } else {
        headNode = l1;
        leftNode = l1.next;
        rightNode = l2;
    }
    currentNode = headNode;
    
    while(leftNode && rightNode){
        if(leftNode.val > rightNode.val){
            currentNode.next = rightNode;
            rightNode = rightNode.next;
        } else {
            currentNode.next = leftNode;
            leftNode = leftNode.next;
        }
        currentNode = currentNode.next
    }
    while(leftNode || rightNode){
        if(leftNode){
            currentNode.next = leftNode;
            leftNode = leftNode.next;
        }
        if(rightNode){
            currentNode.next = rightNode;
            rightNode = rightNode.next;
        }
        currentNode = currentNode.next
    }
    return headNode;
};