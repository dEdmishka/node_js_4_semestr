//npm run start:dev tasks_nodejs_basics/task_4.ts 10

import os from 'os';
import si from 'systeminformation';
const args = process.argv.slice(2);
const frequency = parseInt(args[0]);

if (isNaN(frequency)) {
    console.error('Frequency argument is missing or invalid');
    process.exit(1);
} else {
    console.log('Frequency is ' + frequency + ' s');
}

function getOsInfo(): Promise<string> {
    return new Promise(async () => {
        console.log(`Operating System: ${os.type()} ${os.release()} ${os.platform()}`);
        console.log(`Architecture: ${os.arch()}`);
        console.log(`Current User Name: ${os.userInfo().username}`);
        console.log(`CPU Cores Models: ${os.cpus().map((core) => core.model)}`);
        await si.cpuTemperature((tempData) => {
            console.log(`CPU Temperature: ${tempData.main}°C`);
        });
        await si.graphics((graphicsData) => {
            console.log(`Graphic Controllers: ${graphicsData.controllers.map((controller) => `${controller.vendor} ${controller.model}`)}`);
        });
        console.log(`Total Memory: ${convertBytesToGB(os.totalmem())} GB`);
        console.log(`Used Memory: ${convertBytesToGB(os.totalmem() - os.freemem())} GB`);
        console.log(`Free Memory: ${convertBytesToGB(os.freemem())} GB`);
        await si.battery((batteryData) => {
            console.log(`Battery Charging: ${batteryData.isCharging}`);
            console.log(`Battery Percent: ${batteryData.percent}%`);
            console.log(`Battery Remaining Time: ${batteryData.timeRemaining} seconds`);
        });
    });
}

setInterval(async () => {
    await getOsInfo();
}, frequency * 1000);

function convertBytesToGB(bytes: number): number {
    return bytes / 1024 / 1024 / 1024;
}


