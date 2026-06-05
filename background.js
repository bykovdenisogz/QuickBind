/**
 * QuickBind — Background Service Worker
 * Handles global hotkey commands, opens the active saved link,
 * and manages the built-in ad blocker.
 */

importScripts("adblocker.js");

// Initialize ad blocker on startup
chrome.runtime.onStartup.addListener(() => {
  QuickBindAdBlocker.init();
});

chrome.runtime.onInstalled.addListener(() => {
  QuickBindAdBlocker.init();
});

// Listen for command events from keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  if (command === "open_active_link") {
    openActiveLink();
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "toggleAdBlocker") {
    QuickBindAdBlocker.setEnabled(message.enabled).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
  if (message.type === "getAdBlockerStatus") {
    QuickBindAdBlocker.isEnabled().then((enabled) => {
      sendResponse({ enabled });
    });
    return true;
  }
  if (message.type === "getBlockedCount") {
    sendResponse({ count: QuickBindAdBlocker.getBlockedCount() });
    return true;
  }
});

/**
 * Reads the active link from storage and opens it in a new tab.
 * Shows a notification if no active link is set or URL is invalid.
 */
async function openActiveLink() {
  try {
    const data = await chrome.storage.local.get(["links", "activeId"]);
    const { links = [], activeId = null } = data;

    if (!links.length) {
      showNotification("QuickBind", "No saved links. Add one from the popup.");
      return;
    }

    const active = links.find((l) => l.id === activeId);
    if (!active) {
      showNotification("QuickBind", "No active link selected. Open the popup to choose one.");
      return;
    }

    if (!isValidUrl(active.url)) {
      showNotification("QuickBind", `Invalid URL: ${active.url}`);
      return;
    }

    await chrome.tabs.create({ url: active.url });
  } catch (err) {
    console.error("QuickBind error:", err);
    showNotification("QuickBind", "Something went wrong. Check the console.");
  }
}

/**
 * Validates whether a string is a proper HTTP/HTTPS URL.
 * @param {string} string
 * @returns {boolean}
 */
function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Displays a simple notification via chrome.notifications (if available)
 * or falls back to console logging.
 * @param {string} title
 * @param {string} message
 */
function showNotification(title, message) {
  // chrome.notifications requires the "notifications" permission,
  // which we intentionally omit to keep the extension minimal.
  // Log to console as a fallback.
  console.warn(`${title}: ${message}`);
}
