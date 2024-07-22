"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linked_list_1 = require("./linked-list");
const HashMap = (length = 16, loadFactor = 0.8) => {
    const maxCapacity = Math.floor(length * loadFactor);
    const hashMap = [];
    const getHashMapSize = () => hashMap.reduce((nodeCount, linkedList) => {
        return nodeCount + linkedList?.size() ?? 0;
    }, 0);
    const keyToHash = (key) => {
        let hashCode = 0;
        const PRIME_NUMBER = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode += PRIME_NUMBER * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    };
    const getHashedKeyIndex = (key) => {
        const hashedKey = keyToHash(key);
        return getHashIndex(hashedKey);
    };
    const getHashIndex = (hash) => {
        const HASH_DIVIDER = 16;
        return hash % HASH_DIVIDER;
    };
    const set = (key, value) => {
        const indexForHashedKey = getHashedKeyIndex(key);
        const bucket = hashMap[indexForHashedKey];
        if (!bucket) {
            hashMap[indexForHashedKey] = (0, linked_list_1.LinkedList)([key, value]);
            return;
        }
        const indexInBucket = bucket.find(key);
        if (!indexInBucket && indexInBucket !== 0) {
            bucket.append([key, value]);
            return;
        }
        const searchedNode = bucket.at(indexInBucket);
        const [keyInNode] = searchedNode?.value ?? [null];
        if (keyInNode === key || !keyInNode) {
            searchedNode.value = [key, value];
        }
    };
    const get = (key) => {
        const keyIndex = getHashedKeyIndex(key);
        const bucket = hashMap[keyIndex];
        const nodeIndex = bucket.find(key);
        if (!nodeIndex) {
            return null;
        }
        const nodeInBucket = bucket.at(nodeIndex);
        const [_, nodeValue] = nodeInBucket.value ?? [null, null];
        return nodeValue;
    };
    const has = (key) => {
        const hashIndex = getHashedKeyIndex(key);
        const bucket = hashMap[hashIndex];
        if (!bucket) {
            return false;
        }
        const nodeInBucket = bucket.find(key);
        return nodeInBucket !== null;
    };
    const getHashMap = () => hashMap;
    return {
        keyToHash,
        hashMap,
        set,
        getHashMap,
        getHashMapSize,
        get,
        has,
        maxCapacity
    };
};
const myHashMap = HashMap();
myHashMap.set('saRa', 'value');
myHashMap.set('raSa', 'old value');
myHashMap.set('raSa', 'new value');
console.log(myHashMap.get('raSa'), myHashMap.has('raSa'));
//# sourceMappingURL=index.js.map