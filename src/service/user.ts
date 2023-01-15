import { UserRepo } from "../repo/user";



export class UserService {
    constructor(
        private userRepo: UserRepo,
    ){}

    public async createUser() {}
}