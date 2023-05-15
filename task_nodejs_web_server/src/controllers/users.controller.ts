import {userService} from "../services/users.service";
import {Request, Response} from "express";

export const postUser = (req: Request, res: Response) => {
    const id: string = req.body.id;
    const username: string = req.body.username;
    const name: string = req.body.name;
    const user = userService.createUser(id, username, name);
    res.status(201).send(user);
};

export const getUsers = (req: Request, res: Response) => {
    const users = userService.fetchUsers();
    res.status(200).send(users);
};

export const getUser = (req: Request, res: Response) => {
    const id: string = req.params.id;
    const user = userService.fetchUser(id);
    res.status(200).send(user);
};

export const putUser = (req: Request, res: Response) => {
    const id: string = req.params.id;
    const username: string = req.body.username;
    const name: string = req.body.name;
    const user = userService.updateUser(id, username, name);
    res.status(200).send(user);
};

export const deleteUser = (req: Request, res: Response) => {
    const id: string = req.params.id;
    const user = userService.deleteUser(id);
    res.status(200).send(user);
};