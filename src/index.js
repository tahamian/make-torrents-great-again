const electron          = require('electron');
const app               = electron.app;
const BrowserWindow     = electron.BrowserWindow;
const windowStateKeeper = require('electron-window-state');
const config            = {} //require('config/config.js');
const translate         = {} //require('i8n/translate.js');

mainWindowReady = () => {
}

app.on('ready', () => {
  var height = 600, //config.getStatic('height') || 600,
      width  = 600, //config.getStatic('width')  || 600,
      title  = 'eTorrent'; //translate(config.getStatic('title'))  || 'eTorrent';

  var restoreWindowSize = true; //config.getStatic('restoreWindowSize');

  let mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 1000
  });

  let mainWindow = new BrowserWindow({
    height: restoreWindowSize ? 1000 : mainWindowState.height,
    width:  restoreWindowSize ? 1000 : mainWindowState.width,
    x: mainWindowState.x,
    y: mainWindowState.y,
    title: title
  })
    .on('ready', mainWindowReady)
    .loadURL(`file://${__dirname}/pages/index.html`);
});