// ==UserScript==
// @name            OCLB Helper 2
// @namespace       http://hampshirebrony.neocities.org
// @description     Augments Kishan Bagaria's One Click Llama Button & Liamb135's One Click Cake Button
// @author          Liamb135 | Original Author: HampshireBrony
// @version         1.7.1
// @icon            https://kishan.org/-/oclb.png
// @match           *://*.deviantart.com/*
// @run-at          document-end
// @grant           GM_addStyle
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_listValues
// @downloadURL     https://raw.githubusercontent.com/Liamb135/OCLB-Helper-2/master/OCLB-Helper-2.user.js
// @updateURL       https://raw.githubusercontent.com/Liamb135/OCLB-Helper-2/master/OCLB-Helper-2.user.js
// ==/UserScript==

if (window.top !== window.self) return;

GM_addStyle(`
    #hb-oclb-icon {
        --hb-brand: var(--g-brand, #00e59b);
        --hb-error: var(--g-error-primary, #f53948);
        --hb-text: var(--g-typography-primary, #f2f2f2);
        --hb-text-secondary: var(--g-typography-secondary, #c9cacf);
        --hb-bg: var(--g-bg-tertiary, #21272b);
        --hb-border: var(--g-stroke-default, #363a42);

        position: fixed !important;
        bottom: 16px !important;
        right: 16px !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-end !important;
        justify-content: flex-end !important;
        gap: 6px !important;
        background: var(--hb-bg) !important;
        border: 1px solid var(--hb-border) !important;
        border-radius: 12px !important;
        padding: 8px 10px !important;
        z-index: 99999 !important;
        cursor: pointer !important;
        transition: all .2s ease !important;
        font-family: var(--devious-sans-font-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif) !important;
        font-size: var(--g-font-size-s, 14px) !important;
        overflow: hidden !important;
        box-sizing: border-box !important;
        max-width: 260px !important;
        min-height: 48px !important;
        color: var(--hb-text) !important;
    }

    #hb-oclb-icon.hb-messages-page {
        bottom: 190px !important;
    }

    #hb-oclb-icon.hb-hovering,
    #hb-oclb-icon.hb-warning {
        justify-content: space-between !important;
        align-items: flex-end !important;
        padding: 12px !important;
        max-width: 300px !important;
    }

    #hb-oclb-icon.hb-hovering #hb-oclb-label,
    #hb-oclb-icon.hb-warning #hb-oclb-label {
        display: flex !important;
    }

    #hb-oclb-icon.hb-hovering #hb-oclb-bottom,
    #hb-oclb-icon.hb-warning #hb-oclb-bottom {
        margin-top: 8px !important;
    }

    #hb-oclb-icon.hb-hovering #hb-oclb-image,
    #hb-oclb-icon.hb-warning #hb-oclb-image {
        width: 40px !important;
        height: 36px !important;
    }

    #hb-oclb-label {
        display: none !important;
        flex-direction: column !important;
        align-items: flex-start !important;
        width: 100% !important;
        box-sizing: border-box !important;
        line-height: 1.4 !important;
        text-align: left !important;
        white-space: normal !important;
        word-break: break-word !important;
        color: inherit !important;
    }

    #hb-oclb-bottom {
        display: flex !important;
        align-items: center !important;
        justify-content: flex-end !important;
        width: 100% !important;
        gap: 8px !important;
        box-sizing: border-box !important;
        margin-top: 0 !important;
    }

    #hb-oclb-count {
        font-weight: 600 !important;
        color: var(--hb-brand) !important;
        font-size: inherit !important;
    }

    #hb-oclb-count.hb-count-spam {
        color: var(--hb-error) !important;
        font-weight: 700 !important;
    }

    #hb-oclb-count.hb-count-normal {
        color: var(--hb-brand) !important;
    }

    #hb-oclb-count.hb-count-zero {
        color: var(--hb-error) !important;
    }

    #hb-oclb-image,
    .hb-oclb-mode-icon {
        image-rendering: pixelated !important;
        image-rendering: crisp-edges !important;
        object-fit: contain !important;
        object-position: center !important;
        cursor: pointer !important;
        opacity: .8 !important;
        transition: all .2s ease !important;
        flex-shrink: 0 !important;
        display: block !important;
        width: auto !important;
        height: 100% !important;
        max-width: 100% !important;
    }

    #hb-oclb-image {
        width: 30px !important;
        height: 36px !important;
    }

    .hb-oclb-mode-icon {
        width: 20px !important;
        height: 18px !important;
        max-height: 18px !important;
    }

    #hb-oclb-image:hover,
    .hb-oclb-mode-icon:hover {
        opacity: 1 !important;
        transform: scale(1.1) !important;
    }

    #hb-oclb-title-container {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        width: 100% !important;
        font-weight: 700 !important;
        color: var(--hb-brand) !important;
        margin-bottom: 6px !important;
        font-size: inherit !important;
        line-height: 1.4 !important;
        gap: 8px !important;
    }

    .hb-oclb-title-text {
        flex: 1 !important;
        text-align: center !important;
    }

    .hb-oclb-divider {
        width: 100% !important;
        border: none !important;
        border-top: 1px solid var(--hb-text-secondary) !important;
        margin: 4px 0 8px 0 !important;
    }

    .hb-oclb-divider:last-of-type {
        margin: 3px 0 0 0 !important;
    }

    .hb-oclb-line {
        display: flex !important;
        align-items: center !important;
        line-height: 1.4 !important;
        margin-bottom: 4px !important;
        width: 100% !important;
        color: inherit !important;
        font-size: inherit !important;
    }

    .hb-oclb-line span:first-child {
        flex: 0 0 auto !important;
    }

    .hb-oclb-line span:last-child {
        flex: 1 !important;
        text-align: right !important;
    }

    .hb-oclb-accent {
        color: var(--hb-brand) !important;
    }

    .hb-oclb-giving {
        color: var(--hb-text-secondary) !important;
    }

    .hb-oclb-error {
        color: var(--hb-error) !important;
    }

    .hb-oclb-warn {
        color: var(--hb-error) !important;
        animation: hb-pulse 1.2s infinite !important;
    }

    @keyframes hb-pulse {
        0%, 100% { opacity: .4 }
        50% { opacity: 1 }
    }

    #hb-oclb-icon.hb-oclb-active,
    #hb-oclb-icon.hb-oclb-active:hover,
    #hb-oclb-icon.hb-oclb-active.hb-messages-page {
        border-color: var(--hb-brand) !important;
        box-shadow: 0 0 0 2px var(--hb-brand) !important;
    }

    #hb-oclb-icon.hb-oclb-stopped,
    #hb-oclb-icon.hb-oclb-stopped:hover,
    #hb-oclb-icon.hb-oclb-stopped.hb-messages-page {
        border-color: var(--hb-error) !important;
        box-shadow: 0 0 0 2px var(--hb-error) !important;
    }

    .hb-warning-message {
        font-size: 12px !important;
        color: var(--hb-error) !important;
        text-align: center !important;
        padding: 6px 0 !important;
        font-weight: 500 !important;
        line-height: 1.3 !important;
    }

    .hb-warning-message a {
        color: #fff !important;
        text-decoration: underline !important;
        font-weight: bold !important;
        background: rgba(0, 0, 0, .2) !important;
        padding: 2px 6px !important;
        border-radius: 4px !important;
        display: inline-block !important;
        margin-top: 4px !important;
    }

    body.theme-dark .hb-warning-message a {
        color: #ffddaa !important;
        background: rgba(255, 255, 255, .1) !important;
    }
`);

