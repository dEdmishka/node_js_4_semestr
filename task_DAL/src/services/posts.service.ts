import {postsRepository} from "../models/posts.repository.js";
import {PostsDto} from "../models/posts.dto.js";

class PostsService {
    async createPost(dto: PostsDto): Promise<PostsDto> {
        return await postsRepository.createPost(dto);
    }

    async fetchAllPosts(): Promise<PostsDto[]> {
        return await postsRepository.fetchAllPosts();
    }
}

export const postsService = new PostsService();