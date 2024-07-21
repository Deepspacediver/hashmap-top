"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HashMap = (length = 16, loadFactor = 0.8) => {
    const maxCapacity = Math.floor(length * loadFactor);
    const hashMap = [];
    let currentCapacity = 0;
    const increaseCapacity = () => currentCapacity += 1;
    const getCurrentCapacity = () => currentCapacity;
    const keyToHash = (key) => {
        let hashCode = 0;
        const PRIME_NUMBER = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode += PRIME_NUMBER * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    };
    const getHashIndex = (hash) => {
        const HASH_DIVIDER = 16;
        return hash % HASH_DIVIDER;
    };
    return {
        keyToHash,
        hashMap,
    };
};
const myHashMap = HashMap();
//# sourceMappingURL=index.js.map