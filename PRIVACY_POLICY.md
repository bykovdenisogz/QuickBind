# Privacy Policy — QuickBind

**Last updated:** June 2026

## Overview

QuickBind is a browser extension that allows users to save URLs and open them via keyboard shortcuts. This privacy policy explains how QuickBind handles user data.

## Data Collection

**QuickBind does NOT collect, transmit, sell, or share any user data.**

- No analytics or telemetry is collected
- No personal information is gathered or stored externally
- The extension only makes network requests when the user optionally signs in with a Google account (for cross-device sync via `chrome.storage.sync`)

## Data Storage

All user data — including saved URLs, link names, active link selection, and theme preference — is stored in the browser's local storage (`chrome.storage.local`).

If the user signs in with a Google account, data is additionally synced via `chrome.storage.sync` (Chrome's built-in sync mechanism). This data is managed entirely by Chrome and Google — the extension never transmits data to its own servers.

This data:
- Is not accessible to the extension developer or any third party
- Is deleted when you uninstall the extension

## Permissions

QuickBind requests the following permissions:

| Permission     | Purpose                                            |
|----------------|----------------------------------------------------|
| `storage`      | Save links and settings locally / sync via Chrome  |
| `tabs`         | Open saved URLs in new tabs                        |
| `identity`     | Optional Google account sign-in for cross-device sync |

The `identity` permission is only used when the user explicitly chooses to sign in. The extension does not access browsing history, cookies, or any other browser data.

## Third-Party Services

When the user signs in with a Google account, the extension uses:
- **Google OAuth2** (`chrome.identity`) — to authenticate the user
- **Google userinfo API** — to retrieve the user's email address for display purposes only

No other third-party services, APIs, or libraries are used.

## Changes to This Policy

If this privacy policy is updated, the changes will be reflected in the extension's repository. Continued use of the extension after changes constitutes acceptance of the updated policy.

## Contact

If you have questions about this privacy policy, please open an issue at the extension's repository.
