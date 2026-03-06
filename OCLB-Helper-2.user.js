// ==UserScript==
// @name            OCLB Helper 2
// @namespace       http://hampshirebrony.neocities.org
// @description     Augments Kishan Bagaria's One Click Llama Button | Modernized Fork
// @author          Liamb135 | Original Author: HampshireBrony
// @version         1.4
// @icon            https://kishan.org/-/oclb.png
// @match           *://*.deviantart.com/*
// @require         https://code.jquery.com/jquery-3.7.1.min.js
// @run-at          document-end
// @grant           GM_addStyle
// @grant           GM_getValue
// @grant           GM_setValue
// @downloadURL     https://raw.githubusercontent.com/Liamb135/OCLB-Helper-2/master/OCLB-Helper-2.user.js
// @updateURL       https://raw.githubusercontent.com/Liamb135/OCLB-Helper-2/master/OCLB-Helper-2.user.js
// ==/UserScript==

if (window.top !== window.self) return;

/* ==========================================================================
   Section 1: GM_addStyle CSS
   ========================================================================== */

GM_addStyle(`
    #hb-oclb-icon {
        --panel-bg: var(--g-bg-tertiary, #f5f5f5);
        --panel-text: var(--g-typography-primary, #222);
        --panel-border: var(--g-stroke-default, #bbb);
        --accent: var(--g-brand, #00886c);
        --error: var(--g-error-primary, #ff5555);

        position: fixed !important;
        bottom: 16px !important;
        right: 16px !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-end !important;
        justify-content: flex-end !important;
        gap: 6px !important;
        background: var(--panel-bg) !important;
        border: 1px solid var(--panel-border) !important;
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
        color: var(--panel-text) !important;
    }

    #hb-oclb-icon.hb-messages-page { bottom: 190px !important; }

    body.theme-dark #hb-oclb-icon {
        --panel-bg: var(--g-bg-tertiary, #1e1e1e);
        --panel-text: var(--g-typography-primary, #e0e0e0);
        --panel-border: var(--g-stroke-default, #555);
    }

    #hb-oclb-icon.hb-hovering {
        justify-content: space-between !important;
        align-items: flex-end !important;
        padding: 12px !important;
        max-width: 300px !important;
    }

    #hb-oclb-icon.hb-hovering #hb-oclb-label {
        display: flex !important;
    }

    #hb-oclb-icon.hb-hovering #hb-oclb-bottom {
        margin-top: 8px !important;
    }

    #hb-oclb-icon.hb-hovering #hb-oclb-image {
        width: 36px !important;
        height: 43px !important;
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
        color: var(--accent) !important;
        font-size: inherit !important;
    }

    #hb-oclb-count.hb-count-spam {
        color: var(--error) !important;
        font-weight: 700 !important;
    }

    #hb-oclb-count.hb-count-normal {
        color: var(--accent) !important;
        font-weight: 600 !important;
    }

    #hb-oclb-image {
        width: 30px !important;
        height: 36px !important;
        image-rendering: pixelated !important;
        transition: width .15s ease, height .15s ease !important;
    }

    .hb-oclb-title {
        font-weight: 700 !important;
        text-align: center !important;
        color: var(--accent) !important;
        margin-bottom: 6px !important;
        width: 100% !important;
    }

   .hb-oclb-divider {
        width: 100% !important;
        border: none !important;
        border-top: 1px solid var(--g-typography-secondary, #666) !important;
        margin: 4px 0 8px 0 !important;
    }
    body.theme-dark .hb-oclb-divider { border-top-color: var(--g-typography-secondary, #333) !important;
    }
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

    .hb-oclb-accent { color: var(--accent) !important; }
    .hb-oclb-giving { color: var(--g-typography-secondary, #666) !important; }
    .hb-oclb-error { color: var(--error) !important; }
    .hb-oclb-warn {
        color: var(--error) !important;
        animation: hb-pulse 1.2s infinite !important;
    }

    @keyframes hb-pulse {
        0%, 100% { opacity: 0.4 !important; }
        50% { opacity: 1 !important; }
    }

    #hb-oclb-icon.hb-oclb-active,
    #hb-oclb-icon.hb-oclb-active:hover,
    #hb-oclb-icon.hb-oclb-active.hb-messages-page {
        border-color: var(--accent) !important;
        box-shadow: 0 0 0 2px var(--accent) !important;
    }

    #hb-oclb-icon.hb-oclb-stopped,
    #hb-oclb-icon.hb-oclb-stopped:hover,
    #hb-oclb-icon.hb-oclb-stopped.hb-messages-page {
        border-color: var(--error) !important;
        box-shadow: 0 0 0 2px var(--error) !important;
    }

    body:has([href*="/messages"]) #hb-oclb-icon.hb-messages-page {
        bottom: 190px !important;
    }
`);

