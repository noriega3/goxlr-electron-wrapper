import { app, BrowserWindow } from "electron";
import * as path from "path";
import { initTray } from "./tray"
import { Constants } from "./constants";
import waitPort = require('wait-port')


export const initWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    }
  });

  //mainWindow.webContents.openDevTools();

  initTray(mainWindow)

  mainWindow.on("minimize", function (event: { preventDefault: () => void; }) {
    event.preventDefault();
    mainWindow.hide();
  });

  mainWindow.on("close", function (event) {
    event.preventDefault();
    mainWindow.hide();
  });

  mainWindow.on("show", function () {
    //appIcon.setHighlightMode('always')
  });

  waitPort({
    host: Constants.XLR_HOST,
    port: Constants.XLR_PORT,
    timeout: Constants.XLR_TIMEOUT,
  })
  .then(({ open, ipVersion }) => {
    if (open) {
      console.log(`The port is now open on IPv${ipVersion}!`);
      mainWindow.loadURL(Constants.XLR_URL);
    } else console.log("The port did not open before the timeout...");
  })
  .catch((err) => {
    console.error(
      `An unknown error occured while waiting for the port: ${err}`
    );
  });

};
