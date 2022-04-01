const { app, BrowserWindow, ipcMain } = require("electron")

let mainWindow = null

function boot() {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    mainWindow.loadURL(`file://${__dirname}/index.html`)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', boot)

// Register an event listener. When ipcRenderer sends a request to minimize the window; minimize the window if possible.
ipcMain.on(`minimize-window`, function(e, args) {
    if (mainWindow) {
        if (mainWindow.minimizable) {
            // browserWindow.isMinimizable() for old electron versions
            mainWindow.minimize();
        }
    }
});

// Register an event listener. When ipcRenderer sends a request to close the window; close the window if possible.
ipcMain.on(`close-window`, function(e, args) {
    if (mainWindow) {
        mainWindow.close();
    }
})


// Register an event listener. When ipcRenderer sends a request to max-unmax the window; check if it is maximized and unmaximize it. Otherwise maximize it
ipcMain.on(`max-unmax-window`, function(e, args) {
    if (mainWindow) {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    }
});