import {Router} from "express";
import * as postController from '../controllers/posts.controller.js';

const router = Router();

router.post('/', postController.postPost);

router.get('/', postController.getPosts);

export const postRouter = router;