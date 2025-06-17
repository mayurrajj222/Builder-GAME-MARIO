// PWA Service Worker Registration and Installation
export class PWAManager {
  private deferredPrompt: any = null;

  constructor() {
    this.init();
  }

  private async init() {
    // Register service worker
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        console.log(
          "PWA: Service Worker registered successfully",
          registration,
        );

        // Check for updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                this.showUpdateNotification();
              }
            });
          }
        });
      } catch (error) {
        console.error("PWA: Service Worker registration failed:", error);
      }
    }

    // Handle install prompt
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });

    // Handle app installed
    window.addEventListener("appinstalled", () => {
      console.log("PWA: App installed successfully");
      this.hideInstallButton();
      this.deferredPrompt = null;
    });
  }

  public async installApp(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false;
    }

    try {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;

      if (outcome === "accepted") {
        console.log("PWA: User accepted the install prompt");
        return true;
      } else {
        console.log("PWA: User dismissed the install prompt");
        return false;
      }
    } catch (error) {
      console.error("PWA: Error during installation:", error);
      return false;
    } finally {
      this.deferredPrompt = null;
    }
  }

  private showInstallButton() {
    // Create install button
    const installButton = document.createElement("button");
    installButton.id = "pwa-install-button";
    installButton.innerHTML = "📱 Install Game";
    installButton.className =
      "fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg z-50 transition-all duration-300";

    installButton.addEventListener("click", () => {
      this.installApp();
    });

    // Add to DOM if not already present
    if (!document.getElementById("pwa-install-button")) {
      document.body.appendChild(installButton);
    }
  }

  private hideInstallButton() {
    const installButton = document.getElementById("pwa-install-button");
    if (installButton) {
      installButton.remove();
    }
  }

  private showUpdateNotification() {
    // Show update notification
    const notification = document.createElement("div");
    notification.id = "pwa-update-notification";
    notification.innerHTML = `
      <div class="fixed top-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
        <p class="font-bold">Game Updated!</p>
        <p class="text-sm">New features available. Refresh to update.</p>
        <button onclick="window.location.reload()" class="mt-2 bg-white text-green-600 px-3 py-1 rounded text-sm font-bold">
          Refresh Now
        </button>
        <button onclick="document.getElementById('pwa-update-notification').remove()" class="mt-2 ml-2 text-white underline text-sm">
          Later
        </button>
      </div>
    `;

    if (!document.getElementById("pwa-update-notification")) {
      document.body.appendChild(notification);
    }
  }

  public async requestNotificationPermission(): Promise<boolean> {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }
    return false;
  }

  public isInstalled(): boolean {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.matchMedia("(display-mode: fullscreen)").matches ||
      (window.navigator as any).standalone === true
    );
  }

  public isInstallable(): boolean {
    return this.deferredPrompt !== null;
  }
}

// Initialize PWA Manager
export const pwaManager = new PWAManager();
