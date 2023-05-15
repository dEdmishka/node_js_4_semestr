import {User} from "../models/user";
import {usersRepository} from "../models/users.repository";

class UsersService {
    createUser(id: string, username: string, name?: string): User {
        return usersRepository.create(id, username, name);
    };

    fetchUsers(): User[] {
        return usersRepository.fetchAll();
    };

    fetchUser(id: string): User {
        return usersRepository.fetchOne(id);
    };

    updateUser(id: string, username: string, name?: string): User {
        return usersRepository.update(id, username, name);
    };

    deleteUser(id: string): User {
        return usersRepository.delete(id);
    };
}

export const userService = new UsersService();