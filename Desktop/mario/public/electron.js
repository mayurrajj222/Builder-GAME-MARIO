const {
  app,
  BrowserWindow,
  Menu,
  dialog,
  shell,
  ipcMain,
} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

// Enable live reload for Electron in development
if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "..", "node_modules", ".bin", "electron"),
    hardResetMethod: "exit",
  });
}

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: false,
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, "icon.png"), // Add game icon
    titleBarStyle: "default",
    show: false, // Don't show until ready
    backgroundColor: "#1e3a8a", // Game theme color
    autoHideMenuBar: true, // Hide menu bar for game-like experience
  });

  // Load the app
  const startUrl = isDev
    ? "http://localhost:5173"
    : `file://${path.join(__dirname, "../dist/index.html")}`;

  mainWindow.loadURL(startUrl);

  // Show window when ready to prevent visual flash
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    if (isDev) {
      // Open DevTools in development
      mainWindow.webContents.openDevTools();
    }
  });

  // Handle window closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  // Set application menu
  setApplicationMenu();
}

function setApplicationMenu() {
  const template = [
    {
      label: "Game",
      submenu: [
        {
          label: "New Game",
          accelerator: "CmdOrCtrl+N",
          click: () => {
            mainWindow.webContents.send("game-action", "new-game");
          },
        },
        {
          label: "Pause/Resume",
          accelerator: "Space",
          click: () => {
            mainWindow.webContents.send("game-action", "toggle-pause");
          },
        },
        { type: "separator" },
        {
          label: "Quit",
          accelerator: process.platform === "darwin" ? "Cmd+Q" : "Ctrl+Q",
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: "View",
      submenu: [
        {
          label: "Toggle Fullscreen",
          accelerator: process.platform === "darwin" ? "Ctrl+Cmd+F" : "F11",
          click: () => {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
          },
        },
        {
          label: "Zoom In",
          accelerator: "CmdOrCtrl+Plus",
          click: () => {
            const currentZoom = mainWindow.webContents.getZoomFactor();
            mainWindow.webContents.setZoomFactor(
              Math.min(currentZoom + 0.2, 3),
            );
          },
        },
        {
          label: "Zoom Out",
          accelerator: "CmdOrCtrl+-",
          click: () => {
            const currentZoom = mainWindow.webContents.getZoomFactor();
            mainWindow.webContents.setZoomFactor(
              Math.max(currentZoom - 0.2, 0.5),
            );
          },
        },
        {
          label: "Reset Zoom",
          accelerator: "CmdOrCtrl+0",
          click: () => {
            mainWindow.webContents.setZoomFactor(1);
          },
        },
        { type: "separator" },
        {
          label: "Developer Tools",
          accelerator:
            process.platform === "darwin" ? "Alt+Cmd+I" : "Ctrl+Shift+I",
          click: () => {
            mainWindow.webContents.toggleDevTools();
          },
        },
      ],
    },
    {
      label: "Help",
      submenu: [
        {
          label: "How to Play",
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: "info",
              title: "How to Play Super Dudu & Bubu",
              message: "Game Controls",
              detail: `
🎮 Movement: Arrow Keys or WASD
🦘 Jump: Spacebar, W, or Up Arrow
🏃 Run: Hold Shift while moving
⏸️ Pause: ESC key

🎯 Objectives:
• Collect coins for points
• Jump on enemies to defeat them
• Grab power-ups for special abilities
• Reach the end of each level

🔥 Dudu: Fire character with speed boost
💙 Bubu: Ice character with higher jumps

Good luck on your adventure!
              `,
              buttons: ["Got it!"],
            });
          },
        },
        {
          label: "About",
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: "info",
              title: "About Super Dudu & Bubu",
              message: "Super Dudu & Bubu v1.0.0",
              detail:
                "A classic platform adventure game featuring Dudu and Bubu!\n\nBuilt with React, TypeScript, and Electron.\n\n© 2024 Super Dudu & Bubu Game",
              buttons: ["Close"],
            });
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// App event listeners
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Security: Prevent navigation to external websites
app.on("web-contents-created", (event, contents) => {
  contents.on("will-navigate", (event, url) => {
    const parsedUrl = new URL(url);

    if (
      parsedUrl.origin !== "http://localhost:5173" &&
      !url.startsWith("file://")
    ) {
      event.preventDefault();
    }
  });
});

// Handle app protocol for better integration
app.setAsDefaultProtocolClient("dudu-bubu-game");

// IPC handlers for game communication
ipcMain.handle("get-app-version", () => {
  return app.getVersion();
});

ipcMain.handle("show-save-dialog", async () => {
  const result = await dialog.showSaveDialog(mainWindow, {
    filters: [
      { name: "Game Save Files", extensions: ["save"] },
      { name: "All Files", extensions: ["*"] },
    ],
  });
  return result;
});

ipcMain.handle("show-open-dialog", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    filters: [
      { name: "Game Save Files", extensions: ["save"] },
      { name: "All Files", extensions: ["*"] },
    ],
  });
  return result;
});
