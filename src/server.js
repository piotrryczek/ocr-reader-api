import http from 'http';
import io from 'socket.io';

import ioServerService from 'services/ioServer';
import app from './app';

const server = http.createServer(app.callback());

const ioServer = io(server);

ioServerService.setServer(ioServer);
ioServerService.init();

server.listen(8000);
