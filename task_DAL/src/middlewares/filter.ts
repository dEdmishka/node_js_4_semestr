import {UsersDto} from "../models/users.dto.js";
import {UsersDtoResponse} from "../models/users.dto.response.js";

export function filter(
    users: UsersDtoResponse[],
    query: { title: string, city: string, age: string; page: string; skip: string }
): UsersDto[] | null {
    if (query.age && query.page && query.skip) {
        return users.filter(user => String(user.age) === query.age).slice(parseInt(query.skip), parseInt(query.page));
    }
    if (query.city && query.page && query.skip) {
        return users.filter(user => String(user.address.city) === query.city).slice(parseInt(query.skip), parseInt(query.page));
    }
    if (query.title && query.page && query.skip) {
        let result: UsersDtoResponse[] = [];

        users.forEach(user => {
            if (user.posts.length !== 0) {
                result.push({
                    ...user, posts: user.posts.filter(post =>
                        String(post.title) === query.title.replace('%20', ' ')
                    )
                });
            }
        });

        return result.slice(parseInt(query.skip), parseInt(query.page));
    }
    return users;
}
