// ==========================================================================
// 1. SMART OPERATING SYSTEM DETECTION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const mainBtn = document.getElementById('main-download-btn');
    const osText = document.getElementById('os-text');
    
    if (!mainBtn || !osText) return;

    const platform = navigator.userAgentData?.platform || navigator.platform || "";
    const lowPlatform = platform.toLowerCase();

    const targets = {
        win: { text: "For Windows 10 or 11", link: "#win-file-link", card: "card-windows" },
        mac: { text: "For macOS 11 or later", link: "#mac-file-link", card: "card-macos" },
        lin: { text: "For Linux (64-bit)", link: "#linux-file-link", card: "card-linux" }
    };

    let detected = null;
    if (lowPlatform.includes('win')) detected = targets.win;
    else if (lowPlatform.includes('mac')) detected = targets.mac;
    else if (lowPlatform.includes('lin')) detected = targets.lin;

    if (detected) {
        const osName = detected === targets.win ? "Windows" : detected === targets.mac ? "macOS" : "Linux";
        mainBtn.innerText = `Download for ${osName}`;
        mainBtn.href = detected.link;
        osText.innerText = detected.text;
        
        const targetCard = document.getElementById(detected.card);
        if (targetCard) {
            targetCard.classList.add('highlighted');
        }
    } else {
        osText.innerText = "Choose your operating system below";
    }
});

// ==========================================================================
// 2. SMART BANGS SEARCH ENGINE ROUTER (FIXED)
// ==========================================================================
function performSearch() {
    const searchInput = document.getElementById('browser-search-input');
    if (!searchInput) return;

    let rawQuery = searchInput.value.trim();
    if (!rawQuery) return;

    const terms = rawQuery.split(' ');
    const firstTerm = terms[0].toLowerCase();
    const queryContent = encodeURIComponent(terms.slice(1).join(' '));

    // FIX: Added the missing '$' symbols and appropriate search URL query formatting
    const bangMap = {
        '!yt': `https://youtube.com{queryContent}`,
        '!w': `https://wikipedia.org{queryContent}`,
        '!g': `https://google.com{queryContent}`,
        '!gh': `https://github.com{queryContent}`,
        '!r': `https://reddit.com{queryContent}`
    };

    if (bangMap[firstTerm]) {
        window.open(bangMap[firstTerm], '_blank');
    } else {
        window.open(`https://google.com{encodeURIComponent(rawQuery)}`, '_blank');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('browser-search-input');
    const searchBtn = document.getElementById('browser-search-btn');

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }
});

function insertBang(bangText) {
    const searchInput = document.getElementById('browser-search-input');
    if (searchInput) {
        searchInput.value = bangText;
        searchInput.focus();
    }
}
