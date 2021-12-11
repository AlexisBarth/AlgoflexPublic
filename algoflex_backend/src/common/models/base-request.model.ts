import { Request } from 'express';

export interface BaseRequest extends Request {
  user?: RequestUser;
}
export interface RequestUser {
  uid: string;
  email: string;
  favoriteLangage?: string;
  lastLogin: number;
  createdAt?: number;
  role: string;
}
