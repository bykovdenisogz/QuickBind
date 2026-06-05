/**
 * QuickBind — Ad Blocker Module
 * Built-in ad blocker using declarativeNetRequest API.
 */

const QuickBindAdBlocker = (() => {
  const AD_BLOCK_RULES = [
    { id: 1, priority: 1, action: { type: "block" }, condition: { urlFilter: "||doubleclick.net^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame", "stylesheet", "font", "media"] } },
    { id: 2, priority: 1, action: { type: "block" }, condition: { urlFilter: "||googlesyndication.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 3, priority: 1, action: { type: "block" }, condition: { urlFilter: "||googleadservices.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 4, priority: 1, action: { type: "block" }, condition: { urlFilter: "||adservice.google.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 5, priority: 1, action: { type: "block" }, condition: { urlFilter: "||pagead2.googlesyndication.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 6, priority: 1, action: { type: "block" }, condition: { urlFilter: "||facebook.com/tr^", resourceTypes: ["script", "image", "xmlhttprequest"] } },
    { id: 7, priority: 1, action: { type: "block" }, condition: { urlFilter: "||analytics.google.com^", resourceTypes: ["script", "image", "xmlhttprequest"] } },
    { id: 8, priority: 1, action: { type: "block" }, condition: { urlFilter: "||stats.g.doubleclick.net^", resourceTypes: ["script", "image", "xmlhttprequest"] } },
    { id: 9, priority: 1, action: { type: "block" }, condition: { urlFilter: "||mc.yandex.ru^", resourceTypes: ["script", "image", "xmlhttprequest"] } },
    { id: 10, priority: 1, action: { type: "block" }, condition: { urlFilter: "||yandex.ru/click^", resourceTypes: ["script", "image", "xmlhttprequest"] } },
    { id: 11, priority: 1, action: { type: "block" }, condition: { urlFilter: "||adfox.ru^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 12, priority: 1, action: { type: "block" }, condition: { urlFilter: "||adsrvr.org^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 13, priority: 1, action: { type: "block" }, condition: { urlFilter: "||adnxs.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 14, priority: 1, action: { type: "block" }, condition: { urlFilter: "||criteo.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 15, priority: 1, action: { type: "block" }, condition: { urlFilter: "||criteo.net^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 16, priority: 1, action: { type: "block" }, condition: { urlFilter: "||amazon-adsystem.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 17, priority: 1, action: { type: "block" }, condition: { urlFilter: "||taboola.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 18, priority: 1, action: { type: "block" }, condition: { urlFilter: "||outbrain.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 19, priority: 1, action: { type: "block" }, condition: { urlFilter: "||popads.net^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 20, priority: 1, action: { type: "block" }, condition: { urlFilter: "||popcash.net^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 21, priority: 1, action: { type: "block" }, condition: { urlFilter: "||exoclick.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 22, priority: 1, action: { type: "block" }, condition: { urlFilter: "||trafficjunky.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 23, priority: 1, action: { type: "block" }, condition: { urlFilter: "||propellerads.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 24, priority: 1, action: { type: "block" }, condition: { urlFilter: "||clickadu.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 25, priority: 1, action: { type: "block" }, condition: { urlFilter: "||hilltopads.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 26, priority: 1, action: { type: "block" }, condition: { urlFilter: "||bidswitch.net^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 27, priority: 1, action: { type: "block" }, condition: { urlFilter: "||rubiconproject.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 28, priority: 1, action: { type: "block" }, condition: { urlFilter: "||openx.net^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 29, priority: 1, action: { type: "block" }, condition: { urlFilter: "||pubmatic.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 30, priority: 1, action: { type: "block" }, condition: { urlFilter: "||casalemedia.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 31, priority: 1, action: { type: "block" }, condition: { urlFilter: "||turn.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 32, priority: 1, action: { type: "block" }, condition: { urlFilter: "||lijit.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 33, priority: 1, action: { type: "block" }, condition: { urlFilter: "||sharethrough.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 34, priority: 1, action: { type: "block" }, condition: { urlFilter: "||smartadserver.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 35, priority: 1, action: { type: "block" }, condition: { urlFilter: "||spotxchange.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 36, priority: 1, action: { type: "block" }, condition: { urlFilter: "||serving-sys.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 37, priority: 1, action: { type: "block" }, condition: { urlFilter: "||sail-horizon.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 38, priority: 1, action: { type: "block" }, condition: { urlFilter: "||mathtag.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 39, priority: 1, action: { type: "block" }, condition: { urlFilter: "||moatads.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 40, priority: 1, action: { type: "block" }, condition: { urlFilter: "||adskeeper.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 41, priority: 1, action: { type: "block" }, condition: { urlFilter: "||mgid.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 42, priority: 1, action: { type: "block" }, condition: { urlFilter: "||revcontent.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 43, priority: 1, action: { type: "block" }, condition: { urlFilter: "||adsterra.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 44, priority: 1, action: { type: "block" }, condition: { urlFilter: "||monetag.com^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 45, priority: 1, action: { type: "block" }, condition: { urlFilter: "||shrinkme.io^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 46, priority: 1, action: { type: "block" }, condition: { urlFilter: "||ouo.io^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 47, priority: 1, action: { type: "block" }, condition: { urlFilter: "||adfly.fr^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 48, priority: 1, action: { type: "block" }, condition: { urlFilter: "||shorte.st^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 49, priority: 1, action: { type: "block" }, condition: { urlFilter: "||bc.vc^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
    { id: 50, priority: 1, action: { type: "block" }, condition: { urlFilter: "||adshrink.it^", resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"] } },
  ];

  const COSMETIC_RULES = [
    { id: 1001, priority: 1, action: { type: "css" }, condition: { urlFilter: "||google.com", resourceTypes: ["sub_frame"] } },
  ];

  let enabled = true;
  let blockedCount = 0;

  async function isEnabled() {
    const data = await chrome.storage.local.get("adBlockerEnabled");
    enabled = data.adBlockerEnabled !== false;
    return enabled;
  }

  async function setEnabled(value) {
    enabled = value;
    await chrome.storage.local.set({ adBlockerEnabled: value });
    if (enabled) {
      await enableRules();
    } else {
      await disableRules();
    }
  }

  async function enableRules() {
    try {
      const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
      const removeRuleIds = existingRules.map(r => r.id);
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds,
        addRules: AD_BLOCK_RULES,
      });
    } catch (err) {
      console.error("Failed to enable ad blocker rules:", err);
    }
  }

  async function disableRules() {
    try {
      const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
      const removeRuleIds = existingRules.map(r => r.id);
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds,
        addRules: [],
      });
    } catch (err) {
      console.error("Failed to disable ad blocker rules:", err);
    }
  }

  async function init() {
    const isOn = await isEnabled();
    if (isOn) {
      await enableRules();
    }
    chrome.declarativeNetRequest.onRuleMatchedDebug?.addListener((info) => {
      blockedCount++;
    });
  }

  function getBlockedCount() {
    return blockedCount;
  }

  return {
    init,
    isEnabled,
    setEnabled,
    enableRules,
    disableRules,
    getBlockedCount,
  };
})();
