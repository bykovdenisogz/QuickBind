/**
 * QuickBind — Popup Script
 * Manages saved links, active link selection, settings, and UI interactions.
 * All data is persisted in chrome.storage.local.
 */

// ─── Localization ────────────────────────────────────────────
const I18N = {
  en: {
    title: "QuickBind",
    activeLink: "Active link",
    selectLink: "— select a link —",
    open: "Open",
    openAll: "Open All",
    savedLinks: "Saved links",
    noLinks: "No links saved yet.",
    addNewLink: "Add new link",
    namePlaceholder: "Name",
    urlPlaceholder: "https://example.com",
    add: "Add",
    notePlaceholder: "Note (optional)",
    config: "Config",
    importExportLinks: "Import/Export Links",
    export: "Export",
    import: "Import",
    settings: "Settings",
    theme: "Theme",
    dark: "Dark",
    light: "Light",
    language: "Language",
    username: "Username",
    usernamePlaceholder: "Your name",
    importExportSettings: "Import/Export Settings",
    exportSettings: "Export",
    importSettings: "Import",
    linkActivated: "Link activated",
    enterName: "Please enter a name",
    enterUrl: "Please enter a URL",
    invalidUrl: "Invalid URL (must start with http:// or https://)",
    linkAdded: "Link added",
    linkRemoved: "Link removed",
    noLinksToOpen: "No links to open",
    openedTabs: (n) => `Opened ${n} tab${n !== 1 ? "s" : ""}`,
    noLinksToExport: "No links to export",
    configExported: "Config exported",
    invalidConfig: "Invalid config: missing links array",
    invalidLinkEntry: "Invalid link entry: missing id, name, or url",
    importedLinks: (n) => `Imported ${n} link${n !== 1 ? "s" : ""}`,
    importFailed: (msg) => `Import failed: ${msg}`,
    noLinkSelected: "No link selected",
    settingsExported: "Settings exported",
    settingsImported: "Settings imported",
    settingsImportFailed: (msg) => `Settings import failed: ${msg}`,
  },
  ru: {
    title: "QuickBind",
    activeLink: "Активная ссылка",
    selectLink: "— выберите ссылку —",
    open: "Открыть",
    openAll: "Открыть все",
    savedLinks: "Сохранённые ссылки",
    noLinks: "Ссылок пока нет.",
    addNewLink: "Добавить ссылку",
    namePlaceholder: "Название",
    urlPlaceholder: "https://example.com",
    add: "Добавить",
    notePlaceholder: "Заметка (необязательно)",
    config: "Конфиг",
    importExportLinks: "Импорт/экспорт ссылок",
    export: "Экспорт",
    import: "Импорт",
    settings: "Настройки",
    theme: "Тема",
    dark: "Тёмная",
    light: "Светлая",
    language: "Язык",
    username: "Имя пользователя",
    usernamePlaceholder: "Ваше имя",
    importExportSettings: "Импорт/экспорт настроек",
    exportSettings: "Экспорт",
    importSettings: "Импорт",
    linkActivated: "Ссылка активирована",
    enterName: "Введите название",
    enterUrl: "Введите URL",
    invalidUrl: "Неверный URL (должен начинаться с http:// или https://)",
    linkAdded: "Ссылка добавлена",
    linkRemoved: "Ссылка удалена",
    noLinksToOpen: "Нет ссылок для открытия",
    openedTabs: (n) => `Открыто ${n} вклад${n !== 1 ? (n < 5 ? "ки" : "ок") : "ка"}`,
    noLinksToExport: "Нет ссылок для экспорта",
    configExported: "Конфиг экспортирован",
    invalidConfig: "Неверный конфиг: отсутствует массив ссылок",
    invalidLinkEntry: "Неверная ссылка: отсутствует id, name или url",
    importedLinks: (n) => `Импортировано ${n} ссыл${n !== 1 ? (n < 5 ? "ки" : "ок") : "ка"}`,
    importFailed: (msg) => `Ошибка импорта: ${msg}`,
    noLinkSelected: "Ссылка не выбрана",
    settingsExported: "Настройки экспортированы",
    settingsImported: "Настройки импортированы",
    settingsImportFailed: (msg) => `Ошибка импорта настроек: ${msg}`,
  },
  zh: {
    title: "QuickBind",
    activeLink: "活动链接",
    selectLink: "— 选择链接 —",
    open: "打开",
    openAll: "全部打开",
    savedLinks: "已保存的链接",
    noLinks: "暂无保存的链接。",
    addNewLink: "添加新链接",
    namePlaceholder: "名称",
    urlPlaceholder: "https://example.com",
    add: "添加",
    notePlaceholder: "备注（可选）",
    config: "配置",
    importExportLinks: "导入/导出链接",
    export: "导出",
    import: "导入",
    settings: "设置",
    theme: "主题",
    dark: "深色",
    light: "浅色",
    language: "语言",
    username: "用户名",
    usernamePlaceholder: "您的名字",
    importExportSettings: "导入/导出设置",
    exportSettings: "导出",
    importSettings: "导入",
    linkActivated: "链接已激活",
    enterName: "请输入名称",
    enterUrl: "请输入 URL",
    invalidUrl: "无效的 URL（必须以 http:// 或 https:// 开头）",
    linkAdded: "链接已添加",
    linkRemoved: "链接已删除",
    noLinksToOpen: "没有可打开的链接",
    openedTabs: (n) => `已打开 ${n} 个标签页`,
    noLinksToExport: "没有可导出的链接",
    configExported: "配置已导出",
    invalidConfig: "无效的配置：缺少链接数组",
    invalidLinkEntry: "无效的链接条目：缺少 id、name 或 url",
    importedLinks: (n) => `已导入 ${n} 个链接`,
    importFailed: (msg) => `导入失败：${msg}`,
    noLinkSelected: "未选择链接",
    settingsExported: "设置已导出",
    settingsImported: "设置已导入",
    settingsImportFailed: (msg) => `设置导入失败：${msg}`,
  },
};

