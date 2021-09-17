import "reflect-metadata";
import { createExpressServer } from 'routing-controllers';
import { UserController } from './controllers/user.controller';
import { createConnection } from "typeorm";
import { User } from "./entity/user.entity";
const ormConfig = require('../ormconfig.json');
import express from 'express';

createConnection(ormConfig).then(async connection => {
  console.log("Sucessfully connected to DB");

  console.log("Inserting a new user into the database...");
  const user = new User();
  user.firstName = "Timber";
  user.lastName = "Saw";
  user.age = 25;
  await connection.manager.save(user);
  console.log("Saved a new user with id: " + user.id);

  console.log("Loading users from the database...");
  const users = await connection.manager.find(User);
  console.log("Loaded users: ", users);

  console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));

const app = createExpressServer({
  controllers: [
    UserController
  ],
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use((req: any, res: any, next: any) => {
//   res.header("Access-Control-Allow-Origin", "*"),
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
//   next()
// });

export default app;
