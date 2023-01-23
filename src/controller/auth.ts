import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "../service/auth";

export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    public async getTokens(request: Request, response: Response) {
        const { email, password } = request.body

        const result = await this.authService.getTokens(email, password)
        if (result) {
            response.status(StatusCodes.OK).send(result)
        }

        response.sendStatus(StatusCodes.BAD_REQUEST)
    }

    public async refreshTokens(request: Request, response: Response) {
        const { refreshToken } = request.body

        const result = await this.authService.refreshTokens(refreshToken)
        if (result) {
            response.status(StatusCodes.OK).send(result)
        }

        response.sendStatus(StatusCodes.BAD_REQUEST)
    }
}