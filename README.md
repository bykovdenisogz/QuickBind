# QuickBind

A lightweight Microsoft Edge extension that opens saved URLs via global hotkeys.

## Features

- Save multiple URLs with custom names
- Set one link as "active" — open it instantly with a keyboard shortcut
- Open all saved links at once
- Export / import config as JSON
- Optional Google account sign-in for cross-device sync
- Toggle between dark and light themes
- All data stored locally — no network requests, no tracking

## Installation (Developer Mode)

1. Open Microsoft Edge and navigate to `edge://extensions/`
2. Enable **Developer mode** (toggle in the bottom-left corner)
3. Click **Load unpacked**
4. Select the `QuickBind` folder (the one containing `manifest.json`)
5. The extension icon should appear in the toolbar

## Setting Up Hotkeys

1. Navigate to `edge://extensions/shortcuts`
2. Find **QuickBind** in the list
3. Set your preferred shortcut for **"Opens the active saved link in a new tab"**
   - Default: `Ctrl+Shift+K`
4. Optionally, set a shortcut for **"Open QuickBind popup"**
   - Default: `Alt+Q`

## Usage

1. Click the QuickBind icon in the toolbar
2. Add links using the form at the bottom (Name + URL)
3. Select a link from the dropdown to make it active
4. Press `Ctrl+Shift+K` (or your custom shortcut) to open the active link in a new tab

## File Structure

```
QuickBind/
├── manifest.json        # Extension manifest (V3)
├── background.js        # Service worker — handles hotkeys
├── popup.html           # Popup UI markup
├── popup.css            # Popup styles (dark/light themes)
├── popup.js             # Popup logic and storage management
├── sync.js              # Google auth & cross-device sync module
├── icons/
│   ├── icon16.png       # 16×16 toolbar icon
│   ├── icon48.png       # 48×48 extension page icon
│   └── icon128.png      # 128×128 store/install icon
├── README.md            # This file
└── PRIVACY_POLICY.md    # Privacy policy
```

## Regenerating Icons

If you want to regenerate the icons, run the PowerShell script:

```powershell
cd icons
powershell -ExecutionPolicy Bypass -File generate_icons.ps1
```

## License

MIT
