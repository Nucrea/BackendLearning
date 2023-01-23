import { TokenPayload } from "../model/token";
import { CryptoRepo } from "../repo/crypto";
import { TokenRepo } from "../repo/token";
import { UserRepo } from "../repo/user";



export class AuthService {
    constructor(
        private accesTokenRepo: TokenRepo<TokenPayload>,
        private refreshTokenRepo: TokenRepo<TokenPayload>,
        private userRepo: UserRepo,
        private cryptoRepo: CryptoRepo,
    ){}

    public async getTokens(email: string, password: string) {
        const user = await this.userRepo.getUserByEmail(email)
        if (!user) {
            return null
        }

        const checkResult = await this.cryptoRepo.comparePassword(password, user.passwordHash)
        if (!checkResult) {
            return null
        }

        const payload: TokenPayload = {
            userId: user.id,
            userEmail: user.email,
            userName: user.name,
        }

        const accessToken = await this.accesTokenRepo.createToken(payload)
        const refreshToken = await this.refreshTokenRepo.createToken(payload)

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        }
    }

    public async refreshTokens(refreshToken: string) {
        const payload = await this.refreshTokenRepo.verifyToken(refreshToken)
        if (!payload) {
            return null
        }

        const accessToken = await this.accesTokenRepo.createToken(payload)
        const newRefreshToken = await this.refreshTokenRepo.createToken(payload)

        return {
            accessToken: accessToken,
            refreshToken: newRefreshToken,
        }
    }
}