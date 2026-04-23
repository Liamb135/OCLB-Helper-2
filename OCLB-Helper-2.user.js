// ==UserScript==
// @name            OCLB Helper 2
// @namespace       http://hampshirebrony.neocities.org/
// @description     Augments Kishan Bagaria's One Click Llama Button & Liamb135's One Click Cake Button
// @author          Liamb135 | Original Author: HampshireBrony
// @version         1.5.1-testing.1
// @icon            https://kishan.org/-/oclb.png
// @match           *://*.deviantart.com/*
// @run-at          document-end
// @grant           GM_addStyle
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_listValues
// @downloadURL     https://raw.githubusercontent.com/Liamb135/OCLB-Helper-2/testing/OCLB-Helper-2.user.js
// @updateURL       https://raw.githubusercontent.com/Liamb135/OCLB-Helper-2/master/OCLB-Helper-2.user.js
// ==/UserScript==

if (window.top !== window.self) return;

/* ==========================================================================
   Section 1: GM_addStyle CSS
   ========================================================================== */

GM_addStyle(`
    #hb-oclb-icon {
        position: fixed !important;
        bottom: 16px !important;
        right: 16px !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-end !important;
        justify-content: flex-end !important;
        gap: 6px !important;
        background: var(--g-bg-tertiary, #f5f5f5) !important;
        border: 1px solid var(--g-stroke-default, #bbb) !important;
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
        color: var(--g-typography-primary, #222) !important;
    }

    #hb-oclb-icon.hb-messages-page { bottom: 190px !important; }

    body.theme-dark #hb-oclb-icon {
        background: var(--g-bg-tertiary, #1e1e1e) !important;
        color: var(--g-typography-primary, #e0e0e0) !important;
        border-color: var(--g-stroke-default, #555) !important;
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
        color: var(--g-brand, #00886c) !important;
        font-size: inherit !important;
    }

    #hb-oclb-count.hb-count-spam {
        color: var(--g-error-primary, #ff5555) !important;
        font-weight: 700 !important;
    }

    #hb-oclb-count.hb-count-normal {
        color: var(--g-brand, #00886c) !important;
        font-weight: 600 !important;
    }

    #hb-oclb-count.hb-count-zero {
        color: var(--g-error-primary, #ff5555) !important;
        font-weight: 600 !important;
    }

    #hb-oclb-image, .hb-oclb-mode-icon {
        image-rendering: pixelated !important;
        image-rendering: -moz-crisp-edges !important;
        image-rendering: crisp-edges !important;
        image-rendering: -webkit-optimize-contrast !important;
        object-fit: contain !important;
        object-position: center !important;
        cursor: pointer !important;
        opacity: 0.8 !important;
        transition: all 0.2s ease !important;
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

    #hb-oclb-icon.hb-hovering #hb-oclb-image,
    #hb-oclb-icon.hb-warning #hb-oclb-image {
        width: 40px !important;
        height: 36px !important;
    }

    .hb-oclb-mode-icon {
        width: 20px !important;
        height: 18px !important;
        max-height: 18px !important;
    }

    #hb-oclb-image:hover, .hb-oclb-mode-icon:hover {
        opacity: 1 !important;
        transform: scale(1.1) !important;
    }

    #hb-oclb-title-container {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        width: 100% !important;
        font-weight: 700 !important;
        color: var(--g-brand, #00886c) !important;
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
        border-top: 1px solid var(--g-typography-secondary, #666) !important;
        margin: 4px 0 8px 0 !important;
    }
    body.theme-dark .hb-oclb-divider { border-top-color: var(--g-typography-secondary, #333) !important; }
    .hb-oclb-divider:last-of-type { margin: 3px 0 0 0 !important; }

    .hb-oclb-line {
        display: flex !important;
        align-items: center !important;
        line-height: 1.4 !important;
        margin-bottom: 4px !important;
        width: 100% !important;
        color: inherit !important;
        font-size: inherit !important;
    }
    .hb-oclb-line span:first-child { flex: 0 0 auto !important; }
    .hb-oclb-line span:last-child { flex: 1 !important; text-align: right !important; }

    .hb-oclb-accent { color: var(--g-brand, #00886c) !important; }
    .hb-oclb-giving { color: var(--g-typography-secondary, #666) !important; }
    .hb-oclb-error { color: var(--g-error-primary, #ff5555) !important; }
    .hb-oclb-warn {
        color: var(--g-error-primary, #ff5555) !important;
        animation: hb-pulse 1.2s infinite !important;
    }

    @keyframes hb-pulse {
        0%, 100% { opacity: 0.4 !important; }
        50% { opacity: 1 !important; }
    }

    #hb-oclb-icon.hb-oclb-active,
    #hb-oclb-icon.hb-oclb-active:hover,
    #hb-oclb-icon.hb-oclb-active.hb-messages-page {
        border-color: var(--g-brand, #00886c) !important;
        box-shadow: 0 0 0 2px var(--g-brand, #00886c) !important;
    }

    #hb-oclb-icon.hb-oclb-stopped,
    #hb-oclb-icon.hb-oclb-stopped:hover,
    #hb-oclb-icon.hb-oclb-stopped.hb-messages-page {
        border-color: var(--g-error-primary, #ff5555) !important;
        box-shadow: 0 0 0 2px var(--g-error-primary, #ff5555) !important;
    }

    .hb-missing-script-notice {
        background: var(--g-error-primary, #ff5555) !important;
        color: white !important;
        padding: 12px !important;
        border-radius: 8px !important;
        margin: 8px 0 !important;
        text-align: center !important;
        font-weight: 600 !important;
        box-shadow: 0 2px 8px rgba(255,85,85,0.3) !important;
    }

    .hb-warning-message {
        font-size: 12px !important;
        color: var(--g-error-primary, #ff5555) !important;
        text-align: center !important;
        padding: 6px 0 !important;
        font-weight: 500 !important;
        line-height: 1.3 !important;
    }

    .hb-warning-message a {
        color: #fff !important;
        text-decoration: underline !important;
        font-weight: bold !important;
        background: rgba(0,0,0,0.2) !important;
        padding: 2px 6px !important;
        border-radius: 4px !important;
        display: inline-block !important;
        margin-top: 4px !important;
    }

    body.theme-dark .hb-warning-message a {
        color: #ffddaa !important;
        background: rgba(255,255,255,0.1) !important;
    }
`);

