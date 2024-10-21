const http = require('http');
const { Server } = require('socket.io');

const robot = require('./robot')

const server = http.createServer();

const io = new Server(server);

io.on('connection', (socket) => {
    socket.on('touchpad', (data) => {
        if (data == 'up') {
            robot.scrollUp();
        } else if (data == 'down') {
            robot.scrollDown();
        }
    });

    socket.on('click', (data) => {
        if (data == 'left') {
            robot.leftClick();
        } else if (data == 'right') {
            robot.rightClick();
        }
    });

    socket.on('move', (data) => {
        const { x, y } = data;

        robot.moveMouse(x, y);
    });
});


server.listen(47856, () => {
    console.log('Servidor rodando na porta 47856');
});
