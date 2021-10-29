import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";
import { User } from "../models/user.model";

@Service()
export class UserService {
  userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public find() {
    const users = this.userRepository.find();
    return users;
  }

  public findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }

  public async create(user: User): Promise<User> {
    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  public update(id: number, user: User): Promise<User> {
    user.id = id;
    return this.userRepository.save(user);
  }

  public async delete(id: number): Promise<void> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundError(`User with id '${id}' was not found`);
    }
    await this.userRepository.delete(id);
    return;
  }
}