let currentLang = "en";

function t(key, ...args) {
  const entry = I18N[currentLang]?.[key] ?? I18N.en[key] ?? key;
  return typeof entry === "function" ? entry(...args) : entry;
}

// ─── DOM References ──────────────────────────────────────────
const activeSelect = document.getElementById("activeSelect");
const openLinkBtn = document.getElementById("openLink");
const openAllBtn = document.getElementById("openAll");
const linkList = document.getElementById("linkList");
const emptyState = document.getElementById("emptyState");
const nameInput = document.getElementById("nameInput");
const urlInput = document.getElementById("urlInput");
const addBtn = document.getElementById("addBtn");
const noteInput = document.getElementById("noteInput");
const themeToggle = document.getElementById("themeToggle");
const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const importFile = document.getElementById("importFile");
const statusEl = document.getElementById("status");
const settingsBtn = document.getElementById("settingsBtn");
const settingsDropdown = document.getElementById("settingsDropdown");
const settingsCloseBtn = document.getElementById("settingsCloseBtn");
const themeSelect = document.getElementById("themeSelect");
const langSelect = document.getElementById("langSelect");
const usernameInput = document.getElementById("usernameInput");
const exportSettingsBtn = document.getElementById("exportSettingsBtn");
const importSettingsBtn = document.getElementById("importSettingsBtn");
const importSettingsFile = document.getElementById("importSettingsFile");

// ─── State ───────────────────────────────────────────────────
let links = [];
let activeId = null;
let settingsVisible = false;

// ─── Initialise ──────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", init);

async function init() {
  await loadStorage();
  await loadSettings();
  renderLinkList();
  renderSelect();
  applyTheme();
  applyLanguage();
  bindEvents();
}

