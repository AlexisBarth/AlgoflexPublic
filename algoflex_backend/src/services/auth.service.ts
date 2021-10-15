import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";
import { User } from "../models/user.model";

@Service()
export class AuthService {
  userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public async create(user: User): Promise<User | void> {
    return;
  }

  public async login(user: User): Promise<User | void> {
    return;
  }
}