const LLAMA_ICON = "data:image/gif;base64,R0lGODlhDwASAPQaAO6oQy4kHAAAAJRPC0onDfbhbl0yEO+pQtGBKdGMJcJaKpVgLrFtJ+qwNFkrFuqpJvjGROOKJFUyEmNjPNWUNOzJYnx8Sl0xDXFFLnV1Pv///wAAAAAAAAAAAAAAAAAAACH5BAUAABoALAAAAAAPABIAQAWJoKYFgiCKhKGl5ym9EjEgh9qOWWAF466VgUKAhIIYCoSbZKFgLhYJgGoYFAxRjUIjKQK2CIzBgSuSVCKICBiBSNRuAQfGMQgMHLyu8EQ4UPp/AgWDgyYrFw0GZEF5KAMFEGQ3jjQ2LhWYFWsJD2QDTk9PCW4DLQNNqAsPB6VwEwGvI7GTVDxUGiEAOw==";
const CAKE_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAACXBIWXMAAAsTAAALEwEAmpwYAAACB0lEQVQ4jZ2SvU9TYRSHn/e2t/QDSqoGlosuJXa6TBJ2/wMTIgziZkJMUBdjU0ycNHYyJH6wslgYmujg5ubg4kAHJYEm8jGgCdpAb7W2vcfh9r60QG+Nv+QmJ+fjec895yAiiAh22hJAAPF9//MdGyC17QWx01ZP4OGrK30fMybGx2RifEzstAVAaWsP30eHjpYnJWpf4Gh5sst/UuHS1h617QXt8O34paVTySoTh1IQDsJ+sZ22+Pj+GlNXi6eSZm6MyNS5BBuf7pD5vMjdIKCIKIDOX1zf3FWdsHz+Ma4Lt4rveHA/x+zcqM59vfJNdQJVeyEopQTATlsa6MPKuwUMJdx8dpm13A6ppKUBD7NFlFIaroEnNTs3KvmnS3z5+gIAM2RiKCGWiDEQNaFdNxi9qGsWs6v0BN6esWX63hB/3DDlzSoAw0MJwmYoYILtpfSSYSj2dw6Zv/4EgJ+VGqmk6QVDCQDcxg8Aqo5DYe1NMLBLzTKpQcCF/e9VRs4bGKE4tGoA1J2K10QQIzJwdlgpPNgZ6tmhoRSq5dkvV3P9+qde/UWcTG+gK0Ik5i1gfvoRrlvviovbRBnH5f80w0bTbbdrQmND+5uN39qORLxH644D9NlyzWlq++CgwnAy6hWZUT1Dt70UX33PBmDlbTYoTWv9Q6v3YYN33OAtyA3I8/W8UFJ/ASNLIgCpZsHzAAAAAElFTkSuQmCC";
const OCCB_URL = "https://raw.githubusercontent.com/Liamb135/OCCB/master/OCCB.user.js";
const OCLB_URL = "https://raw.githubusercontent.com/KishanBagaria/OCLB/master/OCLB.user.js";
const ONE_HOUR = 3600000;

