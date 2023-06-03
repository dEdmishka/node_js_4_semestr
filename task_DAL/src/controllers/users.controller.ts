import {usersService} from "../services/users.service.js";
import {NextFunction, Request, Response} from "express";
import {filter} from "../middlewares/filter.js";

export const postUser = async (req: Request, res: Response, next: NextFunction) => {
    usersService.createUser(req.body).then(user => {
        res.status(201).send(user);
    }).catch(err => {
        next(err);
    });
};
export const getUsers = async (req: Request, res: Response) => {
    const query: { title: string, city: string, age: string, page: string, skip: string } = JSON.parse(JSON.stringify(req.query));
    const users = await usersService.fetchAllUsers();
    res.status(200).send(filter(users, query));
};

export const getUser = async (req: Request, res: Response) => {
    const userId = <string>req.params['id'];
    const user = await usersService.fetchUser(userId);
    res.status(200).send(user);
};
export const putUser = async (req: Request, res: Response) => {
    const user = await usersService.updateUser(req.body);
    res.status(200).send(user);
};
export const deleteUser = async (req: Request, res: Response) => {
    const userId = <string>req.params['id'];
    const deletedUser = await usersService.deleteUser(userId);
    res.status(200).send(deletedUser);
};