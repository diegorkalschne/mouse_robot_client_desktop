const robot = require('robotjs');

const rightClick = () => {
    robot.mouseClick('right');
}

const leftClick = () => {
    robot.mouseClick('left');
}

const scrollUp = () => {
    robot.keyTap('pageup');
}

const scrollDown = () => {
    robot.keyTap('pagedown');
}

const moveMouse = (posX, posY) => {
    robot.setMouseDelay(0);

    const { x, y } = robot.getMousePos();

    const newX = x + posX;
    const newY = y + posY;

    robot.moveMouse(newX, newY);
}

module.exports = { rightClick, leftClick, scrollUp, scrollDown, moveMouse }