// ─── Storage helpers ─────────────────────────────────────────

async function loadStorage() {
  const data = await chrome.storage.local.get(["links", "activeId"]);
  links = data.links || [];
  activeId = data.activeId || null;
}

async function saveStorage() {
  await chrome.storage.local.set({ links, activeId });
  await QuickBindSync.sync(links, activeId);
}

async function loadSettings() {
  const data = await chrome.storage.local.get(["theme", "language", "username"]);
  currentLang = data.language || "en";
  langSelect.value = currentLang;
  usernameInput.value = data.username || "";
}

async function saveSettings() {
  await chrome.storage.local.set({
    language: currentLang,
    username: usernameInput.value.trim(),
  });
}

// ─── Rendering ───────────────────────────────────────────────

function renderSelect() {
  const prev = activeSelect.value;
  activeSelect.innerHTML = `<option value="">${t("selectLink")}</option>`;

  links.forEach((link) => {
    const opt = document.createElement("option");
    opt.value = link.id;
    opt.textContent = link.name;
    activeSelect.appendChild(opt);
  });

  if (links.find((l) => l.id === prev)) {
    activeSelect.value = prev;
  } else if (activeId) {
    activeSelect.value = activeId;
  }
}

function renderLinkList() {
  linkList.innerHTML = "";

  if (!links.length) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  links.forEach((link) => {
    const li = document.createElement("li");
    li.className = "link-item" + (link.id === activeId ? " active" : "");
    const noteHtml = link.note ? `<div class="link-note">${escapeHtml(link.note)}</div>` : "";
    li.innerHTML = `
      <div class="link-info">
        <div class="link-name">${escapeHtml(link.name)}</div>
        <div class="link-url">${escapeHtml(link.url)}</div>
        ${noteHtml}
      </div>
      <button class="btn btn-danger" data-id="${link.id}" title="Delete">✕</button>
    `;

    li.addEventListener("click", (e) => {
      if (e.target.closest(".btn-danger")) return;
      setActive(link.id);
    });

    linkList.appendChild(li);
  });
}

// ─── Actions ─────────────────────────────────────────────────

function setActive(id) {
  activeId = id;
  activeSelect.value = id;
  saveStorage();
  renderLinkList();
  showStatus(t("linkActivated"));
}

async function addLink() {
  const name = nameInput.value.trim();
  const url = urlInput.value.trim();
  const note = noteInput.value.trim();

  if (!name) {
    showStatus(t("enterName"), true);
    nameInput.focus();
    return;
  }

  if (!url) {
    showStatus(t("enterUrl"), true);
    urlInput.focus();
    return;
  }

  if (!isValidUrl(url)) {
    showStatus(t("invalidUrl"), true);
    urlInput.focus();
    return;
  }

  const link = { id: generateId(), name, url, note };
  links.push(link);

  if (links.length === 1) {
    activeId = link.id;
  }

  await saveStorage();
  renderLinkList();
  renderSelect();

  nameInput.value = "";
  urlInput.value = "";
  noteInput.value = "";
  showStatus(t("linkAdded"));
}

async function deleteLink(id) {
  links = links.filter((l) => l.id !== id);

  if (activeId === id) {
    activeId = links.length ? links[0].id : null;
  }

  await saveStorage();
  renderLinkList();
  renderSelect();
  showStatus(t("linkRemoved"));
}

function openAllLinks() {
  if (!links.length) {
    showStatus(t("noLinksToOpen"), true);
    return;
  }

  let opened = 0;
  for (const link of links) {
    if (isValidUrl(link.url)) {
      chrome.tabs.create({ url: link.url });
      opened++;
    }
  }
  showStatus(t("openedTabs", opened));
}

// ─── Export / Import Links ───────────────────────────────────

