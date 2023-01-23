import bodyParser from 'body-parser'
import express, { Router } from 'express'
import requestID from 'express-request-id'
import { UserService } from './service/user'
import { UserRepo } from './repo/user'
import { Client } from 'pg'
import { CryptoRepo } from './repo/crypto'
import { AuthService } from './service/auth'
import { TokenRepo } from './repo/token'
import { TokenPayload } from './model/token'
import { AuthController } from './controller/auth'
import { UserController } from './controller/user'

export class Server {
    public async start() {
        //prepare core
        const pgClient = new Client('fdgf')
        await pgClient.connect()

        const cryptoRepo = new CryptoRepo('ff')
        const userRepo = new UserRepo(pgClient)
        const accessTokenRepo = new TokenRepo<TokenPayload>('dfd', 10 * 60)
        const refreshTokenRepo = new TokenRepo<TokenPayload>('dfd', 10 * 60)

        const userService = new UserService(userRepo, cryptoRepo)
        const authService = new AuthService(accessTokenRepo, refreshTokenRepo, userRepo, cryptoRepo)

        const authController = new AuthController(authService)
        const userController = new UserController(userService)

        //prepare server and routes
        const app = express()
        app.use(requestID())
        app.use(bodyParser.json())

        const authRouter = Router()
        app.use('/auth', authRouter)
        authRouter.post('/token', authController.getTokens.bind(authController))
        authRouter.post('/token/refresh', authController.refreshTokens.bind(authController))

        const userRouter = Router()
        app.use('/user', userRouter)
        userRouter.post('/create', userController.createUser.bind(userController))
        userRouter.post('/delete', userController.deleteUser.bind(userController))
    }
}