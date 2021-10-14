import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../models/user.model";

@Service()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  usRepository = getRepository(User);

  public find() {
    console.log('Find all users', this.userRepository);
    // const users = this.usRepository.find();
    // const users = this.userRepository.find();
    return 'users';
  }

  // public findOne(id: string): Promise<User | undefined> {
  //   console.log('Find one user');
  //   return this.userRepository.findOne(id);
  // }

  // public async create(user: User): Promise<User> {
  //   console.log('Create a new user => ', user.toString());
  //   user.id = 1;
  //   const newUser = await this.userRepository.save(user);
  //   return newUser;
  // }

  // public update(id: string, user: User): Promise<User> {
  //   console.log('Update a user');
  //   user.id = +id;
  //   return this.userRepository.save(user);
  // }

  // public async delete(id: string): Promise<void> {
  //   console.log('Delete a user');
  //   await this.userRepository.delete(id);
  //   return;
  // }
}