let active = 0,
    stopAuto = 0,
    spamWaitUntil = 0,
    fastMode = false,
    panel,
    label,
    count,
    bottomBar,
    icon,
    observer,
    currentInterval = null,
    isShowingZeroWarning = false,
    lastSpamRecordTime = 0;

let cakeMode = GM_getValue("hb_oclb_cakeMode", 0);
let sentHistoryTimestamps = [];
let spamTriggerHistory = [];
let nextExpiryTimeout = null;
let currentUsername = null;
let dataLoaded = false;

window._hbShiftHeld = false;

const make = (t, i) => {
    const e = document.createElement(t);
    if (i) e.id = i;
    return e;
};

const divLine = (k, v, c = "") => `
    <div class="hb-oclb-line ${c}">
        <span>${escapeHtml(k)}</span>
        <span>${escapeHtml(String(v))}</span>
    </div>`;

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function getElementsLength(selector) {
    return document.querySelectorAll(selector).length;
}

function getFirstElement(selector) {
    return document.querySelector(selector);
}

function getGiveSelector() {
    return cakeMode ? ".occb-give" : ".oclb-give";
}

function getGivingSelector() {
    return cakeMode ? ".occb-giving" : ".oclb-giving";
}

function getSpamSelector() {
    return cakeMode ? ".occb-spam" : ".oclb-spam";
}

