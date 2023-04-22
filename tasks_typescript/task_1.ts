//npm run start:dev tasks_typescript/task_1.ts

function calc(a: number): Function {
    let sum: number = a;

    function curriedSum(b: number): Function | number {
        if (!arguments.length) {
            return sum;
        }
        sum += b;
        return curriedSum;
    }

    return curriedSum;
}

console.log(calc(2)(4)(3)()); // 9
console.log(calc(2)(4)(3)(3)(7)(3)(3)(3)()); // 28
