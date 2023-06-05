import { app, Tray, Menu, BrowserWindow } from "electron";
import { Constants } from "./constants";
import picture from '../assets/item.png'
const xlr = require('./xlr');


export const initTray = (win: BrowserWindow) : Boolean => {
    const appTray = new Tray(picture);

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
