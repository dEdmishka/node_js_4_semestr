//npm run start:dev tasks_typescript/task_3.ts

function deepCopy<T>(person: T): T {
    return JSON.parse(JSON.stringify(person));
}

interface IPerson {
    name: string,
    city: string
}

interface IPersonDetail {
    name?: string,
    city?: string,
    info: {
        param: IPerson,
        age: number
    }
}

const person0: IPerson = {
    "name": "Petro",
    "city": "Kharkiv",
}

const person1: IPersonDetail = {
    "name": "Misha",
    "city": "Kiyv",
    "info": {
        "age": 18,
        "param": person0
    }
}

const person2: IPersonDetail = deepCopy(person1)

console.log(person1)
console.log(person2)
person1.info.param.name = "Anton"
person2.name = 'Sasha'
console.log(person1)
console.log(person2)