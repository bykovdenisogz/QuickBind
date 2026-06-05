/**
 * QuickBind — Sync Module
 * Handles data synchronization using chrome.storage.sync (no auth required).
 */

const QuickBindSync = (() => {
  /**
   * Checks if the sync storage is available.
   * @returns {boolean}
   */
  function isAvailable() {
    return typeof chrome !== "undefined" && chrome.storage && chrome.storage.sync;
  }

  /**
   * Pushes local data to chrome.storage.sync.
   * @param {Array} links
   * @param {string|null} activeId
   */
  async function pushToSync(links, activeId) {
    if (!isAvailable()) return;

    try {
      const payload = JSON.stringify({ links, activeId });
      if (new Blob([payload]).size > 80 * 1024) {
        console.warn("Sync payload too large, skipping sync");
        return;
      }
      await chrome.storage.sync.set({ links, activeId });
    } catch (err) {
      console.warn("Push to sync failed:", err);
    }
  }

  /**
   * Pulls data from chrome.storage.sync.
   * @returns {Promise<{links: Array, activeId: string|null}|null>}
   */
  async function pullFromSync() {
    if (!isAvailable()) return null;

    try {
      const data = await chrome.storage.sync.get(["links", "activeId"]);
      if (data.links && Array.isArray(data.links) && data.links.length > 0) {
        return { links: data.links, activeId: data.activeId || null };
      }
    } catch (err) {
      console.warn("Pull from sync failed:", err);
    }

    return null;
  }

  /**
   * Full sync: pushes local data to sync storage.
   * @param {Array} links
   * @param {string|null} activeId
   */
  async function sync(links, activeId) {
    await pushToSync(links, activeId);
  }

  // ─── Public API ───────────────────────────────────────────
  return {
    isAvailable,
    pushToSync,
    pullFromSync,
    sync,
  };
})();