import {User} from "./user";

const users: User[] = [];

class UsersRepository {
    create(id: string, username: string, name?: string): User {
        const user: User = {
            id: id,
            username: username,
            name: name
        };
        users.push(user);

        return user;
    }

    fetchAll(): User[] {
        return users;
    }

    fetchOne(id: string): User {
        return users.filter(user => user.id.toString() === id)[0];
    }

    update(id: string, username: string, name?: string): User {
        const user = users.filter(user => user.id.toString() === id)[0];
        user.name = name;
        user.username = username;
        return user;
    }

    delete(id: string): User {
        return users.splice(users.map(x => x.id).indexOf(id), 1)[0];
    }
}

export const usersRepository = new UsersRepository();