function getErrorSelector() {
    return cakeMode ? ".occb.occb-error, .occb-error" : ".oclb.oclb-error, .oclb-error";
}

function checkRequiredScript() {
    const giveButtons = document.querySelectorAll(getGiveSelector());
    const givingElements = document.querySelectorAll(getGivingSelector());
    const spamElements = document.querySelectorAll(getSpamSelector());
    const errorElements = document.querySelectorAll(getErrorSelector());

    if (giveButtons.length === 0 && givingElements.length === 0 &&
        spamElements.length === 0 && errorElements.length === 0) {
        return false;
    }
    return true;
}

function getLoggedInUsername() {
    if (window.deviantART && window.deviantART.deviant && window.deviantART.deviant.username) {
        return window.deviantART.deviant.username.toLowerCase();
    }
    const eclipseElem = document.querySelector('header a[data-username]');
    if (eclipseElem) return eclipseElem.getAttribute('data-username').toLowerCase();

    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].trim().indexOf('userinfo=') === 0) {
            try {
                return JSON.parse(decodeURIComponent(cookies[i].split('=')[1])).username.toLowerCase();
            } catch (e) {}
        }
    }
    return null;
}

function getStorageKey() {
    if (currentUsername) return currentUsername;
    const username = getLoggedInUsername();
    if (username) {
        currentUsername = username;
        return username;
    }
    let fallbackKey = localStorage.getItem('hb_oclb_fallback_key');
    if (!fallbackKey) {
        fallbackKey = 'fallback_' + GM_getValue('hb_oclb_install_id', 'default');
        localStorage.setItem('hb_oclb_fallback_key', fallbackKey);
    }
    return fallbackKey;
}

function loadAllData() {
    const storageKey = getStorageKey();

    const savedSpam = GM_getValue(`hb_oclb_spamWaitUntil_${storageKey}`, 0);
    if (savedSpam > Date.now()) {
        spamWaitUntil = savedSpam;
        stopAuto = 1;
    } else {
        spamWaitUntil = 0;
        stopAuto = 0;
        if (savedSpam) {
            GM_deleteValue(`hb_oclb_spamWaitUntil_${storageKey}`);
        }
    }

    const savedSent = GM_getValue(`hb_oclb_sentHistory_${storageKey}`, null);
    if (savedSent) {
        try {
            const parsed = JSON.parse(savedSent);
            sentHistoryTimestamps = Array.isArray(parsed) ? parsed.filter(ts => ts > Date.now() - ONE_HOUR) : [];
        } catch (e) {
            sentHistoryTimestamps = [];
        }
    } else {
        sentHistoryTimestamps = [];
    }

    const savedTriggers = GM_getValue(`hb_oclb_spamTriggers_${storageKey}`, null);
    if (savedTriggers) {
        try {
            const parsed = JSON.parse(savedTriggers);
            spamTriggerHistory = Array.isArray(parsed) ? parsed.filter(ts => ts > Date.now() - ONE_HOUR) : [];
        } catch (e) {
            spamTriggerHistory = [];
        }
    } else {
        spamTriggerHistory = [];
    }

    dataLoaded = true;
}

function saveSpamTimer() {
    if (!dataLoaded) return;
    const storageKey = getStorageKey();
    if (spamWaitUntil > 0) {
        GM_setValue(`hb_oclb_spamWaitUntil_${storageKey}`, spamWaitUntil);
    } else {
        GM_deleteValue(`hb_oclb_spamWaitUntil_${storageKey}`);
    }
}

function saveArray(key, data) {
    if (!dataLoaded) return;
    const storageKey = getStorageKey();
    GM_setValue(`hb_oclb_${key}_${storageKey}`, JSON.stringify(data));
}

function filterOldTimestamps(arr) {
    return arr.filter(ts => ts > Date.now() - ONE_HOUR);
}

function getSentCount() {
    sentHistoryTimestamps = filterOldTimestamps(sentHistoryTimestamps);
    return sentHistoryTimestamps.length;
}

function getSpamTriggerCount() {
    spamTriggerHistory = filterOldTimestamps(spamTriggerHistory);
    return spamTriggerHistory.length;
}

