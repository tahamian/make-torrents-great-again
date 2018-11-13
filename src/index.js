const electron          = require('electron');
const app               = electron.app;
const BrowserWindow     = electron.BrowserWindow;

app.on('ready', () => {
  var height = 600,
      width  = 600,
      title  = 'eTorrent';

  let mainWindow = new BrowserWindow({
    title: title
  })
  .loadURL(`file://${__dirname}/pages/index.html`);
});