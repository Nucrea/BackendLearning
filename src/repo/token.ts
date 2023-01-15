import jwt from 'jsonwebtoken'

export class TokenRepo {
    public async createToken<T extends object>(payload: T): Promise<string> {
        return ''
    }

    public async verifyToken(token: string): Promise<boolean> {
        return false
    }

    public async getPayloadFromToken<T extends object>(token: string): Promise<T> {
        return {} as T
    }
}