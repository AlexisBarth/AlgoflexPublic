import errorHandler from 'errorhandler';
import app from './app';
import { Server } from 'socket.io';
import { BuildListener } from './listeners/build_listener';

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

export const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
});

io.on('connection', (socket) => {
    const buildController = new BuildListener(socket);
    socket.on('build', (data) => {
        buildController.execute(data);
    });
});

export default server