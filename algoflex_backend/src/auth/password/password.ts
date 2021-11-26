import * as bcrypt from 'bcrypt';

export async function encodePassword(password: string, salt: string): Promise<string> {
  return await bcrypt.hash(password, salt);
}

export async function createSalt(): Promise<string> {
  return await bcrypt.genSalt();
}
