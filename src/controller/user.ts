import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserService } from "../service/user";

export class UserController {
    constructor(
        private userService: UserService,
    ){}

    public async createUser(request: Request, response: Response) {
        response.sendStatus(StatusCodes.NOT_IMPLEMENTED)
    }

    public async updateUser(request: Request, response: Response) {
        response.sendStatus(StatusCodes.NOT_IMPLEMENTED)
    }

    public async deleteUser(request: Request, response: Response) {
        response.sendStatus(StatusCodes.NOT_IMPLEMENTED)
    }

    public async getUser(request: Request, response: Response) {
        response.sendStatus(StatusCodes.NOT_IMPLEMENTED)
    }
}