/* ==========================================================================
   Section 2: Constants & Container-Aware Storage
   ========================================================================== */

let active = 0,
    stopAuto = 0,
    spamWaitUntil = 0,
    panel,
    label,
    count,
    bottomBar,
    icon,
    observer,
    currentInterval = null,
    isShowingZeroWarning = false;

let cakeMode = GM_getValue("hb_oclb_cakeMode", 0);

let STORAGE_KEY;

const LLAMA_ICON = "data:image/gif;base64,R0lGODlhHgAkAPQaAOzJYi4kHEonDV0xDVkrFlUyEl0yEHFFLmNjPHV1Pnx8SpRPC5VgLrFtJ8JaKtGMJdGBKdWUNOOKJOqpJuqwNO+pQu6oQ/jGRAAAAPbhbv///wAAAAAAAAAAAAAAAAAAACH5BAUAABoALAAAAAAeACQAQAX/oCZqQYCd2KhqgmAYYvuKKFZmWVmeantdL1xrRdQUjshja7GAQCqVWVF0ZDAcDivWan08LBbpVFRKJEoKRYkcSK9JulvmFO8JKBQcfriqvYktDQ1MUHxERwAAEhJOi4ENTk5eUGJFJQQEBweYTCVMmH8jJzihMQJQEREtqKoCoziwsTwjLQMDeC+GI3KltAJMOD+6Y0VLTU9RMGOIic2Jj5IPExPDGkxaWVzaXV4PUExTTFtX2ePT3wvEbAgIJexv7u0B6rtxOmx1KzsoUzLK/kRe9VpVIRVBgwLsBcBB554vPHoo8HkVS1YKX7ZwGZiIgpeOWaZ+BMlQzWO/XwuCZl2o5mdeMQGCCFWoRs8UEyeUlBFLksQYzmQ7CzhzBg2Cl2nVmC1qJKFotJxErpHbtq2btwrgilSZypUbmEpRF4wbm+0c1nTqLmXaRKBTgE8EehGJR9dlXXplzrRRY3evXEsK++YLAQA7";
const CAKE_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAkCAYAAAD7PHgWAAAACXBIWXMAAAsTAAALEwEAmpwYAAACgUlEQVRYheWXu28TQRCHvzvHjh+xIwMKDY8GhCvTofT8B0gRoQA6UITEo0FYDhIVCFcICRBtGpwUlqCgo6NASBRxAZGCJUgoAlLAAttg7NxR7G3ILpfgO4f4bH7V7dzuzPjz7syeYds2G3X08H4boPz2g2K3bdugBzJ7EdSLhnSDJNd4fxGA8eMlX46/PTxmAyTPv+yKfPAJyj0nlT20T5kgierz5heXXclIctHsHmXsl2TwCep7Tpdujx+825FjIxMXD2X/yUE/EJQPkozcgy+enQA6P8WTp8dsgPFdCQAWXl0CIPN6GoDLPhMMPkG9Q+inVWqzUyvJFQo3AbAsYT9XegrAtat5AE6d2evq99HMxy1Pd+AJGnovNgzDtS7qBHVyleUiAKaz/OydIwDM5ZcASKfU+ip1PVeScRW7JNt/BP8muZcKt8Wpf/PuvvI+HAoDv0nGEjEAhqPCjhZvJHrANc50blb48ZRdD+SZ4IXJrA0wcSUJwE9LlNLKYk2ZN5oU9XAoHOoqwcAT/OM+2KlMU5y6laWvAEydvKW8/1JtAJBOhdWFoYQytFqflXGtXgegOPdYxPGb4E7JN8FN1a4AkB5xxk5nWfkk9ujYbsHEDDm3nbWGsrxZryrjwSUYGfb222SjWCfXoQaPoOmgMNZU+4PZ/LYk1Kx9ByBORsTbFq//UJ4JWk7nicTUDjE1cUO8t5pbrretNgCG6R76/6mDrbalGkynY7QWXOe3Wz9c7ZGI+k80HYLrbv2lt3PyTbBRb7vaV1erAIymomqgsBjrddDSOomuwSUobzNSM09yXSezUfPPRaENPEHPN2opebOWkh3G8ulP171iuT++6n4BCC7IlM3hyj0AAAAASUVORK5CYII=";