/* ==========================================================================
   Section 2: Constants
   ========================================================================== */

let active = 0,
    stopAuto = 0,
    spamWaitUntil = 0,
    panel,
    label,
    count,
    bottomBar,
    icon,
    observer;

const $ = window.jQuery;
const STORAGE_KEY = 'hb_oclb_spamWaitUntil';

const make = (t, i) => {
    const e = document.createElement(t);
    if (i) e.id = i;
    return e;
};

const divLine = (k, v, c = "") => `
    <div class="hb-oclb-line ${c}">
        <span>${k}</span>
        <span>${v}</span>
    </div>`;

function saveSpamTimer() {
    GM_setValue(STORAGE_KEY, spamWaitUntil);
}

function loadSpamTimer() {
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
    clearTimeout(window.hbPositionTimeout);
    window.hbPositionTimeout = setTimeout(() => {
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
    panel.onclick = tryBulk;
    panel.onmouseover = grow;
    panel.onmouseleave = shrink;

    label = make("div", "hb-oclb-label");
    panel.appendChild(label);

    bottomBar = make("div", "hb-oclb-bottom");
    panel.appendChild(bottomBar);

    count = make("span", "hb-oclb-count");
    bottomBar.appendChild(count);

    icon = make("img", "hb-oclb-image");
    icon.src = "data:image/gif;base64,R0lGODlhHgAkAPQaAOzJYi4kHEonDV0xDVkrFlUyEl0yEHFFLmNjPHV1Pnx8SpRPC5VgLrFtJ8JaKtGMJdGBKdWUNOOKJOqpJuqwNO+pQu6oQ/jGRAAAAPbhbv///wAAAAAAAAAAAAAAAAAAACH5BAUAABoALAAAAAAeACQAQAX/oCZqQYCd2KhqgmAYYvuKKFZmWVmeantdL1xrRdQUjshja7GAQCqVWVF0ZDAcDivWan08LBbpVFRKJEoKRYkcSK9JulvmFO8JKBQcfriqvYktDQ1MUHxERwAAEhJOi4ENTk5eUGJFJQQEBweYTCVMmH8jJzihMQJQEREtqKoCoziwsTwjLQMDeC+GI3KltAJMOD+6Y0VLTU9RMGOIic2Jj5IPExPDGkxaWVzaXV4PUExTTFtX2ePT3wvEbAgIJexv7u0B6rtxOmx1KzsoUzLK/kRe9VpVIRVBgwLsBcBB554vPHoo8HkVS1YKX7ZwGZiIgpeOWaZ+BMlQzWO/XwuCZl2o5mdeMQGCCFWoRs8UEyeUlBFLksQYzmQ7CzhzBg2Cl2nVmC1qJKFotJxErpHbtq2btwrgilSZypUbmEpRF4wbm+0c1nTqLmXaRKBTgE8EehGJR9dlXXplzrRRY3evXEsK++YLAQA7";
    bottomBar.appendChild(icon);

    document.body.appendChild(panel);
}

/* ==========================================================================
   Section 5: Event Listeners & Init
   ========================================================================== */

function setupObserver() {
    observer = new MutationObserver((mutations) => {
        let needsRecreate = false;

        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const body = document.body || document.documentElement;
                const hasDarkClass = body.classList.contains('theme-dark');
                const currentPanel = document.getElementById('hb-oclb-icon');

                if (currentPanel) {
                    const computed = getComputedStyle(currentPanel);
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

    observer.observe(document.body || document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'style']
    });
}

function init() {
    const waitForBody = setInterval(() => {
        if (document.body) {
            clearInterval(waitForBody);
            loadSpamTimer();
            setTimeout(() => {
                create();
                check();
            }, 200);
            setupObserver();
        }
    }, 50);
}

window.addEventListener("message", e => {
    if (typeof e.data === "string" && e.data.includes("oclb")) check();
});

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

setInterval(() => {
    if (!panel) create();
    else {
        updatePanelPosition();
        check();
    }
}, 1500);

/* ==========================================================================
   Section 6: Llama Automation
   ========================================================================== */

function tryBulk() {
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

    if ($(".oclb-spam").length > 0) {
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
    active = 0;
    saveSpamTimer();
    check();

    const g = $(".oclb-give");
    if (g.length) {
        bulk();
    } else {
        setTimeout(() => {
            check();
            if ($(".oclb-give").length) bulk();
        }, 800);
    }
}

function bulk() {
    if (spamWaitUntil > 0 && Date.now() < spamWaitUntil) {
        stopAuto = 1;
        active = 0;
        check();
        return;
    }

    if ($(".oclb-spam").length > 0) {
        tryBulk();
        return;
    }

    const g = $(".oclb-give");
    if (g.length === 0) {
        active = 0;
        check();
        return;
    }

    active = 1;
    g.first().click();
    check();
    setTimeout(bulk, 500);
}

/* ==========================================================================
   Section 7: Status Display
   ========================================================================== */

function check() {
    if (!panel || !count || !label) return;

    const g = $(".oclb-give").length,
        gv = $(".oclb-giving").length,
        e = $(".oclb.oclb-error, .oclb-error").length,
        s = $(".oclb-spam").length;

    let displayCount = g;
    let isSpamCountdown = false;

    if (spamWaitUntil > 0) {
        const remainingMs = spamWaitUntil - Date.now();
        if (remainingMs > 0) {
            const minutes = Math.floor(remainingMs / 60000);
            const seconds = Math.floor((remainingMs % 60000) / 1000);
            displayCount = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            isSpamCountdown = true;
        } else {
            spamWaitUntil = 0;
            stopAuto = 0;
            saveSpamTimer();
        }
    }

    if (isSpamCountdown) {
        count.classList.add('hb-count-spam');
        count.classList.remove('hb-count-normal');
    } else {
        count.classList.add('hb-count-normal');
        count.classList.remove('hb-count-spam');
    }

    if (count.innerHTML !== displayCount) {
        count.innerHTML = displayCount;
    }

    let html = `
        <div class="hb-oclb-title">OCLB Helper</div>
        <hr class="hb-oclb-divider">
        ${divLine("+Llama", g, "hb-oclb-accent")}
        ${divLine("Giving…", gv, "hb-oclb-giving")}`;

    if (s > 0) html += divLine("Spam", s, "hb-oclb-error hb-oclb-warn");
    if (e > 0) html += divLine("Error", e, "hb-oclb-warn");

    html += `<hr class="hb-oclb-divider">`;

    label.innerHTML = html;

    if (stopAuto) {
        panel.classList.add("hb-oclb-stopped");
        panel.classList.remove("hb-oclb-active");
    } else if (active) {
        panel.classList.add("hb-oclb-active");
        panel.classList.remove("hb-oclb-stopped");
    } else {
        panel.classList.remove("hb-oclb-active", "hb-oclb-stopped");
    }

    if (!active && !stopAuto && window.location.search.includes("hb_oclbh")) {
        setTimeout(bulk, 1000);
    }
}

/* ==========================================================================
   Section 8: Panel Interactions
   ========================================================================== */

function grow() {
    if (!panel) return;
    panel.style.setProperty('transition', 'none', 'important');
    panel.classList.add('hb-hovering');
    setTimeout(() => {
        panel.style.removeProperty('transition');
    }, 50);
}

function shrink() {
    if (!panel) return;
    panel.style.setProperty('transition', 'none', 'important');
    panel.classList.remove('hb-hovering');
    setTimeout(() => {
        panel.style.removeProperty('transition');
    }, 50);
}
