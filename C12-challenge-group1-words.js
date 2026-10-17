// C12-challenge-group1-words.js

function submitHourlyWord() {
    const wordInput = document.getElementById('hourlyWordInput');
    const word = wordInput ? wordInput.value.trim() : '';

    if (!word) {
        alert('لطفاً کلمه یا ایده خود را وارد کنید.');
        return;
    }

    // گرفتن ایمیل ثبت‌شده کاربر از حافظه مرورگر یا ورودی فرم
    const userEmailInput = document.getElementById('userEmailInput');
    const currentEmail = (userEmailInput && userEmailInput.value.trim()) 
        ? userEmailInput.value.trim().toLowerCase() 
        : (localStorage.getItem('novo_user_email') || '').toLowerCase();

    // ایمیل استثنا (مدیر سیستم)
    const adminEmail = "s.zakeri.1365@gmail.com";

    // اگر ایمیل شما بود، محدودیت زمانی کاملاً دور زده می‌شود
    if (currentEmail === adminEmail) {
        console.log("⚡ دسترسی ویژه مدیر (VIP Access): محدودیت یک‌ساعته لغو شد.");
        alert(`[دسترسی مدیر] کلمه "${word}" ثبت شد. شما می‌توانید بدون محدودیت تست کنید!`);
        if (wordInput) wordInput.value = '';
        return;
    }

    // بررسی محدودیت زمانی ۱ ساعته برای سایر کاربران عادی
    const lastSubmit = localStorage.getItem('novo_last_word_time');
    const now = new Date().getTime();

    if (lastSubmit && (now - lastSubmit < NOVO_CONFIG.hourlyWordLimitMs)) {
        alert('شما در این ساعت شرکت کرده‌اید. لطفاً تا ساعت بعدی منتظر بمانید.');
        return;
    }

    // ثبت زمان برای کاربران عادی
    localStorage.setItem('novo_last_word_time', now);
    alert(`کلمه "${word}" با موفقیت ثبت شد!`);
    if (wordInput) wordInput.value = '';
}