function exportConfig() {
  if (!links.length) {
    showStatus(t("noLinksToExport"), true);
    return;
  }

  const config = {
    version: "1.0.0",
    exportedAt: new Date().toISOString(),
    links,
    activeId,
  };

  const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `quickbind-config-${Date.now()}.json`;
  a.click();

  URL.revokeObjectURL(url);
  showStatus(t("configExported"));
}

function triggerImport() {
  importFile.click();
}

async function handleImport(event) {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const text = await file.text();
    const config = JSON.parse(text);

    if (!config.links || !Array.isArray(config.links)) {
      throw new Error(t("invalidConfig"));
    }

    for (const link of config.links) {
      if (!link.id || !link.name || !link.url) {
        throw new Error(t("invalidLinkEntry"));
      }
    }

    const existingIds = new Set(links.map((l) => l.id));
    let imported = 0;

    for (const link of config.links) {
      if (!existingIds.has(link.id)) {
        links.push(link);
        imported++;
      }
    }

    if (config.activeId && !activeId) {
      activeId = config.activeId;
    }

    await saveStorage();
    renderLinkList();
    renderSelect();
    showStatus(t("importedLinks", imported));
  } catch (err) {
    showStatus(t("importFailed", err.message), true);
  }

  importFile.value = "";
}

// ─── Settings ────────────────────────────────────────────────

function toggleSettings() {
  settingsVisible = !settingsVisible;
  settingsDropdown.hidden = !settingsVisible;
}

// ─── Export / Import Settings ────────────────────────────────