const OCCB_URL = "https://raw.githubusercontent.com/Liamb135/OCCB/master/OCCB.user.js";
const OCLB_URL = "https://raw.githubusercontent.com/KishanBagaria/OCLB/master/OCLB.user.js";

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

function select(selector) {
    return document.querySelector(selector);
}

function selectAll(selector) {
    return document.querySelectorAll(selector);
}

function getElementsLength(selector) {
    return selectAll(selector).length;
}

function getFirstElement(selector) {
    return select(selector);
}

function removeElements(selector) {
    selectAll(selector).forEach(el => el.remove());
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
    return cakeMode ?
        ".occb.occb-error, .occb-error" :
        ".oclb.oclb-error, .oclb-error";
}

function clearAllCounters() {
    const allSelectors = [
        '.occb-give', '.oclb-give',
        '.occb-giving', '.oclb-giving',
        '.occb-spam', '.oclb-spam',
        '.occb.occb-error, .occb-error',
        '.oclb.oclb-error, .oclb-error'
    ];

    allSelectors.forEach(selector => {
        removeElements(selector);
    });
}

function checkRequiredScript() {
    const giveSelector = getGiveSelector();
    if (getElementsLength(giveSelector) === 0) {
        clearAllCounters();
        return false;
    }
    return true;
}

