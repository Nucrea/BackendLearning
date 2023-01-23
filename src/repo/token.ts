import jwt from 'jsonwebtoken'

export class TokenRepo<T extends object> {
    constructor(
        private privateKey: string,
        private expiresInSec: number,
    ) {}

    public async createToken(payload: T): Promise<string> {
        return jwt.sign(payload, this.privateKey, { expiresIn: this.expiresInSec })
    }

    public async verifyToken(token: string): Promise<T | null> {
        return jwt.verify(token, this.privateKey, { complete: true }) as T
    }

    // public async getPayloadFromToken<T extends object>(token: string): Promise<T> {
    //     return {} as T
    // }
}