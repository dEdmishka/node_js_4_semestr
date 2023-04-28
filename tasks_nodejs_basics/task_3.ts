//npm run start:dev tasks_nodejs_basics/task_3.ts
//D:\test\list.json

import * as fs from 'fs';
import * as readline from 'readline';
import * as path from "path";
import axios from "axios";

const rl = readline.createInterface({input: process.stdin, output: process.stdout});

function getJson(): Promise<string> {
    return new Promise(resolve => {
        rl.question("Insert path to file: ", (answer: string) => {
            resolve(answer);
            rl.close();
        });
    });
}

function readJson(jsonFilePath: string): Promise<string[]> {
    return new Promise(resolve => {
        let links: string[] = [];
        fs.readFile(jsonFilePath, 'utf-8', (err, res) => {
            if (err) {
                console.error(`Файл ${jsonFilePath} не знайдено`);
                process.exit(1);
            } else {
                links = JSON.parse(res);
            }
            resolve(links);
        });
    });
}


getJson()
    .then(answer => {
        readJson(answer)
            .then(links => {
                const jsonFileName = path.parse(answer).name;
                // Створюємо папку для збереження HTML-сторінок
                const pagesDirPath = `${jsonFileName}_pages`;
                if (!fs.existsSync(pagesDirPath)) {
                    fs.mkdir(pagesDirPath, () => {
                        for (const [index, link] of links.entries()) {
                            axios.get(link)
                                .then((res) => {
                                    const fileName = `${index + 1}.html`;
                                    const filePath = path.join(pagesDirPath, fileName);
                                    fs.writeFile(filePath, res.data, 'utf-8', () => {
                                        console.log(`Файл ${fileName} успішно збережено`);
                                    });
                                })
                                .catch((err) => {
                                    console.error(`Помилка при завантаженні ${link}: ${err.message}`);
                                });
                        }
                    });
                }
            });
    });