/* ==========================================================================
   Section 2b: Container key
   ========================================================================== */

function getContainerKey() {
    let containerKey = localStorage.getItem("hb_oclb_containerKey");
    if (!containerKey) {
        containerKey = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
        localStorage.setItem("hb_oclb_containerKey", containerKey);
    }
    return containerKey;
}

function saveSpamTimer() {
    const containerKey = getContainerKey();
    const key = `hb_oclb_spamWaitUntil_${containerKey}`;
    GM_setValue(key, spamWaitUntil);
}

function loadSpamTimer() {
    const containerKey = getContainerKey();
    STORAGE_KEY = `hb_oclb_spamWaitUntil_${containerKey}`;
    const saved = GM_getValue(STORAGE_KEY, 0);
    if (saved > Date.now()) {
        spamWaitUntil = saved;
        stopAuto = 1;
    } else {
        GM_deleteValue(STORAGE_KEY);
    }
}

/* ==========================================================================
   Section 3: Messages Page Position
   ========================================================================== */

function updatePanelPosition() {
    if (!panel) return;

    const isMessagesPage = window.location.pathname.includes("/messages");
    if (window.hbPositionTimeout) {
        clearTimeout(window.hbPositionTimeout);
    }
    window.hbPositionTimeout = setTimeout(function() {
        if (isMessagesPage) {
            panel.classList.add("hb-messages-page");
        } else {
            panel.classList.remove("hb-messages-page");
        }
    }, 50);
}

/* ==========================================================================
   Section 4: Panel Creation
   ========================================================================== */

