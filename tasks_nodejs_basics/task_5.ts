//npm run start:dev tasks_nodejs_basics/task_5.ts

import {EventEmitter} from 'events';

class MyEventEmitter extends EventEmitter {
    private readonly events: Map<string, () => void> = new Map();

    constructor() {
        super();
    }

    registerHandler(eventName: string, handler: () => void) {
        this.events.set(eventName, handler);
    }

    emitEvent(eventName: string) {
        const handler: (() => void) | undefined = this.events.get(eventName);
        if (handler) {
            handler();
        }
    }
}

const emitter = new MyEventEmitter();
emitter.registerHandler('userUpdated', () => console.log('Обліковий запис користувача оновлено'));
emitter.emitEvent('userUpdated'); // Обліковий запис користувача оновлено