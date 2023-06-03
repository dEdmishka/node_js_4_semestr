//npm run start:dev tasks_nodejs_basics/task_3.ts
//D:\test\list.json

import * as fs from 'node:fs/promises';
import * as readline from 'readline';
import * as path from "node:path";
import undici from "undici";

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
    return new Promise(async resolve => {
        let links: string[];
        const data = await fs.readFile(jsonFilePath, 'utf-8');
        links = JSON.parse(data);
        resolve(links);
    });
}


getJson()
    .then(answer => {
        readJson(answer)
            .then(async links => {
                const jsonFileName = path.parse(answer).name;
                console.log(jsonFileName)
                // Створюємо папку для збереження HTML-сторінок
                const pagesDirPath = `${jsonFileName}_pages`;
                console.log(pagesDirPath);
                try {
                    await fs.readlink(pagesDirPath)
                } catch {
                    fs.mkdir(pagesDirPath).then(() => {
                        for (const [index, link] of links.entries()) {
                            undici.request(link)
                                .then(async (res) => {
                                    const fileName = `${index + 1}.html`;
                                    const filePath = path.join(pagesDirPath, fileName);
                                    fs.writeFile(filePath, await res.body, 'utf-8').then(() => {
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