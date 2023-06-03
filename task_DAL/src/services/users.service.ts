import {usersRepository} from "../models/users.repository.js";
import {UsersDto} from "../models/users.dto.js";
import {UsersDtoResponse} from "../models/users.dto.response.js";

class UsersService {
    async createUser(dto: UsersDto): Promise<UsersDto> {
        return await usersRepository.createUser(dto);
    }

    async fetchAllUsers(): Promise<UsersDtoResponse[]> {
        return await usersRepository.fetchAllUsers();
    }

    async fetchUser(id: string): Promise<UsersDtoResponse> {
        return await usersRepository.fetchOneUser(id);
    }

    async updateUser(dto: UsersDto): Promise<UsersDto> {
        return await usersRepository.updateUser(dto);
    }

    async deleteUser(id: string): Promise<UsersDto[]> {
        return await usersRepository.deleteUser(id);
    }
}

export const usersService = new UsersService();