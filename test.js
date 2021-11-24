import DoublyLinkedList from './DoublyLinkedList.js';
import Node from './node.js';
let doublyLinkedList;

doublyLinkedList = new DoublyLinkedList();
doublyLinkedList.insertNodeBefore(new Node(1), 0);
doublyLinkedList.insertNodeBefore(new Node(2), 1);
doublyLinkedList.insertNodeBefore(new Node(3), 2);
doublyLinkedList.insertNodeBefore(new Node(4), 3);
doublyLinkedList.insertNodeBefore(new Node(5), 4);

doublyLinkedList.printList();
doublyLinkedList.deleteNode(3);
doublyLinkedList.printList();