function recordSentBadge() {
    sentHistoryTimestamps.push(Date.now());
    sentHistoryTimestamps = filterOldTimestamps(sentHistoryTimestamps);
    saveArray("sentHistory", sentHistoryTimestamps);
    scheduleNextExpiry();
}

function recordSpamTrigger() {
    const now = Date.now();
    if (now - lastSpamRecordTime < 5000) return;
    lastSpamRecordTime = now;
    spamTriggerHistory.push(now);
    spamTriggerHistory = filterOldTimestamps(spamTriggerHistory);
    saveArray("spamTriggers", spamTriggerHistory);
}

function scheduleNextExpiry() {
    if (nextExpiryTimeout) {
        clearTimeout(nextExpiryTimeout);
        nextExpiryTimeout = null;
    }
    sentHistoryTimestamps = filterOldTimestamps(sentHistoryTimestamps);
    saveArray("sentHistory", sentHistoryTimestamps);

    if (sentHistoryTimestamps.length > 0) {
        const timeUntilExpiry = sentHistoryTimestamps[0] + ONE_HOUR - Date.now();
        if (timeUntilExpiry > 0) {
            nextExpiryTimeout = setTimeout(function() {
                scheduleNextExpiry();
                if (!isShowingZeroWarning) update();
            }, timeUntilExpiry + 100);
        } else {
            scheduleNextExpiry();
        }
    }
}

function adjustSpamCooldown() {
    const sentCount = getSentCount();
    const externalTriggers = getSpamTriggerCount();

    let baseMinutes;
    if (sentCount >= 80) baseMinutes = 15;
    else if (sentCount >= 70) baseMinutes = 13;
    else if (sentCount >= 60) baseMinutes = 10;
    else if (sentCount >= 40) baseMinutes = 8;
    else if (sentCount >= 20) baseMinutes = 5;
    else baseMinutes = 3;

    let extraMinutes = 0;
    if (externalTriggers >= 10) extraMinutes = 30;
    else if (externalTriggers >= 5) extraMinutes = 15;
    else if (externalTriggers >= 3) extraMinutes = 8;
    else if (externalTriggers >= 1) extraMinutes = 3;

    const totalMinutes = baseMinutes + extraMinutes;
    const variation = Math.floor(Math.random() * 6);
    return totalMinutes + variation;
}

function updatePanelPosition() {
    if (!panel) return;
    const isMessagesPage = window.location.pathname.includes("/messages");
    if (window.hbPositionTimeout) clearTimeout(window.hbPositionTimeout);
    window.hbPositionTimeout = setTimeout(function() {
        if (isMessagesPage) panel.classList.add("hb-messages-page");
        else panel.classList.remove("hb-messages-page");
    }, 50);
}

function create() {
    if (document.getElementById("hb-oclb-icon")) return;
    updatePanelPosition();
    panel = make("div", "hb-oclb-icon");

    panel.onclick = function(ev) {
        ev.stopPropagation();
        const giveButtons = document.querySelectorAll(getGiveSelector());
        const hasAnyOccbElements = document.querySelectorAll('.occb-give, .oclb-give, .occb-giving, .oclb-giving, .occb-spam, .oclb-spam').length > 0;
        if (giveButtons.length === 0 && !hasAnyOccbElements && !isShowingZeroWarning) {
            showZeroBadgeWarning();
            return;
        }
        tryBulk();
    };

    panel.onmouseover = grow;
    panel.onmouseleave = shrink;

    label = make("div", "hb-oclb-label");
    panel.appendChild(label);

    bottomBar = make("div", "hb-oclb-bottom");
    panel.appendChild(bottomBar);

    count = make("span", "hb-oclb-count");
    bottomBar.appendChild(count);

    icon = make("img", "hb-oclb-image");
    updateIconForMode();
    bottomBar.appendChild(icon);

    document.body.appendChild(panel);
}

