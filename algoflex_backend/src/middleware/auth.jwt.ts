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

export function isAdmin(): boolean {
  // User.findByPk(req.userId).then(user => {
  //       user.getRoles().then(roles => {
  //           for (let i = 0; i < roles.length; i++) {
  //               if (roles[i].name === "admin") {
  //                   next();
  //                   return;
  //               }
  //           }

  //           res.status(403).send({
  //               message: "Require Admin Role!"
  //           });
  //           return;
  //       });
  //   });
  return true;
}
