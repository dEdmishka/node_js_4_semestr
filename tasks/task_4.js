const calc = (...args) => {
    let sum = 0;
    for (const i in args) {
        if (typeof args[i] !== 'number') {
            throw new Error('Write valid symbols, a.k.a numbers :)')
        }
        sum += +args[i];
    }
    console.log('I calculate!!!')
    return sum;
};

const wrapper = func => {
    let cache = {};

    return (...args) => {
        const key = args.map(x => x).join('|');
        const val = cache[key];

        if (val) {
            console.log('from cache ' + val);
            return val;
        }
        try {
            const res = func(...args);
            cache[key] = res;
            console.log('calculated ' + res);
            return res;
        } catch (err) {
            console.log(err)
            return 0;
        }

    };
};

const cachedCalc = wrapper(calc);
console.log('value: ' + cachedCalc(2, {}, 3)); // 9 calculated
// console.log('value: ' + cachedCalc(2, 2, 3)); // 7 calculated
console.log('value: ' + cachedCalc(2, 5, 3)); // 9 from cache
console.log('value: ' + cachedCalc(2, 5, 3)); // 9 from cache

