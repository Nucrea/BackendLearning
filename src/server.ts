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
    private getEnvConfig() {
        const {
            POSTGRES_URL, 
            PASSWORD_HASH_SALT, 
            ACCESS_TOKEN_PRIVATE_KEY, 
            REFRESH_TOKEN_PRIVATE_KEY,
            ACCESS_TOKEN_EXPIRE,
            REFRESH_TOKEN_EXPIRE,
        } = process.env

        const vars = {
            POSTGRES_URL: process.env.POSTGRES_URL,
            PASSWORD_HASH_SALT: process.env.PASSWORD_HASH_SALT,
            ACCESS_TOKEN_PRIVATE_KEY: process.env.ACCESS_TOKEN_PRIVATE_KEY,
            REFRESH_TOKEN_PRIVATE_KEY: process.env.REFRESH_TOKEN_PRIVATE_KEY,
            ACCESS_TOKEN_EXPIRE: parseInt(process.env.ACCESS_TOKEN_EXPIRE!),
            REFRESH_TOKEN_EXPIRE: parseInt(process.env.REFRESH_TOKEN_EXPIRE!),
        }

        for (let key in Object.keys(vars)) {
            const varsAny = vars as any
            if (varsAny[key] === undefined) {
                throw Error(`key ${key} is missing in list if environment variables`)
            }
        }

        return vars
    }

    public async start() {
        const config = this.getEnvConfig()

        //prepare core
        const pgClient = new Client(config.POSTGRES_URL)
        await pgClient.connect()

        const cryptoRepo = new CryptoRepo(config.PASSWORD_HASH_SALT)
        const userRepo = new UserRepo(pgClient)
        const accessTokenRepo = new TokenRepo<TokenPayload>(config.ACCESS_TOKEN_PRIVATE_KEY, config.ACCESS_TOKEN_EXPIRE)
        const refreshTokenRepo = new TokenRepo<TokenPayload>(config.REFRESH_TOKEN_PRIVATE_KEY, config.REFRESH_TOKEN_EXPIRE)

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