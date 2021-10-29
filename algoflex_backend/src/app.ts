import "reflect-metadata";
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { 
  Action, 
  createExpressServer, 
  useContainer,
  getMetadataArgsStorage,
} from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUiExpress from 'swagger-ui-express';
import { createConnection } from "typeorm";
import express from 'express';
import { Express } from 'express'
import { Container } from "typedi";
import path from 'path';

const ormConfig = require("../ormconfig.json");
const { defaultMetadataStorage } = require('class-transformer/cjs/storage')

useContainer(Container);

createConnection(ormConfig).then(async connection => {
  console.log("Sucessfully connected to DB");
}).catch(error => console.log(error));

const routingControllersOptions = {
  authorizationChecker: async (action: Action, roles: string[]) => {
    // :TODO: Add authorization 
    // const token = action.request.headers['authorization'];
    return true;
  },
  controllers: [path.join(__dirname, '/controllers/*.js')],
  middlewares: [path.join(__dirname, '/middlewares/*.ts')],
  interceptors: [path.join(__dirname, '/interceptors/*.ts')],
}

const app: Express = createExpressServer(routingControllersOptions);

// Parse class-validator classes into JSON Schema:
const schemas = validationMetadatasToSchemas({
  classTransformerMetadataStorage: defaultMetadataStorage,
  refPointerPrefix: '#/components/schemas/',
});

// Parse routing-controllers classes into OpenAPI spec:
const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(storage, routingControllersOptions, {
  components: {
    schemas,
    securitySchemes: {
      basicAuth: {
        scheme: 'basic',
        type: 'http',
      },
    },
  },
  info: {
    description: 'Algoflex API core services and authentication',
    title: 'Algoflex API service',
    version: '0.0.1',
  },
});

app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

export default app;
