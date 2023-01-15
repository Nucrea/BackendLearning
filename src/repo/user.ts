import { IUser } from "../model/user";
import { Client } from 'pg'

export class UserRepo {
    constructor(
        private pgClient: Client,
    ) {}

    public async createUser(user: IUser) {
        const query = `
        INSERT INTO users
            (email, passwordHash, name)
        VALUES 
            (${user.email}, ${user.passwordHash}, ${user.name});
        `

        await this.pgClient.query(query)
    }

    public async updateUser(user: IUser) {
        const query = `
        UPDATE users SET 
        email = ${user.name}. passwordHash = ${user.email}, name = ${user.name}
        WHERE id = ${user.id};
        `
        
        await this.pgClient.query(query)
    }

    public async deleteUser(id: string) {
        const query = `
        DELETE FROM users WHERE id = ${id};
        `

        await this.pgClient.query(query)
    }

    public async readUser(id: string) {
        const query = `
        SELECT * FROM users WHERE id = ${id};
        `

        const result = await this.pgClient.query(query)
        return result.rows[0] ?? null
    }
}