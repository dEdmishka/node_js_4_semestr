import {PostsDto} from "./posts.dto.js";
import {PostEntity} from "./entities/Post.js";
import {appDataSource} from '../services/database.services.js'
import {userRepository} from "./users.repository.js";

export const postRepository = appDataSource.getRepository(PostEntity);

class PostsRepository {
    async createPost(dto: PostsDto): Promise<PostsDto> {
        try {
            const user = await userRepository.findOne({where: {id: dto.user_id}});
            const post =  await postRepository.save({
                ...dto,
                user: user!
            });
            const res : PostsDto = JSON.parse(JSON.stringify(post));
            return res;
        } catch (e) {
            return Promise.reject(new Error('Post Already exists'));
        }
    }

    async fetchAllPosts(): Promise<PostsDto[]> {
        const posts = await postRepository.find({relations: ["user"]});
        const res : PostsDto[] = [...JSON.parse(JSON.stringify(posts))];
        return res;
    }
}

export const postsRepository = new PostsRepository();

