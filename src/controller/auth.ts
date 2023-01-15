import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class AuthController {
    public async login(request: Request, response: Response) {
        response.sendStatus(StatusCodes.NOT_IMPLEMENTED)
    }
}