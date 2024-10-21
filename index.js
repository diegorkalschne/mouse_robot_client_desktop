const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const path = require('path');
const os = require('os');
const ejse = require('ejs-electron');
require('./src/socket');

let tray = null;
let qrWindow = null;
let comboWindow = null;

const createTray = () => {
    tray = new Tray(path.join(__dirname, 'icon.png'));
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Conectar Aplicativo',
            click: () => {
                checkInterfaces();
            }
        },
        {
            label: 'Fechar',
            click: () => {
                app.quit();
            }
        }
    ]);
    tray.setToolTip('Mouse Robot');
    tray.setContextMenu(contextMenu);
}


const checkInterfaces = () => {
    let addresses = getLocalIPv4();

    if (addresses.length > 1) {
        createSelectInterfaceWindows(addresses);
    } else if (addresses.length == 1) {
        createQRWindow(addresses[0]);
    } else {
        createQRWindow(null);
    }
}

const createSelectInterfaceWindows = (addresses) => {
    if (qrWindow) {
        if (qrWindow.isMinimized()) {
            qrWindow.restore();
        }

        qrWindow.focus();
        return;
    }

    if (comboWindow) {
        if (comboWindow.isMinimized()) {
            comboWindow.restore();
        }

        comboWindow.focus();
        return;
    }

    comboWindow = new BrowserWindow({
        width: 350,
        height: 150,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        icon: path.join(__dirname, 'icon.png'),
        autoHideMenuBar: true,
        resizable: false,
        title: 'Selecionar Interface de Rede',
    });

    ejse.data('addresses', addresses);

    comboWindow.loadFile(path.join(__dirname, 'public', 'combo.ejs'));

    comboWindow.on('closed', () => {
        comboWindow = null;
    });

    // Aguarda o usuário a selecionar o endereço IPV4
    ipcMain.on('address', (_, selectedOption) => {
        comboWindow.close();

        createQRWindow(selectedOption);
    });
}

const createQRWindow = (address) => {
    if (qrWindow) {
        if (qrWindow.isMinimized()) {
            qrWindow.restore();
        }

        qrWindow.focus();
        return;
    }

    qrWindow = new BrowserWindow({
        width: 350,
        height: 450,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        icon: path.join(__dirname, 'icon.png'),
        autoHideMenuBar: true,
        resizable: false,
        title: 'Conectar Aplicativo',
    });

    let htmlFile = 'qr.ejs';

    if (!address) {
        htmlFile = 'error.ejs';
    }

    ejse.data('qrText', `http://${address}:47856`);

    qrWindow.loadFile(path.join(__dirname, 'public', htmlFile));

    qrWindow.on('closed', () => {
        qrWindow = null;
    });
}

const getLocalIPv4 = () => {
    const addresses = [];

    try {
        const networkInterfaces = os.networkInterfaces();
        for (const interfaceName in networkInterfaces) {
            const interfaces = networkInterfaces[interfaceName];
            for (const interfaceInfo of interfaces) {
                if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
                    addresses.push(interfaceInfo.address);
                }
            }
        }
    } catch (_) { }

    return addresses;
}

app.whenReady().then(() => {
    createTray();
});

app.on('window-all-closed', (e) => {
    e.preventDefault();
});
