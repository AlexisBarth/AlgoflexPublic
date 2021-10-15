import "reflect-metadata";
import { Action, createExpressServer, useContainer } from 'routing-controllers';
import { createConnection } from "typeorm";
import express from 'express';
import { Container } from "typedi";
import path from 'path';

const ormConfig = require("../ormconfig.json");

useContainer(Container);

createConnection(ormConfig).then(async connection => {
  console.log("Sucessfully connected to DB");
}).catch(error => console.log(error));

const app = createExpressServer({
  authorizationChecker: async (action: Action, roles: string[]) => {
    // :TODO: Add authorization 
    // const token = action.request.headers['authorization'];
    return true;
  },
  controllers: [path.join(__dirname, '/controllers/*.js')],
  middlewares: [path.join(__dirname, '/middlewares/*.ts')],
  interceptors: [path.join(__dirname, '/interceptors/*.ts')],
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

export default app;
