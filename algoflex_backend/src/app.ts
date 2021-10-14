import "reflect-metadata";
import { Action, createExpressServer, useContainer } from 'routing-controllers';
import { UserController } from './controllers/user.controller';
import { createConnection } from "typeorm";
import { User } from "./models/user.model";
const ormConfig = require("../ormconfig.json");
import express from 'express';
import { AuthController } from "./controllers/auth.controller";
import { Container } from "typedi";
// import "./services";
import path from 'path';

useContainer(Container);

let app;

createConnection(ormConfig).then(async connection => {
  console.log("Sucessfully connected to DB");

  console.log("Inserting a new user into the database...");
  const user = new User();
  user.firstName = "Timber";
  user.lastName = "Saw";
  user.age = 25;
  await connection.manager.save(user);
  // console.log("Saved a new user with id: " + user.id);

  // console.log("Loading users from the database...");
  const users = await connection.manager.find(User);
  console.log("Loaded users: ", users);
  // console.log("Here you can setup and run express/koa/any other framework.");
// app.use((req: any, res: any, next: any) => {
//   res.header("Access-Control-Allow-Origin", "*"),
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
//   next()
// });

  app = createExpressServer({
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
  controllers: [
    AuthController,
    UserController,
  ],
  // controllers: [path.join(__dirname, '/controllers/*.ts')],
  middlewares: [path.join(__dirname, '/middlewares/*.ts')],
  interceptors: [path.join(__dirname, '/interceptors/*.ts')],
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

}).catch(error => console.log(error));

export default app;
  // console.log(__dirname);

