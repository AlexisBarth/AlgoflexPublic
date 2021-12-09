import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { User } from 'src/users/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Role } from 'src/common';

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyA29TC3w3ppTdQNmvRigb_L8rZb8bFOseY",
  authDomain: "algoflex-dce55.firebaseapp.com",
  projectId: "algoflex-dce55",
  storageBucket: "algoflex-dce55.appspot.com",
  messagingSenderId: "625231792435",
  appId: "1:625231792435:web:f5aab51deafd46c8e09646"
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    initializeApp(FIREBASE_CONFIG);
  }

  public async login(loginDto: LoginDto) {
    const auth = getAuth();
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, loginDto.email, loginDto.password);
      const token = await userCredentials.user.getIdToken();
      return { token };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Email or password is invalid');
    }
  }

  public async register(decodedIdToken: DecodedIdToken): Promise<User> {
    const { email, uid, auth_time } = decodedIdToken;
    const userExist = await this.findByEmail(email);
    if (userExist) {
      throw new ConflictException(`Email ${email} is already used`);
    }

    const user = {
      uid,
      email,
      lastLogin: auth_time,
      role: Role.User,
    };
    return this.userRepository.save(user);
  }

  async findById(id: string) {
    return this.userRepository.findOne(id);
  }

  private async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }
}
