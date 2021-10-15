import "reflect-metadata";
import { Action, createExpressServer, useContainer } from 'routing-controllers';
import { UserController } from './controllers/user.controller';
import { createConnection } from "typeorm";
import { User } from "./models/user.model";
const ormConfig = require("../ormconfig.json");
import express from 'express';
import { AuthController } from "./controllers/auth.controller";
import { Container } from "typedi";
import path from 'path';

useContainer(Container);

createConnection(ormConfig).then(async connection => {
  console.log("Sucessfully connected to DB");
}).catch(error => console.log(error));

const app = createExpressServer({
  authorizationChecker: async (action: Action, roles: string[]) => {
    const token = action.request.headers['authorization'];
    console.log("token", token);
    console.log(action.request.headers);
    return true;
    // const user = await getEntityManager().findOneByToken(User, token);
    // if (user && !roles.length) return true;
    // if (user && roles.find(role => user.roles.indexOf(role) !== -1)) return true;
    // return false;
  },
  // controllers: [
  //   AuthController,
  //   UserController,
  // ],
  controllers: [path.join(__dirname, '/controllers/*.js')],
  middlewares: [path.join(__dirname, '/middlewares/*.ts')],
  interceptors: [path.join(__dirname, '/interceptors/*.ts')],
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

export default app;
