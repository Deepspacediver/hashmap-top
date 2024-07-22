import {KeyValuePair} from "./index";

export type NodeType = {
    value: KeyValuePair | null,
    next: NodeType | null,
}

const Node = (value?: KeyValuePair): NodeType => {
    return ({
        value: value ?? null,
        next: null,
    });

};

export const convertKeyValuePairToString = (value: KeyValuePair | null) => {
    return value ? value.join(' ') : null;
};

export const LinkedList = (value?: KeyValuePair) => {
    let list = value ? Node(value) : null;

    const getLinkedList = () => list;

    const traverseToLastNode = (node = list): NodeType | null => {
        if (!node) {
            return null;
        }
        if (!node.next) {
            return node;
        }
        return traverseToLastNode(node.next);
    };

    const append = (value: KeyValuePair) => {
        if (!list) {
            list = Node(value);
            return;
        }
        traverseToLastNode()!.next = Node(value);
    };


    const prepend = (value: KeyValuePair) => {
        if (!list) {
            list = Node(value);
            return;
        }

        const newList = Node(value);
        newList.next = list;
        list = newList;

    };

    const head = () => list;

    const size = () => {
        if (!list) {
            return 0;
        }
        let nodeCount = 1;
        let currentNode = list;
        while (currentNode.next) {
            nodeCount += 1;
            currentNode = currentNode.next;
        }
        return nodeCount;
    };

    const tail = () => {
        return traverseToLastNode();
    };

    const at = (index: number) => {
        if (!index) {
            return list;
        }
        let currentIndex = 0;
        let currentNode = list;
        while (currentIndex < index && !!currentNode?.next) {
            currentIndex++;
            currentNode = currentNode!.next;
        }

        if (currentIndex === index) {
            return currentNode;
        }
        return null;
    };

    const pop = () => {
        if (!list) {
            return;
        }
        if (!list?.next) {
            list = null;
            return;
        }
        let secondToLastNode = list;
        let lastNode: NodeType | null = list.next;
        while (!!lastNode.next) {
            secondToLastNode = lastNode;
            lastNode = lastNode.next;
        }

        secondToLastNode.next = null;
    };


    const contains = (key: string, shouldReturnNode = false) => {
        let currentNode = list;
        if (!currentNode) {
            return false;
        }


        while (currentNode) {
            const [currentValue] = currentNode.value ?? [''];
            if (!!currentValue && currentValue === key) {
                return shouldReturnNode ? currentNode : true;
            }
            currentNode = currentNode.next;
        }

        return false;
    };

    const find = (key: string) => {
        let currentIndex = 0;
        let currentNode = list;
        while (currentNode) {
            const [currentValue] = currentNode?.value ?? [''];
            if (!!currentValue && currentValue === key) {
                return currentIndex;
            }
            currentIndex += 1;
            currentNode = currentNode.next;

        }
        return null;
    };

    return {
        append,
        traverseToLastNode,
        getLinkedList,
        prepend,
        tail,
        size,
        head,
        at,
        pop,
        contains,
        find
    };
};

export type LinkedListType = ReturnType<typeof LinkedList>

