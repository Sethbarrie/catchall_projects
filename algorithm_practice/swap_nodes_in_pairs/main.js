function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

//This method swaps the values rather than swapping the nodes around, keeping the orginal list
function swapPairs(head) {
    if(!head || !head.next){
        return head;
    }
    let node1 = head;
    let node2 = head.next;
    let tempVal;
    while(node1 && node2){
        tempVal = node1.val;
        node1.val = node2.val;
        node2.val = tempVal;
        if(node2.next && node2.next.next){
            node1 = node1.next.next;
            node2 = node2.next.next;
        } else{
            break;
        }
    }
    return head;
};

