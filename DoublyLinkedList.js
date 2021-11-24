export default class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    searchNode(value) {
        let temp = this.head;
        let viTri = 0;
        while (temp) {
            if (temp.video === +value) {
                console.log('Tìm thấy ' + value + ' tại vị trí thứ ' + viTri);
                return temp;
            }
            viTri++;
            temp = temp.next;
        }
        console.log('Không tìm thấy ' + value);
        return null;
    }
    insertNodeBefore(node, position) {
        if (!this.head) {
            this.head = node;
            this.tail = node;
            this.size++;
            return;
        }
        if (position < 1) {
            let temp = this.head;
            node.next = temp;
            this.head = node;
            temp.prev = node;
            this.size++;
            return
        } else if (position >= this.size) {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
            this.size++;
            return;
        }

        let pos = 0;
        let temp = this.head;
        while (temp && pos < position - 1) {
            pos++;
            temp = temp.next;
        }
        node.next = temp.next;
        temp.next.prev = node;
        temp.next = node;
        node.prev = temp;
        this.size++;

    }
    deleteNode(value) {
        let search = this.searchNode(value);
        if (!search) return;
        // neu co 1 toa
        if (this.size === 1) {
            this.head = null;
            this.tail = null;
            this.size = 0;
            return;
        }
        // Xoa toa o dau
        if (search === this.head) {
            this.head.next.prev = null;
            this.head = this.head.next;
        }
        // Xóa toa ở cuối
        else if (search === this.tail) {
            this.tail.prev.next = null;
            this.tail = this.tail.prev;
        }
        // Xóa tại diem search
        else {
            search.prev.next = search.next;
            search.next.prev = search.prev;
        }
        this.size--;
    }
    printList() {
        let temp = this.head;
        let output = 'List : ';
        while (temp) {
            output += temp.video + ', ';
            temp = temp.next;
        }

        console.log('Head', this.head);
        console.log('Tail', this.tail);
        console.log(output);
    }
}

