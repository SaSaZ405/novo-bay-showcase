// C14: Webinar / Tender Challenge Logic
function handleWebinarChallenge() {
    const displayTitle = document.getElementById('companionTitle');
    const displayBody = document.getElementById('companionBodyContent');
    
    displayTitle.innerHTML = `<i class="fa-solid fa-video" style="color:#dc2626;"></i> اتاق زنده وبینار و مناقصه`;
    displayBody.innerHTML = `
        <div class="active-challenge-view">
            <div class="status-pill active" style="background:#fee2e2; color:#991b1b;">استیج وبینار برخط</div>
            <p>ارتباط زنده با استیج بین‌المللی و بررسی پیشنهادات مناقصه...</p>
            <button class="stage-join-btn" onclick="expandGlassDisplay()">ورود به استیج بزرگ شیشه‌ای</button>
        </div>
    `;
    if (typeof expandGlassDisplay === 'function') expandGlassDisplay();
}
