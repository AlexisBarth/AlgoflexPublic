import "reflect-metadata";
import { createExpressServer } from 'routing-controllers';
import { UserController } from './controllers/user.controller';

const app = createExpressServer({
  controllers: [
    UserController
  ],
});

export default app;
