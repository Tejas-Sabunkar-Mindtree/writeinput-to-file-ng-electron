// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const args = process.argv.slice(1);
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let serve;

serve = args.some(function(val) {
  return val === '--serve';
});

console.log(path.join(__dirname, '/../', 'node_modules/electron'));
console.log(`${__dirname}../node_modules/electron`);
require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/../node_modules/electron`)
});

// console.log(duplicatedevices); // Array of object, Each object is a device connected, We can identify a device
// by productId and vendorId

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    webPreferences: {
      nodeIntegration: true // without that we cannot use node_modules
    }
  });

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  console.log(serve);

  mainWindow.loadURL('http://localhost:4200');

  /*  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(path.join(__dirname, '/../', 'node_modules/electron'))
    });
    mainWindow.loadURL('http://localhost:4200');
  } else { */
  mainWindow.loadURL(
    url.format({
      pathname: path.join(
        __dirname,
        '/../',
        'dist/writeinput-to-file/',
        'index.html'
      ),
      protocol: 'file',
      slashes: true
    })
  );
  // }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
