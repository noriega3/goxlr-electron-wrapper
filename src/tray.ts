import { app, Tray, Menu, BrowserWindow } from "electron";
import { Constants } from "./constants";
import * as path from "path";
const xlr = require('./xlr');

const ICON_PATH = path.join(__dirname, "../logoTemplate.png");


export const initTray = (win: BrowserWindow) : Boolean => {
    const appTray = new Tray(ICON_PATH);

    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Show App",
        click: function () {
          win.show();
        },
      },
      {
        label: "Refresh Settings Page",
        click: function () {
          win.loadURL(Constants.XLR_URL);
        },
      },
      {
        label: "Relaunch GoXLR Utility",
        click: function () {
            xlr.stop()
          setTimeout(function(){
            xlr.start()
          }, 10000)
        },
      },
      {
        label: "Quit",
        click: function () {
            xlr.stop()
          win.destroy();
          app.quit();
        },
      },
    ]);

    appTray.setContextMenu(contextMenu);
    return true
};
