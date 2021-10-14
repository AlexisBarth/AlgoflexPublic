import { Service } from "typedi";
// import { UserRepository } from "../repositories/user.repository";
// import { OrmRepository } from "typeorm-typedi-extensions";
import { User } from "../models/user.model";

@Service()
export class AuthService {
  constructor(
    // private userRepository: UserRepository,
  ) { }

  // public find(): Promise<User | undefined> {
  //   // return this.userRepository.findOne(1);
  // }

  // public async create(user: User): Promise<User> {
  //   // this.log.info('Create a new user => ', user.toString());
  //   // user.id = uuid.v1();
  //   // const newUser = await this.userRepository.save(user);
  //   // this.eventDispatcher.dispatch(events.user.created, newUser);
  //   return newUser;
  // }
}
