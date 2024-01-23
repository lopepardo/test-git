const Node = require("./Node")

const _isRequired = (parameterName) => {
    throw new Error(`${parameterName} is required`);
}

class LinkedList {
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    append(value = _isRequired("Value")) {
        const newNode = new Node(value);

        if(!this.head){
            this.head = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
        }

        this.tail = newNode;
        this.size++;
        return this;
    }

    preappend(value = _isRequired("Value")) {
        const newNode = new Node(value);

        if(!this.head){
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
        }

        this.head = newNode;
        this.size++;
        return this;
    }

    insert(value = _isRequired("Value"), pos = _isRequired("Position")){
        if(pos > this.size) throw new Error("The position must be less than or equal to the list size");

        const newNode = new Node(value);

        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        } else {
            if(pos === 0) return this.preappend(value);
            if(pos === this.size) return this.append(value);

            let selectorNode = this.head;
            for(let count = 0; count < pos; count++){
                selectorNode = selectorNode.next;
            }
            const prevNode = selectorNode.prev;
            prevNode.next = newNode;
            newNode.prev = prevNode;
            newNode.next = selectorNode;
            selectorNode.prev = newNode;
        }
        this.size++;
        return this;
    }

    _resetList(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    pop(){
        if(!this.head && !this.tail) return this;

        if(this.head === this.tail){
            this._resetList();
        } else {
            const prevNode = this.tail.prev;
            prevNode.next = null;
            this.tail = prevNode;
            this.size--;
        }
        return this;
    }

    shift(){
        if(!this.head && !this.tail) return this;

        if(this.head === this.tail){
            this._resetList();
        } else {
            const nextNode = this.head.next;
            nextNode.prev = null;
            this.head = nextNode;
            this.size--;
        }
        return this;
    }

    remove(pos = _isRequired("Position")){
        if(pos > this.size) throw new Error("The position must be less than or equal to the list size");

        if(pos === 0) return this.shift();
        if(pos === this.size) return this.pop();

        let selectorNode = this.head;
        for(let count = 0; count < pos; count++){
            selectorNode = selectorNode.next;
        }
        selectorNode.prev.next = selectorNode.next;
        selectorNode.next.prev = selectorNode.prev;
        selectorNode.prev = null;
        selectorNode.next = null;

        this.size--;
        return this;
    }

    find(value = _isRequired("Value")){
        let selectorNode = this.head;
        const nodesList = [];
        while(!!selectorNode.next){
            if(selectorNode.value === value) nodesList.push(selectorNode);
            selectorNode = selectorNode.next;
        }
        return nodesList.length !== 0 ? nodesList : null;
    }
}

module.exports = LinkedList;
