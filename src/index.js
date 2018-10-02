const electron          = require('electron');
const app               = electron.app;
const BrowserWindow     = electron.BrowserWindow;

let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 600,
        title: 'eTorrent',
    })
    .loadURL('html/index.html');
});