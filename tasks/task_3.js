function deepCopy(person) {
    return JSON.parse(JSON.stringify(person));
}


const person0 = {
    "isStudent": true
}

const person1 = {
    "a": 1,
    "city": "Kivy",
    "info": {
        "age": 18,
        "param": person0
    }
}

const person2 = deepCopy(person1)

console.log(person1)
console.log(person2)
person1.info.param.isStudent = false
person2.a = 5
console.log(person1)
console.log(person2)