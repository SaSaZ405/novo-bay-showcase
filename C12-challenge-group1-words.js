/* ==========================================================
   NOVO-BAY CHALLENGE CONTROLLER & GLASS DISPLAY GATEWAY
   ========================================================== */

function activateChallengeDisplay(type) {
    const displayTitle = document.getElementById('companionTitle');
    const displayBody = document.getElementById('companionBodyContent');

    if (type === 'words') {
        const val = document.getElementById('user-word-input').value.trim() || 'واژگان کلیدی چالش';
        displayTitle.innerHTML = `<i class="fa-solid fa-pencil" style="color:#d97706;"></i> پردازش زنده چالش کلمات: ${val}`;
        displayBody.innerHTML = `
            <div class="active-challenge-view">
                <div class="status-pill active">چالش کلمات کلیدی فعال شد</div>
                <h4>ورودی ثبت‌شده: <span style="color:#2563eb;">${val}</span></h4>
                <p>سیستم در حال ارزیابی وزن معنایی کلمه در الگوریتم‌های شبکه است...</p>
                <div class="loading-bar-shim"><div class="fill"></div></div>
            </div>
        `;
    } else if (type === 'titles') {
        const val = document.getElementById('user-title-input').value.trim() || 'عنوان پیشنهادی چالش';
        displayTitle.innerHTML = `<i class="fa-solid fa-heading" style="color:#2563eb;"></i> پردازش زنده چالش عناوین: ${val}`;
        displayBody.innerHTML = `
            <div class="active-challenge-view">
                <div class="status-pill active">چالش ثبت عنوان فعال شد</div>
                <h4>عنوان ثبت‌شده: <span style="color:#2563eb;">${val}</span></h4>
                <p>در حال تطبیق با استانداردهای ساختاری و مالکیت معنوی طرح...</p>
                <div class="loading-bar-shim"><div class="fill"></div></div>
            </div>
        `;
    } else if (type === 'webinar') {
        displayTitle.innerHTML = `<i class="fa-solid fa-video" style="color:#dc2626;"></i> اتاق زنده وبینار و مناقصه بین‌المللی`;
        displayBody.innerHTML = `
            <div class="active-challenge-view">
                <div class="status-pill active" style="background:#fee2e2; color:#991b1b;">استیج وبینار فعال است</div>
                <h4>اتصال به پنل اصلی ارائه و ویدیو کنفرانس چالش</h4>
                <p>کلیه تعاملات زنده، آمار شرکت‌کنندگان و مناقصات لحظه‌ای در این صفحه نمایش داده می‌شود.</p>
                <button class="stage-join-btn" onclick="expandGlassDisplay()">بزرگ‌نمایی کامل استیج</button>
            </div>
        `;
    }

    // هدایت خودکار به حالت بزرگ‌نمایی شیشه‌ای هنگام فعال‌سازی
    expandGlassDisplay();
}

function expandGlassDisplay() {
    const panel = document.getElementById('companionDisplayPanel');
    if (panel) {
        panel.classList.add('glass-modal-expanded');
        document.querySelector('.glass-expand-btn').style.display = 'none';
        document.querySelector('.glass-close-btn').style.display = 'inline-block';
    }
}

function shrinkGlassDisplay() {
    const panel = document.getElementById('companionDisplayPanel');
    if (panel) {
        panel.classList.remove('glass-modal-expanded');
        document.querySelector('.glass-expand-btn').style.display = 'inline-block';
        document.querySelector('.glass-close-btn').style.display = 'none';
    }
}
