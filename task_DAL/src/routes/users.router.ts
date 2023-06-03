import {Router} from "express";
import * as userController from '../controllers/users.controller.js';

const router = Router();

router.post('/', userController.postUser);

router.get('/', userController.getUsers);

router.get('/:id', userController.getUser);

router.put('/', userController.putUser);

router.delete('/:id', userController.deleteUser);

export const userRouter = router;