function showZeroBadgeWarning() {
    if (!label || !panel) return;
    isShowingZeroWarning = true;
    panel.classList.add('hb-warning');

    const titleText = cakeMode ? "OCCB Helper" : "OCLB Helper";
    const installText = cakeMode ? "OCCB" : "OCLB";
    const installUrl = cakeMode ? OCCB_URL : OCLB_URL;

    label.innerHTML = `
        <div id="hb-oclb-title-container">
            <span class="hb-oclb-title-text">${escapeHtml(titleText)}</span>
        </div>
        <hr class="hb-oclb-divider">
        <div class="hb-oclb-line hb-oclb-error hb-oclb-warn">
            <span>No badges available</span>
            <span>0</span>
        </div>
        <hr class="hb-oclb-divider">
        <div class="hb-warning-message">
            Have you Installed <a href="${escapeHtml(installUrl)}" target="_blank">${escapeHtml(installText)}</a>?
        </div>`;
}

function hideZeroWarning() {
    isShowingZeroWarning = false;
    if (panel) panel.classList.remove('hb-warning');
    update();
}

function updateIconForMode() {
    if (!icon) return;
    icon.src = cakeMode ? CAKE_ICON : LLAMA_ICON;
}

function setupObserver() {
    observer = new MutationObserver(function(mutations) {
        let needsRecreate = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const body = document.body || document.documentElement;
                const hasDarkClass = body.classList.contains('theme-dark');
                const currentPanel = document.getElementById('hb-oclb-icon');
                if (currentPanel) {
                    const computed = window.getComputedStyle(currentPanel);
                    if ((hasDarkClass && computed.backgroundColor === 'rgb(245, 245, 245)') ||
                        (!hasDarkClass && computed.backgroundColor === 'rgb(30, 30, 30)')) {
                        needsRecreate = true;
                    }
                }
            }
        });
        if (needsRecreate) {
            if (panel) { panel.remove(); panel = null; }
            setTimeout(create, 100);
        }
    });

    const targetNode = document.body || document.documentElement;
    if (targetNode) {
        observer.observe(targetNode, { attributes: true, attributeFilter: ['class', 'style'] });
    }
}

let spamObserverActive = false;
let hasRecordedCurrentSpam = false;

function setupSpamMonitor() {
    if (spamObserverActive) return;
    spamObserverActive = true;

    setInterval(function() {
        const spamCount = getElementsLength(getSpamSelector());
        if (spamCount > 0 && !hasRecordedCurrentSpam) {
            if (!active && !stopAuto) {
                hasRecordedCurrentSpam = true;
                recordSpamTrigger();
                setTimeout(function() {
                    if (getElementsLength(getSpamSelector()) === 0) {
                        hasRecordedCurrentSpam = false;
                    }
                }, 1000);
            }
        } else if (spamCount === 0) {
            hasRecordedCurrentSpam = false;
        }
    }, 2000);
}

function waitForUsernameAndInit() {
    let attempts = 0;
    const maxAttempts = 50;

    const checkInterval = setInterval(function() {
        attempts++;
        const username = getLoggedInUsername();

        if (username || attempts >= maxAttempts) {
            clearInterval(checkInterval);
            if (username) {
                currentUsername = username;
            }
            loadAllData();
            scheduleNextExpiry();
            if (document.body) {
                setTimeout(function() { create(); update(); }, 200);
            }
        }
    }, 100);
}

function init() {
    const waitForBody = setInterval(function() {
        if (document.body) {
            clearInterval(waitForBody);
            waitForUsernameAndInit();
            setupObserver();
            setupSpamMonitor();
        }
    }, 50);
}

window.addEventListener("message", function(e) {
    if (typeof e.data === "string" && e.data.includes("oclb")) update();
});

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

setInterval(function() {
    if (!panel) {
        if (document.body) create();
    } else {
        updatePanelPosition();
        if (!isShowingZeroWarning) update();
    }
}, 1500);

document.addEventListener('keydown', function(ev) {
    if (ev.key === 'Shift') window._hbShiftHeld = true;
});

document.addEventListener('keyup', function(ev) {
    if (ev.key === 'Shift') window._hbShiftHeld = false;
});

