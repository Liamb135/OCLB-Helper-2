// ==UserScript==
// @name            OCLB Helper 2
// @namespace       http://hampshirebrony.neocities.org
// @description     Augments Kishan Bagaria's One Click Llama Button | Modernized Fork
// @author          Liamb135 | Original Author: HampshireBrony
// @version         1.0
// @icon            https://kishan.org/-/oclb.png
// @match           *://*.deviantart.com/*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @run-at          document-end
// @downloadURL     https://raw.githubusercontent.com/Liamb135/OCLB-helper/master/OCLB-Helper-2.user.js
// @updateURL       https://raw.githubusercontent.com/Liamb135/OCLB-helper/master/OCLB-Helper-2.user.js
// ==/UserScript==

if (window.top !== window.self) return;

/* ==========================================================================
   Section 1: Constants
   Global variables and functions for GUI
   ========================================================================== */

let active = 0,
    stopAuto = 0,
    panel,
    label,
    count,
    bottomBar,
    icon,
    cache,
    themeVars;

const $ = window.jQuery;

const set = (e, s) => Object.assign(e.style, s);

const make = (t, i, s = "") => {
    const e = document.createElement(t);
    if (i) e.id = i;
    if (s) e.style.cssText = s;
    return e;
};

const divLine = (k, v, c, s) => `
    <div style="display:flex;justify-content:space-between;align-items:center;font-size:${s};line-height:1.4;margin-bottom:4px;gap:16px;">
        <span>${k}</span>
        <span${c ? ` style='color:${c};'` : ""}>${v}</span>
    </div>`;

/* ==========================================================================
   Section 2: Theme Detection
   Dark/light mode support
   ========================================================================== */

function theme() {
    const b = document.body;
    if (!b || !b.classList) return null;

    const r = document.querySelector(".surface.surface-primary") || b,
          t = document.querySelector(".surface-tertiary") || r,
          dark = b.classList.contains("theme-dark"),
          lg = b.classList.contains("light-green"),
          g = getComputedStyle(r),
          gt = getComputedStyle(t),
          accentBase = g["--g-accent"] || (dark ? "#00d4aa" : "#00886c"),
          accent = lg ? g["--g-card-bg-selected"] || accentBase : accentBase;

    return themeVars = {
        strokeSubtle: gt["--g-stroke-subtle"] || (dark ? "#333" : "#ddd"),
        strokeDefault: gt["--g-stroke-default"] || (dark ? "#555" : "#bbb"),
        text: g["--g-text"] || (dark ? "#e0e0e0" : "#222"),
        card: gt["--g-card-bg"] || (dark ? "#1e1e1e" : "#f5f5f5"),
        accent,
        font: g.fontFamily || "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif",
        size: g.fontSize || "14px"
    };
}

/* ==========================================================================
   Section 3: Panel Creation
   Creates the GUI
   ========================================================================== */

function updatePanelPosition() {
    if (!panel) return;

    const isMessagesPage = window.location.pathname.includes("/messages");
    const bottomOffset = isMessagesPage ? "190px" : "16px";

    if (panel.style.bottom !== bottomOffset) {
        panel.style.bottom = bottomOffset;
    }
}

function create() {
    if (document.getElementById("hb-oclb-icon")) return;
    const v = themeVars || theme();
    if (!v) return;

    updatePanelPosition();

    panel = make(
        "div",
        "hb-oclb-icon",
        `position:fixed;bottom:16px;right:16px;display:flex;flex-direction:column;align-items:flex-end;justify-content:flex-end;gap:6px;background:${v.card};border:1px solid ${v.strokeDefault};border-radius:12px;padding:8px 10px;z-index:99999;cursor:pointer;transition:all .2s ease;font-family:${v.font};font-size:${v.size};overflow:hidden;box-sizing:border-box;max-width:260px;min-height:48px;`
    );

    panel.onclick = tryBulk;
    panel.onmouseover = grow;
    panel.onmouseleave = shrink;

    label = make(
        "div",
        "hb-oclb-label",
        `display:none;flex-direction:column;align-items:flex-start;width:100%;box-sizing:border-box;font-size:${v.size};line-height:1.4;color:${v.text};text-align:left;white-space:normal;word-break:break-word;`
    );
    panel.appendChild(label);

    bottomBar = make(
        "div",
        "hb-oclb-bottom",
        `display:flex;align-items:center;justify-content:flex-end;width:100%;gap:8px;box-sizing:border-box;`
    );
    panel.appendChild(bottomBar);

    count = make(
        "span",
        "hb-oclb-count",
        `font-weight:600;font-size:${v.size};color:${v.accent};`
    );
    bottomBar.appendChild(count);

    icon = make(
        "img",
        "hb-oclb-image",
        "width:30px;height:36px;image-rendering:pixelated;image-rendering:crisp-edges;transition:width .15s ease, height .15s ease;"
    );
    icon.src = "data:image/gif;base64,R0lGODlhHgAkAPQaAOzJYi4kHEonDV0xDVkrFlUyEl0yEHFFLmNjPHV1Pnx8SpRPC5VgLrFtJ8JaKtGMJdGBKdWUNOOKJOqpJuqwNO+pQu6oQ/jGRAAAAPbhbv///wAAAAAAAAAAAAAAAAAAACH5BAUAABoALAAAAAAeACQAQAX/oCZqQYCd2KhqgmAYYvuKKFZmWVmeantdL1xrRdQUjshja7GAQCqVWVF0ZDAcDivWan08LBbpVFRKJEoKRYkcSK9JulvmFO8JKBQcfriqvYktDQ1MUHxERwAAEhJOi4ENTk5eUGJFJQQEBweYTCVMmH8jJzihMQJQEREtqKoCoziwsTwjLQMDeC+GI3KltAJMOD+6Y0VLTU9RMGOIic2Jj5IPExPDGkxaWVzaXV4PUExTTFtX2ePT3wvEbAgIJexv7u0B6rtxOmx1KzsoUzLK/kRe9VpVIRVBgwLsBcBB554vPHoo8HkVS1YKX7ZwGZiIgpeOWaZ+BMlQzWO/XwuCZl2o5mdeMQGCCFWoRs8UEyeUlBFLksQYzmQ7CzhzBg2Cl2nVmC1qJKFotJxErpHbtq2btwrgilSZypUbmEpRF4wbm+0c1nTqLmXaRKBTgE8EehGJR9dlXXplzrRRY3evXEsK++YLAQA7";
    bottomBar.appendChild(icon);

    document.body.appendChild(panel);

    cache = {
        strokeSubtle: v.strokeSubtle,
        strokeDefault: v.strokeDefault,
        accent: v.accent,
        text: v.text,
        error: "#ff5555",
        warn: "#ffaa00"
    };
}

