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
            if (JSON.stringify(temp.video) === JSON.stringify(value.video)) {
                console.log('Tìm thấy ' + value.video.titleVideo + ' tại vị trí thứ ' + viTri);
                return temp;
            }
            viTri++;
            temp = temp.next;
        }
        console.log('Không tìm thấy ' + value.video.titleVideo);
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
        let output = []; // Lưu doubly thành array để xuất array ra màn hình.
        while (temp) {
            output.push(temp.video);
            temp = temp.next;
        }

        console.log(this.head, this.tail, this.size);
        console.log(output);
    }

    insertAtHead(node) {
        // Nếu head = null, ta cho cả head và tail = node mới
        if (this.head == null) {
            this.head = node;
            this.tail = node;
            this.size++;
            return;
        }
        // Nếu không ta update head = node
        this.head.prev = node;
        node.next = this.head;
        this.head = node;
        this.size++;
    }
    // Ham thêm vào cuối list
    insertAtEnd(node) {
        //Nếu head là null => node mới sẽ là head và tail
        if (this.head == null) {
            this.head = node;
            this.tail = node;
            this.size++;
            return;
        }
        // nếu đã có head, cập nhật lại tail là node mới
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
        this.size++;
    }

    returnNode(value) {
        let temp = this.head;
        for (let i = 0; i < this.size; i++) {
            if (i == value) {
                return temp;
            }
            temp = temp.next;
        }
    }
}

