import {UsersDto} from "./users.dto.js";
import {UsersDtoResponse} from "./users.dto.response.js";
import {UserEntity} from "./entities/User.js";
import {appDataSource} from '../services/database.services.js';

export const userRepository = appDataSource.getRepository(UserEntity);

class UsersRepository {
    async createUser(dto: UsersDto): Promise<UsersDto> {
        try {
            const user = await userRepository.save({...dto});
            const res : UsersDto = JSON.parse(JSON.stringify(user));
            return res;
        } catch (e) {
            return Promise.reject(new Error('User Already exists'));
        }
    }

    async fetchAllUsers(): Promise<UsersDtoResponse[]> {
        const users = await userRepository.find({relations: ["posts"]});
        const res : UsersDtoResponse[] = [...JSON.parse(JSON.stringify(users))];
        return res;
    }

    async fetchOneUser(id: string): Promise<UsersDtoResponse> {
        const user = await userRepository.findOne({where: {id: id}, relations: ["posts"]});
        const res : UsersDtoResponse = JSON.parse(JSON.stringify(user));
        return res;
    }

    async updateUser(dto: UsersDto): Promise<UsersDto> {
        const user = await userRepository.save({...dto});
        const res : UsersDto = JSON.parse(JSON.stringify(user));
        return res;
    }

    async deleteUser(id: string): Promise<UsersDto[]> {
        const user = await userRepository.find({where: {id: id}});
        const deleted = await userRepository.remove(user);
        const res : UsersDto[] = [...JSON.parse(JSON.stringify(deleted))];
        return res;
    }
}

export const usersRepository = new UsersRepository();