/* ==========================================================================
   Section 4: Event Listeners & Init
   Periodic checks, and OCLB detection
   ========================================================================== */

setInterval(theme, 5000);
setInterval(() => {
    if (!panel) create();
    updatePanelPosition();
    check();
}, 2000);

window.addEventListener("message", e => {
    if (typeof e.data === "string" && e.data.includes("oclb")) check();
});

let lastPathname = window.location.pathname;
setInterval(() => {
    if (window.location.pathname !== lastPathname) {
        lastPathname = window.location.pathname;
        updatePanelPosition();
    }
}, 500);

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        create();
        setTimeout(check, 1000);
    });
} else {
    setTimeout(() => {
        create();
        setTimeout(check, 1000);
    }, 100);
}

/* ==========================================================================
   Section 5: Bulk Llama Automation
   Automation logic
   ========================================================================== */

function tryBulk() {
    stopAuto = 0;
    active = 0;
    check();

    const g = $(".oclb-give"),
          s = $(".oclb-spam");

    if (g.length && !s.length) {
        bulk();
    } else {
        setTimeout(() => {
            check();
            if (g.length && !s.length) bulk();
        }, 800);
    }
}

function bulk() {
    if ($(".oclb-spam").length) {
        stopAuto = 1;
        active = 0;
        check();
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
   Section 6: Status Display
   Updates GUI in real-time (Spam/Error only when > 0)
   ========================================================================== */

function check() {
    if (!panel || !count || !label) return;

    const g = $(".oclb-give").length,
          gv = $(".oclb-giving").length,
          e = $(".oclb.oclb-error, .oclb-error").length,
          s = $(".oclb-spam").length;

    if (count.innerHTML !== String(g)) count.innerHTML = g;

    const v = themeVars || theme(),
          c = cache;

    let html = `
        <div style="font-size:${v.size};font-weight:700;text-align:center;color:${c.accent};margin-bottom:6px;width:100%;">
            OCLB Helper
        </div>
        <hr style="width:100%;display:block;border:none;border-top:1px solid ${c.strokeSubtle};margin:4px 0 8px 0;">
        ${divLine("+Llama", g, c.accent, v.size)}
        ${divLine("Giving…", gv, null, v.size)}`;

    if (s > 0) html += divLine("Spam", s, c.error, v.size);
    if (e > 0) html += divLine("Error", e, c.warn, v.size);

    html += `<hr style="width:100%;display:block;border:none;border-top:1px solid ${c.strokeSubtle};margin:3px 0 0 0;">`;

    label.innerHTML = html;

    const b = stopAuto ? c.error : active ? c.warn : c.strokeDefault;
    if (panel.style.borderColor !== b) panel.style.borderColor = b;

    if (!active && !stopAuto && window.location.search.includes("hb_oclbh")) {
        setTimeout(bulk, 1000);
    }
}

/* ==========================================================================
   Section 7: Panel Interactions
   Hover effects to expand/shrink the GUI
   ========================================================================== */

function grow() {
    set(panel, {
        justifyContent: "space-between",
        alignItems: "flex-end",
        padding: "12px",
        maxWidth: "300px"
    });

    set(icon, {
        width: "36px",
        height: "43px"
    });

    label.style.display = "flex";
    bottomBar.style.marginTop = "8px";
}

function shrink() {
    set(panel, {
        alignItems: "flex-end",
        padding: "8px 10px",
        maxWidth: "260px"
    });

    set(icon, {
        width: "30px",
        height: "36px"
    });

    label.style.display = "none";
    bottomBar.style.marginTop = "0";
}
