import { IUser } from "../model/user";
import { Client } from 'pg'

export class UserRepo {
    constructor(
        private pgClient: Client,
    ) {}

    public async createUser(user: IUser): Promise<IUser | null> {
        const query = `
        INSERT INTO users
            (email, passwordHash, name)
        VALUES 
            (${user.email}, ${user.passwordHash}, ${user.name});
        `

        const result = await this.pgClient.query(query)
        return result.rows[0] as IUser ?? null
    }

    public async updateUser(user: IUser): Promise<IUser | null> {
        const query = `
        UPDATE users SET 
        email = ${user.name}. passwordHash = ${user.email}, name = ${user.name}
        WHERE id = ${user.id};
        `
        
        const result = await this.pgClient.query(query)
        return result.rows[0] as IUser ?? null
    }

    public async deleteUser(id: string): Promise<boolean> {
        const query = `
        DELETE FROM users WHERE id = ${id};
        `

        const result = await this.pgClient.query(query)
        return result.rows[0] as boolean
    }

    public async getUserById(id: string): Promise<IUser | null> {
        const query = `
        SELECT * FROM users WHERE id = ${id};
        `

        const result = await this.pgClient.query(query)
        return result.rows[0] as IUser ?? null
    }

    public async getUserByEmail(email: string): Promise<IUser | null> {
        const query = `
        SELECT * FROM users WHERE email = ${email};
        `

        const result = await this.pgClient.query(query)
        return result.rows[0] as IUser ?? null
    }
}