function create() {
    if (document.getElementById("hb-oclb-icon")) return;

    updatePanelPosition();

    panel = make("div", "hb-oclb-icon");

    panel.onclick = function(ev) {
        ev.stopPropagation();

        if (getElementsLength(getGiveSelector()) === 0 && !isShowingZeroWarning) {
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

    const html = `
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

    label.innerHTML = html;
}

function hideZeroWarning() {
    isShowingZeroWarning = false;
    if (panel) {
        panel.classList.remove('hb-warning');
    }
    check();
}

function updateIconForMode() {
    if (!icon) return;
    icon.src = cakeMode ? CAKE_ICON : LLAMA_ICON;
}

/* ==========================================================================
   Section 5: Event Listeners & Init
   ========================================================================== */

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
            if (panel) {
                panel.remove();
                panel = null;
            }
            setTimeout(create, 100);
        }
    });

    const targetNode = document.body || document.documentElement;
    if (targetNode) {
        observer.observe(targetNode, {
            attributes: true,
            attributeFilter: ['class', 'style']
        });
    }
}

function init() {
    const waitForBody = setInterval(function() {
        if (document.body) {
            clearInterval(waitForBody);
            loadSpamTimer();
            setTimeout(function() {
                create();
                check();
            }, 200);
            setupObserver();
        }
    }, 50);
}

window.addEventListener("message", function(e) {
    if (typeof e.data === "string" && e.data.includes("oclb")) check();
});

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

setInterval(function() {
    if (!panel) create();
    else {
        updatePanelPosition();
        if (!isShowingZeroWarning) {
            check();
        }
    }
}, 1500);

/* ==========================================================================
   Section 6: Llama/Cake Automation
   ========================================================================== */

function stopCurrentMode() {
    active = 0;
    stopAuto = 1;
    isShowingZeroWarning = false;

    if (currentInterval) {
        clearTimeout(currentInterval);
        currentInterval = null;
    }

    check();
}

function tryBulk() {
    if (!checkRequiredScript()) {
        return;
    }

    if (spamWaitUntil > 0 && Date.now() < spamWaitUntil) {
        stopAuto = 1;
        active = 0;
        check();
        return;
    }

    if (spamWaitUntil > 0) {
        spamWaitUntil = 0;
        saveSpamTimer();
    }

    if (getElementsLength(getSpamSelector()) > 0) {
        if (spamWaitUntil === 0) {
            const minutes = 10 + Math.floor(Math.random() * 11);
            spamWaitUntil = Date.now() + (minutes * 60 * 1000);
            saveSpamTimer();
        }
        stopAuto = 1;
        active = 0;
        check();
        return;
    }

    stopAuto = 0;
    active = 1;
    saveSpamTimer();
    check();

    const g = getFirstElement(getGiveSelector());
    if (g) {
        bulk();
    } else {
        setTimeout(function() {
            check();
            if (getFirstElement(getGiveSelector())) bulk();
        }, 800);
    }
}

function bulk() {
    if (!checkRequiredScript()) {
        active = 0;
        check();
        return;
    }

    if (spamWaitUntil > 0 && Date.now() < spamWaitUntil) {
        stopAuto = 1;
        active = 0;
        check();
        return;
    }

    if (getElementsLength(getSpamSelector()) > 0) {
        tryBulk();
        return;
    }

    const g = getFirstElement(getGiveSelector());
    if (!g) {
        active = 0;
        check();
        return;
    }

    active = 1;
    g.click();
    check();
    currentInterval = setTimeout(bulk, 500);
}

/* ==========================================================================
   Section 7: Status Display
   ========================================================================== */

function check() {
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
            saveSpamTimer();
        }
    }

    count.classList.remove('hb-count-spam', 'hb-count-normal', 'hb-count-zero');
    if (isSpamCountdown) {
        count.classList.add('hb-count-spam');
    } else if (g === 0) {
        count.classList.add('hb-count-zero');
    } else {
        count.classList.add('hb-count-normal');
    }

    const displayCountStr = String(displayCount);
    if (count.innerHTML !== displayCountStr) {
        count.innerHTML = displayCountStr;
    }

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
        ${divLine(lineLabel, "0", "hb-oclb-accent")}`;
    } else {
        html += `
        <hr class="hb-oclb-divider">
        ${divLine(lineLabel, g, "hb-oclb-accent")}
        ${divLine("Giving…", gv, "hb-oclb-giving")}`;

        if (s > 0) html += divLine("Spam", s, "hb-oclb-error hb-oclb-warn");
        if (e > 0) html += divLine("Error", e, "hb-oclb-warn");

        html += `<hr class="hb-oclb-divider">`;
    }

    label.innerHTML = html;

    setTimeout(function() {
        const modeIcon = document.getElementById("hb-oclb-mode-icon");
        if (modeIcon) {
            modeIcon.onclick = function(ev) {
                ev.preventDefault();
                ev.stopPropagation();

                stopCurrentMode();

                cakeMode = cakeMode ? 0 : 1;
                GM_setValue("hb_oclb_cakeMode", cakeMode);
                updateIconForMode();

                setTimeout(function() {
                    active = 0;
                    stopAuto = 0;
                    check();
                }, 200);
            };
        }
    }, 0);

    panel.classList.remove("hb-oclb-active", "hb-oclb-stopped");
    if (stopAuto) {
        panel.classList.add("hb-oclb-stopped");
    } else if (active) {
        panel.classList.add("hb-oclb-active");
    }

    if (!active && !stopAuto && window.location.search.includes("hb_oclbh")) {
        setTimeout(bulk, 1000);
    }
}

/* ==========================================================================
   Section 8: Panel Interactions
   ========================================================================== */

function grow() {
    if (!panel || isShowingZeroWarning) return;
    panel.style.setProperty('transition', 'none', 'important');
    panel.classList.add('hb-hovering');
    setTimeout(function() {
        panel.style.removeProperty('transition');
    }, 50);
}

function shrink() {
    if (!panel || isShowingZeroWarning) return;
    panel.style.setProperty('transition', 'none', 'important');
    panel.classList.remove('hb-hovering');
    setTimeout(function() {
        panel.style.removeProperty('transition');
    }, 50);
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
