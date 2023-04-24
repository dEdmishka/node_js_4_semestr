//npm run start:dev tasks_typescript/task_4.ts

const calc = (...args: number[]): number => {
    let sum: number = 0;
    for (const i in args) {
        sum += +args[i];
    }
    console.log('I calculate!!!')
    return sum;
};

const wrapper = (func: Function): (...args: number[]) => number => {

    const cache: Map<string, number> = new Map();

    return (...args: number[]): number => {
        const key: string = args.map(x => x).join('|');
        const val: number | undefined = cache.get(key);

        if (val) {
            console.log('from cache ' + val);
            return val;
        }
        try {
            const res: number = func(...args);
            cache.set(key, res)
            console.log('calculated ' + res);
            return res;
        } catch (err) {
            console.log(err)
            return 0;
        }
    };
};

const cachedCalc = wrapper(calc);
// console.log('value: ' + cachedCalc(2, {}, 3)); // 9 calculated
console.log('value: ' + cachedCalc(2, 2, 3)); // 7 calculated
console.log('value: ' + cachedCalc(2, 5, 3)); // 10 from cache
console.log('value: ' + cachedCalc(2, 5, 3)); // 10 from cache

