import { IUserCreateInput } from "../model/input/user";
import { IUser } from "../model/user";
import { CryptoRepo } from "../repo/crypto";
import { UserRepo } from "../repo/user";


export class UserService {
    constructor(
        private userRepo: UserRepo,
        private cryptoRepo: CryptoRepo,
    ){}

    public async createUser(userInput: IUserCreateInput) {
        const existingUser = await this.userRepo.getUserByEmail(userInput.email)
        if (existingUser) {
            return null
        }

        const passwordHash = await this.cryptoRepo.hashPassword(userInput.password)

        const user: IUser = {
            id: '',
            name: userInput.name,
            email: userInput.email,
            passwordHash: passwordHash,
        }

        await this.userRepo.createUser(user)
    }

    public async changeUserPassword(userId: string, newPassword: string) {
        const existingUser = await this.userRepo.getUserById(userId)
        if (!existingUser) {
            return null
        }

        const passwordHash = await this.cryptoRepo.hashPassword(newPassword)
        existingUser.passwordHash = passwordHash

        await this.userRepo.updateUser(existingUser)
    }

    public async changeUserEmail(userId: string, newEmail: string) {
        const existingUser = await this.userRepo.getUserById(userId)
        if (!existingUser) {
            return null
        }

        existingUser.email = newEmail

        await this.userRepo.updateUser(existingUser)
    }

    public async deleteUser(userId: string) {
        const existingUser = await this.userRepo.getUserById(userId)
        if (!existingUser) {
            return null
        }

        await this.userRepo.deleteUser(userId)
    }
}