import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy,  } from 'passport-firebase-jwt';
import * as firebase from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import { User } from 'src/users/entity';
import { AuthService } from '../auth.service';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, 'firebase-auth') {

  private firebaseApp: any;
  private firebaseParams: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };

  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });

    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert(this.firebaseParams),
    });
  }

  async validate(token: string) {
    const firebaseUser: DecodedIdToken = await this.firebaseApp
      .auth()
      .verifyIdToken(token, true)
      .catch((err: any) => {
        console.log(err);
        throw new UnauthorizedException(err.message);
      });
    if (!firebaseUser) {
      throw new UnauthorizedException();
    }
    return this.verifyUser(firebaseUser);
  }

  async verifyUser(firebaseUser: DecodedIdToken): Promise<User> {
    try {
      return await this.authService.findById(firebaseUser.uid);
    } catch (err) {
      return await this.authService.register(firebaseUser);
    }
  }
}
