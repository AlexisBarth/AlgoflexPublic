import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto';
import { Role, User } from 'src/users/entity';
import { createSalt, encodePassword } from './password';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService
  ) {}

  public async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.findByEmail(email);
    if (!user) {
      return null;
    }
    const providedPassword = await encodePassword(pass, user.salt);
    if (user.password === providedPassword) {
      const { password, salt, ...result } = user;
      console.log('result', result);
      return result;
    }
    return null;
  }

  public async login(user: User) {
    const payload = {
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles,
    };
    console.log('user', user);
    console.log('payload', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async register(registerDto: RegisterDto): Promise<User> {
    const userExist = await this.findByEmail(registerDto.email);
    if (userExist) {
      throw new ConflictException(`Email ${registerDto.email} is already used`);
    }

    const roles = await Promise.all(registerDto.roles.map((name) => this.preloadRoleByName(name)));
    const salt = await createSalt();
    const password = await encodePassword(registerDto.password, salt);
    const user = {
      ...registerDto,
      password,
      salt,
      roles,
    };
    return this.userRepository.save(user);
  }

  public async findById(id: string): Promise<User> {
    return await this.userRepository.findOne(id, {
      relations: ['roles'],
    });
  }

  private async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne(
      { email },
      {
        relations: ['roles'],
      }
    );
  }

  private async preloadRoleByName(name: string): Promise<Role> {
    const existingRole = await this.roleRepository.findOne({ name });
    if (existingRole) {
      return existingRole;
    }
    return this.roleRepository.create({ name });
  }
}
