// C13: Titles Challenge Logic
function handleTitlesChallenge() {
    const val = document.getElementById('user-title-input').value.trim() || 'عنوان پیشنهادی';
    const displayTitle = document.getElementById('companionTitle');
    const displayBody = document.getElementById('companionBodyContent');
    
    displayTitle.innerHTML = `<i class="fa-solid fa-heading" style="color:#2563eb;"></i> پردازش چالش عناوین: ${val}`;
    displayBody.innerHTML = `
        <div class="active-challenge-view">
            <div class="status-pill active">چالش عناوین فعال شد</div>
            <p><strong>عنوان ثبت‌شده:</strong> ${val}</p>
            <p>ارزیابی نمره‌دهی هوشمند و اعتبار سنجی لایه‌های حقوقی پروژه...</p>
            <div class="loading-bar-shim"><div class="fill"></div></div>
        </div>
    `;
    if (typeof expandGlassDisplay === 'function') expandGlassDisplay();
}