function stopCurrentMode() {
    active = 0;
    stopAuto = 1;
    isShowingZeroWarning = false;
    fastMode = false;
    if (currentInterval) { clearTimeout(currentInterval); currentInterval = null; }
    update();
}

function tryBulk() {
    const giveButtons = document.querySelectorAll(getGiveSelector());
    if (giveButtons.length === 0) {
        const hasAnyOccbElements = document.querySelectorAll('.occb-give, .oclb-give, .occb-giving, .oclb-giving, .occb-spam, .oclb-spam').length > 0;
        if (!hasAnyOccbElements && !isShowingZeroWarning) {
            showZeroBadgeWarning();
        }
        return;
    }

    fastMode = window._hbShiftHeld;

    if (spamWaitUntil > 0 && Date.now() < spamWaitUntil) {
        stopAuto = 1;
        active = 0;
        update();
        return;
    }

    if (spamWaitUntil > 0) {
        spamWaitUntil = 0;
        saveSpamTimer();
    }

    if (getElementsLength(getSpamSelector()) > 0) {
        recordSpamTrigger();
        if (spamWaitUntil === 0) {
            const minutes = adjustSpamCooldown();
            spamWaitUntil = Date.now() + (minutes * 60 * 1000);
            saveSpamTimer();
        }
        stopAuto = 1;
        active = 0;
        update();
        return;
    }

    stopAuto = 0;
    active = 1;
    saveSpamTimer();
    update();

    const g = getFirstElement(getGiveSelector());
    if (g) {
        bulk();
    } else {
        setTimeout(function() {
            update();
            if (getFirstElement(getGiveSelector())) bulk();
        }, 800);
    }
}

function bulk() {
    const giveButtons = document.querySelectorAll(getGiveSelector());
    if (giveButtons.length === 0) {
        active = 0;
        update();
        return;
    }

    if (spamWaitUntil > 0 && Date.now() < spamWaitUntil) {
        stopAuto = 1;
        active = 0;
        update();
        return;
    }

    if (getElementsLength(getSpamSelector()) > 0) {
        recordSpamTrigger();
        tryBulk();
        return;
    }

    const g = getFirstElement(getGiveSelector());
    if (!g) {
        active = 0;
        update();
        return;
    }

    active = 1;
    g.click();
    recordSentBadge();
    update();

    const delay = fastMode ? 100 : 500;
    currentInterval = setTimeout(bulk, delay);
}