async function exportSettings() {
  const data = await chrome.storage.local.get(["theme", "language", "username"]);
  const settings = {
    version: "1.0.0",
    exportedAt: new Date().toISOString(),
    theme: data.theme || "dark",
    language: data.language || "en",
    username: data.username || "",
  };

  const blob = new Blob([JSON.stringify(settings, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `quickbind-settings-${Date.now()}.json`;
  a.click();

  URL.revokeObjectURL(url);
  showStatus(t("settingsExported"));
}

function triggerImportSettings() {
  importSettingsFile.click();
}

async function handleImportSettings(event) {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const text = await file.text();
    const settings = JSON.parse(text);

    if (settings.theme) {
      document.documentElement.setAttribute("data-theme", settings.theme);
      themeSelect.value = settings.theme;
      themeToggle.textContent = settings.theme === "light" ? "☀️" : "🌙";
      await chrome.storage.local.set({ theme: settings.theme });
    }

    if (settings.language && I18N[settings.language]) {
      currentLang = settings.language;
      langSelect.value = currentLang;
      await chrome.storage.local.set({ language: currentLang });
      applyLanguage();
    }

    if (typeof settings.username === "string") {
      usernameInput.value = settings.username;
      await chrome.storage.local.set({ username: settings.username });
    }

    showStatus(t("settingsImported"));
  } catch (err) {
    showStatus(t("settingsImportFailed", err.message), true);
  }

  importSettingsFile.value = "";
}

// ─── Theme ───────────────────────────────────────────────────

async function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  themeToggle.textContent = next === "light" ? "☀️" : "🌙";
  themeSelect.value = next;
  await chrome.storage.local.set({ theme: next });
}

async function applyTheme() {
  const data = await chrome.storage.local.get("theme");
  const theme = data.theme || "dark";
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "light" ? "☀️" : "🌙";
  themeSelect.value = theme;
}

// ─── Language ────────────────────────────────────────────────

function applyLanguage() {
  document.getElementById("title").textContent = t("title");
  document.getElementById("activeLinkLabel").textContent = t("activeLink");
  document.getElementById("savedLinksTitle").textContent = t("savedLinks");
  emptyState.textContent = t("noLinks");
  document.getElementById("addNewLinkTitle").textContent = t("addNewLink");
  nameInput.placeholder = t("namePlaceholder");
  urlInput.placeholder = t("urlPlaceholder");
  noteInput.placeholder = t("notePlaceholder");
  addBtn.textContent = t("add");
  exportBtn.textContent = t("export");
  importBtn.textContent = t("import");
  openLinkBtn.textContent = t("open");
  openAllBtn.textContent = t("openAll");

  const settingsTitle = document.getElementById("settingsDropdownTitle");
  if (settingsTitle) settingsTitle.textContent = t("settings");

  const settingsGroups = settingsDropdown.querySelectorAll(".settings-group");
  if (settingsGroups[0]) settingsGroups[0].querySelector(".label").textContent = t("theme");
  if (settingsGroups[1]) settingsGroups[1].querySelector(".label").textContent = t("language");
  if (settingsGroups[2]) settingsGroups[2].querySelector(".label").textContent = t("username");
  usernameInput.placeholder = t("usernamePlaceholder");

  const importExportLinksTitle = document.getElementById("importExportLinksTitle");
  if (importExportLinksTitle) importExportLinksTitle.textContent = t("importExportLinks");

  const importExportTitle = document.getElementById("importExportTitle");
  if (importExportTitle) importExportTitle.textContent = t("importExportSettings");
  exportSettingsBtn.textContent = t("exportSettings");
  importSettingsBtn.textContent = t("importSettings");

  themeSelect.querySelector('option[value="dark"]').textContent = t("dark");
  themeSelect.querySelector('option[value="light"]').textContent = t("light");

  renderSelect();
}

// ─── Events ──────────────────────────────────────────────────

function bindEvents() {
  addBtn.addEventListener("click", addLink);

  nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") urlInput.focus();
  });
  urlInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addLink();
  });

  activeSelect.addEventListener("change", () => {
    const val = activeSelect.value;
    if (val) setActive(val);
  });

  openLinkBtn.addEventListener("click", () => {
    const id = activeSelect.value || activeId;
    if (!id) {
      showStatus(t("noLinkSelected"), true);
      return;
    }
    const link = links.find((l) => l.id === id);
    if (link) chrome.tabs.create({ url: link.url });
  });

  openAllBtn.addEventListener("click", openAllLinks);

  linkList.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-danger");
    if (btn) deleteLink(btn.dataset.id);
  });

  themeToggle.addEventListener("click", toggleTheme);

  exportBtn.addEventListener("click", exportConfig);
  importBtn.addEventListener("click", triggerImport);
  importFile.addEventListener("change", handleImport);

  settingsBtn.addEventListener("click", toggleSettings);
  settingsCloseBtn.addEventListener("click", toggleSettings);

  themeSelect.addEventListener("change", async () => {
    const theme = themeSelect.value;
    document.documentElement.setAttribute("data-theme", theme);
    themeToggle.textContent = theme === "light" ? "☀️" : "🌙";
    await chrome.storage.local.set({ theme });
  });

  langSelect.addEventListener("change", async () => {
    currentLang = langSelect.value;
    await chrome.storage.local.set({ language: currentLang });
    applyLanguage();
  });

  usernameInput.addEventListener("change", async () => {
    await chrome.storage.local.set({ username: usernameInput.value.trim() });
  });

  exportSettingsBtn.addEventListener("click", exportSettings);
  importSettingsBtn.addEventListener("click", triggerImportSettings);
  importSettingsFile.addEventListener("change", handleImportSettings);

  document.addEventListener("click", (e) => {
    if (settingsVisible && !settingsDropdown.contains(e.target) && !settingsBtn.contains(e.target)) {
      settingsVisible = false;
      settingsDropdown.hidden = true;
    }
  });
}

// ─── Utilities ───────────────────────────────────────────────

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

let statusTimeout;
function showStatus(message, isError = false) {
  clearTimeout(statusTimeout);
  statusEl.textContent = message;
  statusEl.className = "status" + (isError ? " error" : "");
  statusEl.hidden = false;
  statusTimeout = setTimeout(() => {
    statusEl.hidden = true;
  }, 2000);
}