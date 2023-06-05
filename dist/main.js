"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var mainWindow_1 = require("./mainWindow");
var xlr = require('./xlr');
electron_1.app.whenReady().then(function () {
    xlr.start();
    (0, mainWindow_1.initWindow)();
    electron_1.app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            (0, mainWindow_1.initWindow)();
        }
    });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
/*app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});*/
//# sourceMappingURL=main.js.map