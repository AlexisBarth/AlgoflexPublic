import errorHandler from 'errorhandler';
import { ScopeAwareRuleWalker } from 'tslint';
import { EmitFlags } from 'typescript';
import app from './app';
import { BuildController } from './controllers/build_controller';

const config = require('config').get(process.env.NODE_ENV || 'development');

if (process.env.NODE_ENV === "development") {
    app.use(errorHandler());
}

const http = require('http').Server(app);

const server = http.listen(config.port, () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        config.port,
        config.mode
    );
    console.log("  Press CTRL-C to stop\n");
});

export default server