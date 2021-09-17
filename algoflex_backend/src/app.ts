import "reflect-metadata";
import { createExpressServer } from 'routing-controllers';
import { UserController } from './controllers/user.controller';
import { createConnection } from "typeorm";
import { User } from "./entity/User";
const ormConfig = require('../ormconfig.json');

const app = createExpressServer({
  controllers: [
    UserController
  ],
});

createConnection(ormConfig).then(connection => {
  console.log("Sucessfully connected to DB");
}).catch(error => console.log(error));

export default app;
