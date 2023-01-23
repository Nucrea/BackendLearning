import bcrypt from 'bcrypt'

export class CryptoRepo {
    constructor(
        private hashSalt: string,
    ){}

    public async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.hashSalt)
    }

    public async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash)
    }
}