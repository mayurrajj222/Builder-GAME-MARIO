const { contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electronAPI", {
  // Game-specific methods
  onGameAction: (callback) => {
    ipcRenderer.on("game-action", callback);
  },

  removeGameActionListener: () => {
    ipcRenderer.removeAllListeners("game-action");
  },

  // App methods
  getAppVersion: () => ipcRenderer.invoke("get-app-version"),

  // File system methods for save/load
  showSaveDialog: () => ipcRenderer.invoke("show-save-dialog"),
  showOpenDialog: () => ipcRenderer.invoke("show-open-dialog"),

  // Platform info
  platform: process.platform,
  isElectron: true,
});

// Game-specific enhancements
window.addEventListener("DOMContentLoaded", () => {
  // Add keyboard shortcuts that work with Electron
  document.addEventListener("keydown", (event) => {
    // F11 for fullscreen
    if (event.key === "F11") {
      event.preventDefault();
      // Fullscreen is handled by Electron menu
    }

    // Ctrl/Cmd + R for restart (if in game)
    if ((event.ctrlKey || event.metaKey) && event.key === "r") {
      event.preventDefault();
      // Could trigger game restart
    }
  });

  // Prevent context menu in production
  if (!window.location.href.includes("localhost")) {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }

  // Prevent drag and drop of files
  document.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  document.addEventListener("drop", (e) => {
    e.preventDefault();
  });
});
