import {Router} from "express";
import * as userController from '../controllers/users.controller';

const router = Router();

router.post('/', userController.postUser);

router.get('/', userController.getUsers);

router.get('/:id', userController.getUser);

router.put('/:id', userController.putUser);

router.delete('/:id', userController.deleteUser);

export const userRouter = router;