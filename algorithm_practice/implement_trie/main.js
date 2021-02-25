
const Trie = function() {
    this.root = new Node()
};

const Node = function(val = ''){
    this.val = val;
    this.keys = {};
    this.end = false;  
};

Trie.prototype.insert = function(word, node = this.root) {
    if(!word.length){
        node.end = true;
        return;
    }
    let tempStr = word[0];
    if(node.keys[tempStr]){

        this.insert(word.substr(1), node.keys[tempStr])     
    } else {
        let newNode = new Node(tempStr)
        node.keys[tempStr] = newNode;
        this.insert(word.substr(1), node.keys[tempStr])
    }
};

Trie.prototype.search = function(word) {
    let prefixCopy = word.slice(0);
    let currentNode = this.root
    while(prefixCopy.length){
        let tempStr = prefixCopy[0]
        if(currentNode.keys[tempStr]){
            prefixCopy = prefixCopy.substr(1)
            currentNode = currentNode.keys[tempStr]
        } else {
            return false
        }
    }
    return currentNode.end
};

Trie.prototype.startsWith = function(prefix) {
    let prefixCopy = prefix.slice(0);
    let currentNode = this.root
    while(prefixCopy.length){
        let tempStr = prefixCopy[0]
        if(currentNode.keys[tempStr]){
            prefixCopy = prefixCopy.substr(1)
            currentNode = currentNode.keys[tempStr]
        } else {
            return false
        }
    }
    return true
};

Trie.prototype.wordlist = function(){
    let words = [];
    let innerSearch = function(node, string){
        let keysArr = Object.keys(node.keys);
        if(keysArr.length){
            for(const letter of keysArr){
                innerSearch(node.keys[letter], string.concat(letter));
            }
            if(node.end){
                words.push(string)
            }
        } else {
            if(string.length && node.end){
                words.push(string);
            }
        }
    }
    innerSearch(this.root, "");
    return words
};

 
const trie = new Trie();

trie.insert("apple");
console.log(trie.search("apple"));   // returns true
console.log(trie.search("app"));     // returns false
console.log(trie.startsWith("app")); // returns true
trie.insert("app");   
console.log(trie.search("app"));     // returns true