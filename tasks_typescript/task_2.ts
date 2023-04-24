//npm run start:dev tasks_typescript/task_2.ts

function checkAnagramFirstVariant(str1: string, str2: string): boolean {
    if (str1.length !== str2.length) {
        return false
    }
    const newStr1: string = str1.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('')
    const newStr2: string = str2.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('')

    return (newStr1 === newStr2)
}

// console.log(checkAnagramFirstVariant(2103, null));
console.log(checkAnagramFirstVariant('listen', 'silent'));
console.log(checkAnagramFirstVariant('participate', 'cipatepart'));

console.log('===================')

function checkAnagramSecondVariant(str1: string, str2: string): boolean {
    const newStr1: string = str1.toLowerCase().replace(/[^a-z]/g, '')
    const newStr2: string = str2.toLowerCase().replace(/[^a-z]/g, '')

    const value: number = 1;
    const check: number = 0;

    const map: Map<string, number> = new Map();
    for (let i = 0; i < newStr1.length; i++) {
        map.set(newStr1[i], value)
    }

    for (let i = 0; i < newStr2.length; i++) {
        if (map.has(newStr2[i])) {
            map.set(newStr2[i], check);
        }
    }

    let keys: IterableIterator<string> = map.keys();

    for (let key of keys) {
        if (map.get(key) !== check) {
            return false;
        }
    }
    return true;
}

// console.log(checkAnagramSecondVariant(2103, null));
console.log(checkAnagramSecondVariant('listen', 'silent'));
console.log(checkAnagramSecondVariant('participate', 'piratec'));

