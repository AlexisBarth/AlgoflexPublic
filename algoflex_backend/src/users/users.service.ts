import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['roles'],
    });
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne(id, {
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  // async update(id: string, updateUserDto: UpdateUserDto) {
  //   const flavors =
  //     updateCoffeeDto.flavors &&
  //     (await Promise.all(
  //       updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
  //     ));

  //   const coffee = await this.coffeeRepository.preload({
  //     id: +id,
  //     ...updateCoffeeDto,
  //     flavors,
  //   });
  //   if (!coffee) {
  //     throw new NotFoundException(`Coffee #${id} not found`);
  //   }
  //   return this.coffeeRepository.save(coffee);
  // }

  async remove(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    return this.userRepository.remove(user);
  }
}
