//npm run start:dev tasks_nodejs_basics/task_2.ts

// const array = [1, 2, 3, 6, 7, 9];

const array = Array.from({length: 10}, () => Math.floor(Math.random() * 100));

function removeElements<T>(array: T[], rule: (element: T) => boolean): [T[], T[]] {
    const removedElements: T[] = [];

    for (let i = 0; i < array.length; i++) {
        if (rule(array[i])) {
            removedElements.push(array.splice(i, 1)[0]);
            i--;
        }
    }

    return [removedElements, array];
}
const [deletedElements, arr] = removeElements(array, (item) => item % 2 === 0);
console.log(arr);
console.log(deletedElements);