import {LinkedList, LinkedListType, NodeType} from "./linked-list";

export type KeyValuePair = [string, string]

const HashMap = (hashHapLength = 16, loadFactor = 0.75) => {

    let maxLength = hashHapLength;
    let maxCapacity = Math.floor(maxLength * loadFactor);


    let hashMap: LinkedListType[] = [];

    const getHashMapSize = () => hashMap.reduce((nodeCount, linkedList) => {
        return nodeCount + linkedList?.size() ?? 0;
    }, 0);

    const isTimeToGrowHashMap = () => maxCapacity <= getHashMapSize();


    const keyToHash = (key: string) => {
        let hashCode = 0;
        const PRIME_NUMBER = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode += PRIME_NUMBER * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    };

    const getHashedKeyIndex = (key: string) => {
        const hashedKey = keyToHash(key);
        return getHashIndex(hashedKey);
    };

    const getHashIndex = (hash: number) => {
        return hash % maxLength;
    };

    const set = (key: string, value: string) => {
        if (isTimeToGrowHashMap()) {
            console.log('called');
            growHashMap();
        }
        const indexForHashedKey = getHashedKeyIndex(key);
        const bucket = hashMap[indexForHashedKey];

        if (!bucket) {
            hashMap[indexForHashedKey] = LinkedList([key, value]);
            return;
        }

        const indexInBucket = bucket.find(key);
        if (!indexInBucket && indexInBucket !== 0) {
            bucket.append([key, value]);
            return;
        }

        const searchedNode = bucket.at(indexInBucket) as NodeType;
        const [keyInNode] = searchedNode?.value ?? [null];
        if (keyInNode === key || !keyInNode) {
            searchedNode.value = [key, value];
        }
    };

    const get = (key: string) => {
        const keyIndex = getHashedKeyIndex(key);
        const bucket = hashMap[keyIndex];
        const nodeIndex = bucket.find(key);

        if (nodeIndex === null || !bucket) {
            return null;
        }
        const nodeInBucket = bucket.at(nodeIndex) as NodeType;

        const [_, nodeValue] = nodeInBucket.value ?? [null, null];
        return nodeValue;

    };

    const has = (key: string) => {
        const hashIndex = getHashedKeyIndex(key);
        const bucket = hashMap[hashIndex];
        if (!bucket) {
            return false;
        }
        const nodeInBucket = bucket.find(key);
        return nodeInBucket !== null;
    };

    const remove = (key: string) => {
        const hashIndex = getHashedKeyIndex(key);
        const bucket = hashMap[hashIndex];

        if (!bucket || !bucket?.contains(key)) {
            return false;
        }

        const nodeIndexInBucket = bucket.find(key);

        if (nodeIndexInBucket === null) {
            return false;
        }
        bucket.removeAt(nodeIndexInBucket);
        return true;
    };

    const length = () => {
        return hashMap.reduce((count, node) => count + node.size(), 0);
    };

    const clear = () => {
        hashMap.length = 0;
    };

    const keys = () => {
        return hashMap.flatMap((bucket) => {
                let currentNode = bucket.getLinkedList();
                const keysInLinkedList: (string | null)[] = [];
                while (!!currentNode) {
                    const [key] = currentNode.value ?? [null];
                    keysInLinkedList.push(key);
                    currentNode = currentNode.next;
                }
                return keysInLinkedList;
            }
        );
    };


    const values = () => {
        return hashMap.flatMap((bucket) => {
                let currentNode = bucket.getLinkedList();
                const valuesInLinkedList: (string | null)[] = [];
                while (!!currentNode) {
                    const [_, value] = currentNode.value ?? [null, null];
                    valuesInLinkedList.push(value);
                    currentNode = currentNode.next;
                }
                return valuesInLinkedList;
            }
        );
    };

    const entries = () => {
        return hashMap.flatMap((bucket) => {
                let currentNode = bucket.getLinkedList();
                const entriesInLinkedList: (KeyValuePair | null)[] = [];
                while (!!currentNode) {
                    entriesInLinkedList.push(currentNode.value);
                    currentNode = currentNode.next;
                }
                return entriesInLinkedList;
            }
        );
    };

    const growHashMap = () => {
        const oldHash = hashMap;
        hashMap = [];
        maxLength *= 2;
        maxCapacity = Math.floor(maxLength * loadFactor);
        oldHash.forEach((bucket) => {
            let currentNode = bucket.getLinkedList();
            while (!!currentNode) {
                const [key, value] = currentNode.value ?? ['', ''];
                set(key, value);
                currentNode = currentNode.next;
            }
        });
    };
    const getHashMap = () => hashMap;

    return {
        set,
        getHashMap,
        getHashMapSize,
        get,
        has,
        remove,
        length,
        clear,
        keys, values, entries,


    };
};

const test = HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log(test.getHashMap().map((bucket) => bucket.getLinkedList()));
console.log(test.getHashMapSize());
test.set('moon', 'silver');

// console.log(test.getHashMapSize(), test.getHashMapCurrentMaxCapacity(), test.isTimeToGrowHashMap());
console.log(test.getHashMap().map((bucket) => bucket.getLinkedList()));
