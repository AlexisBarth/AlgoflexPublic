import jwt from "jsonwebtoken";

export function verifyToken(req: any): boolean {
  const token: string = req.headers["authorization"];

  if (!token) {
    return false;
  }

  jwt.verify(token, 'config.secret', (err: any, decoded: any) => {
    if (err) {
      return false;
    }
    req.userId = decoded.id;
  });
  return true;
}

export function isAdmin(): boolean { return true }
