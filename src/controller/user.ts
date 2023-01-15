import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class UserController {
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