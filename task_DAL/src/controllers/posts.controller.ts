import {postsService} from "../services/posts.service.js";
import {NextFunction, Request, Response} from "express";

export const postPost = (req: Request, res: Response, next: NextFunction) => {
    postsService.createPost(req.body).then(post => {
        res.status(201).send(post);
    }).catch(err => {
        next(err);
    })
};

export const getPosts = (req: Request, res: Response, next: NextFunction) => {
    postsService.fetchAllPosts().then(posts => {
        res.status(201).send(posts);
    }).catch(err => {
        next(err);
    })
};