const checkString = (str1, str2) => {
    return !(typeof str1 !== 'string' && typeof str2 !== 'string');
}

function checkAnagramFirstVariant(str1, str2) {
    if (!checkString(str1, str2)) {
        return false
    }
    if (str1.length !== str2.length) {
        return false
    }
    const newStr1 = str1.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('')
    const newStr2 = str2.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('')

    return (newStr1 === newStr2)
}

console.log(checkAnagramFirstVariant(2103, null));
console.log(checkAnagramFirstVariant('listen', 'silent'));
console.log(checkAnagramFirstVariant('participate', 'cipatepart'));

console.log('===================')

function checkAnagramSecondVariant(str1, str2) {
    if (!checkString(str1, str1)) {
        return false
    }
    const newStr1 = str1.toLowerCase().replace(/[^a-z]/g, '')
    const newStr2 = str2.toLowerCase().replace(/[^a-z]/g, '')

    const value = 1
    const check = 0;

    let map = new Map();
    for (let i = 0; i < newStr1.length; i++) {
        map.set(newStr1[i], value)
    }

    for (let i = 0; i < newStr2.length; i++) {
        if (map.has(newStr2[i])) {
            map.set(newStr2[i], check);
        }
    }

    let keys = map.keys();

    for (let key of keys) {
        if (map.get(key) !== check) {
            return false;
        }
    }
    return true;
}

console.log(checkAnagramSecondVariant(2103, null));
console.log(checkAnagramSecondVariant('listen', 'silent'));
console.log(checkAnagramSecondVariant('participate', 'piratec'));