function update() {
    if (!panel || !count || !label || isShowingZeroWarning) return;

    const g = getElementsLength(getGiveSelector());
    const gv = getElementsLength(getGivingSelector());
    const e = getElementsLength(getErrorSelector());
    const s = getElementsLength(getSpamSelector());

    let displayCount = g;
    let isSpamCountdown = false;

    if (spamWaitUntil > 0) {
        const remainingMs = spamWaitUntil - Date.now();
        if (remainingMs > 0) {
            const minutes = Math.floor(remainingMs / 60000);
            const seconds = Math.floor((remainingMs % 60000) / 1000);
            displayCount = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
            isSpamCountdown = true;
        } else {
            spamWaitUntil = 0;
            stopAuto = 0;
            active = 0;
            saveSpamTimer();
            if (currentInterval) {
                clearTimeout(currentInterval);
                currentInterval = null;
            }
        }
    }

    count.classList.remove('hb-count-spam', 'hb-count-normal', 'hb-count-zero');
    if (isSpamCountdown) count.classList.add('hb-count-spam');
    else if (g === 0 && !gv && !s && !e) count.classList.add('hb-count-zero');
    else count.classList.add('hb-count-normal');

    const displayCountStr = String(displayCount);
    if (count.innerHTML !== displayCountStr) count.innerHTML = displayCountStr;

    const sentPastHour = getSentCount();
    const externalTriggers = getSpamTriggerCount();

    const currentState = `${g}|${gv}|${s}|${e}|${sentPastHour}|${externalTriggers}|${cakeMode}|${stopAuto}|${active}`;
    if (label._lastState === currentState) return;
    label._lastState = currentState;

    const titleText = cakeMode ? "OCCB Helper" : "OCLB Helper";
    const lineLabel = cakeMode ? "+Cake" : "+Llama";
    const modeIconSrc = cakeMode ? LLAMA_ICON : CAKE_ICON;
    const modeIconHtml = '<img src="' + modeIconSrc + '" class="hb-oclb-mode-icon" id="hb-oclb-mode-icon" alt="Switch mode">';

    let html = `
        <div id="hb-oclb-title-container">
            <span class="hb-oclb-title-text">${escapeHtml(titleText)}</span>
            <span>${modeIconHtml}</span>
        </div>`;

    const hasButtons = g > 0 || gv > 0 || s > 0 || e > 0;

    if (!hasButtons) {
        html += `
        <hr class="hb-oclb-divider">
        ${divLine(lineLabel, "0", "hb-oclb-accent")}
        ${divLine("Sent last 60m", sentPastHour, "hb-oclb-accent")}
        ${divLine("Spam last 60m", externalTriggers, externalTriggers > 0 ? "hb-oclb-error" : "hb-oclb-accent")}
        <hr class="hb-oclb-divider">`;
    } else {
        html += `
        <hr class="hb-oclb-divider">
        ${divLine(lineLabel, g, "hb-oclb-accent")}
        ${divLine("Giving…", gv, "hb-oclb-giving")}`;

        if (s > 0) html += divLine("Spam", s, "hb-oclb-error hb-oclb-warn");
        if (e > 0) html += divLine("Error", e, "hb-oclb-warn");

        html += `${divLine("Sent last 60m", sentPastHour, "hb-oclb-accent")}
        ${divLine("Spam last 60m", externalTriggers, externalTriggers > 0 ? "hb-oclb-error" : "hb-oclb-accent")}
        <hr class="hb-oclb-divider">`;
    }

    label.innerHTML = html;

    setTimeout(function() {
        const modeIcon = document.getElementById("hb-oclb-mode-icon");
        if (modeIcon) {
            modeIcon.onclick = function(ev) {
                ev.preventDefault();
                ev.stopPropagation();

                const wasStopped = stopAuto === 1;
                const wasActive = active === 1;

                stopCurrentMode();
                cakeMode = cakeMode ? 0 : 1;
                GM_setValue("hb_oclb_cakeMode", cakeMode);
                updateIconForMode();
                label._lastState = null;

                setTimeout(function() {
                    if (wasStopped && spamWaitUntil > 0 && Date.now() < spamWaitUntil) {
                        stopAuto = 1;
                        active = 0;
                    } else {
                        active = 0;
                        stopAuto = 0;
                    }
                    update();
                }, 200);
            };
        }
    }, 0);

    panel.classList.remove("hb-oclb-active", "hb-oclb-stopped");
    if (isSpamCountdown) {
        panel.classList.add("hb-oclb-stopped");
    } else if (active) {
        panel.classList.add("hb-oclb-active");
    } else if (stopAuto) {
        panel.classList.add("hb-oclb-stopped");
    }

    if (!active && !stopAuto && !isSpamCountdown && window.location.search.includes("hb_oclbh")) {
        setTimeout(bulk, 1000);
    }
}

function grow() {
    if (!panel || isShowingZeroWarning) return;
    panel.style.setProperty('transition', 'none', 'important');
    panel.classList.add('hb-hovering');
    setTimeout(function() { panel.style.removeProperty('transition'); }, 50);
}

function shrink() {
    if (!panel || isShowingZeroWarning) return;
    panel.style.setProperty('transition', 'none', 'important');
    panel.classList.remove('hb-hovering');
    setTimeout(function() { panel.style.removeProperty('transition'); }, 50);
}

document.addEventListener('click', function(ev) {
    if (isShowingZeroWarning && panel && !panel.contains(ev.target)) {
        hideZeroWarning();
    }
}, true);

document.addEventListener('keydown', function(ev) {
    if (isShowingZeroWarning && ev.key === 'Escape') {
        hideZeroWarning();
    }
});
