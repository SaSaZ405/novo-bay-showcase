// C18: Navigation, Clock, Dice, and UI Controls
function updateClock() {
    const now = new Date();
    const utcString = now.toUTCString().split(' ')[4] + ' UTC';
    const clockEl = document.getElementById('liveClock');
    if (clockEl) clockEl.innerText = utcString;
}
setInterval(updateClock, 1000);
updateClock();

let currentDayNum = 5;
setInterval(() => {
    currentDayNum = currentDayNum >= 10 ? 1 : currentDayNum + 1;
    const badgeEl = document.getElementById('currentDayVal');
    if (badgeEl) badgeEl.textContent = currentDayNum;
}, 1500);

function closeAdBanner() {
    const banner = document.getElementById('ad-banner');
    if (banner) banner.style.display = 'none';
}

function getDieDotsSVG(val) {
    const dot = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="4.5" fill="#1e293b"/>`;
    let dotsHTML = '';
    if (val === 1) {
        dotsHTML += dot(23, 23);
    } else if (val === 2) {
        dotsHTML += dot(12, 12) + dot(34, 34);
    } else if (val === 3) {
        dotsHTML += dot(12, 12) + dot(23, 23) + dot(34, 34);
    } else if (val === 4) {
        dotsHTML += dot(12, 12) + dot(34, 12) + dot(12, 34) + dot(34, 34);
    } else if (val === 5) {
        dotsHTML += dot(12, 12) + dot(34, 12) + dot(23, 23) + dot(12, 34) + dot(34, 34);
    } else if (val === 6) {
        dotsHTML += dot(12, 12) + dot(34, 12) + dot(12, 23) + dot(34, 23) + dot(12, 34) + dot(34, 34);
    }
    return `<rect x="0" y="0" width="46" height="46" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>` + dotsHTML;
}

function rollClassicDice() {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const sum = d1 + d2;
    
    const die1 = document.getElementById('die1Group');
    const die2 = document.getElementById('die2Group');
    const valBox = document.getElementById('diceValBox');
    
    if (die1) die1.innerHTML = getDieDotsSVG(d1);
    if (die2) die2.innerHTML = getDieDotsSVG(d2);
    if (valBox) valBox.textContent = `تاس‌ها: ${d1} و ${d2} (مجموع: ${sum})`;
    
    const svgBox = document.getElementById('diceSvg');
    if (svgBox) {
        svgBox.style.transform = "scale(1.15) rotate(8deg)";
        setTimeout(() => {
            svgBox.style.transform = "scale(1) rotate(0deg)";
        }, 250);
    }
}

function activateChallengeDisplay(type) {
    if (type === 'words' && typeof handleWordsChallenge === 'function') {
        handleWordsChallenge();
    } else if (type === 'titles' && typeof handleTitlesChallenge === 'function') {
        handleTitlesChallenge();
    } else if (type === 'webinar' && typeof handleWebinarChallenge === 'function') {
        handleWebinarChallenge();
    }
}

function expandGlassDisplay() {
    const panel = document.getElementById('companionDisplayPanel');
    if (panel) {
        panel.classList.add('glass-modal-expanded');
        const expandBtn = document.querySelector('.glass-expand-btn');
        const closeBtn = document.querySelector('.glass-close-btn');
        if (expandBtn) expandBtn.style.display = 'none';
        if (closeBtn) closeBtn.style.display = 'inline-block';
    }
}

function shrinkGlassDisplay() {
    const panel = document.getElementById('companionDisplayPanel');
    if (panel) {
        panel.classList.remove('glass-modal-expanded');
        const expandBtn = document.querySelector('.glass-expand-btn');
        const closeBtn = document.querySelector('.glass-close-btn');
        if (expandBtn) expandBtn.style.display = 'inline-block';
        if (closeBtn) closeBtn.style.display = 'none';
    }
}
