//npm run start:dev tasks_nodejs_basics/task_1.ts

// const array: Array<number> = [1, 2, 3];

const array: Array<string> = ["one", "two", "three"];

async function mapAsync<T, R>(
    array: T[],
    callback: (value: T, index: number, array: T[]) => Promise<R>
): Promise<R[]> {
    const results: R[] = [];
    for (let i = 0; i < array.length; i++) {
        const result = await callback(array[i], i, array);
        results.push(result);
    }
    return results;
}

mapAsync(array, (item, index) =>
    Promise.resolve({
        item,
        index
    })
)
    .then(r => console.log(r))
    .catch(e => console.log(e));

// async function asyncFunction<T>(value: T): Promise<T> {
//     // Додайте затримку, щоб імітувати асинхронну функцію
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     // Повертаємо квадрат числа
//     return value;
// }
// async function node() {
//     const results = await mapAsync(array, (item, index) =>
//         Promise.resolve({
//             item: item + ' -- element!',
//             index: index * -1,
//         })
//     );
//     return results;
//     // return mapAsync(array, asyncFunction);
// }
// node().then(r => console.log(r))
// console.log(results); // [1, 4, 9]
