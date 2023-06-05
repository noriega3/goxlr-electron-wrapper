import { app, BrowserWindow } from "electron";
import * as path from "path";
import { initTray } from "./tray"


export const initWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    }
  });

  //mainWindow.loadURL(Constants.XLR_URL);
  mainWindow.webContents.openDevTools();

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

};
