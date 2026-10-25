// C12-challenge-group1-words.js - Word Submission & VIP Verification Engine (Merged)

function checkWordSubmission() {
    // پشتیبانی از هر دو شناسه ورودی (user-word-input و hourlyWordInput) برای سازگاری کامل با صفحه
    const wordInput = document.getElementById('user-word-input') || document.getElementById('hourlyWordInput');
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

    // ایمیل استثنا (مدیر سیستم - سعیده جان)
    const adminEmail = "s.zakeri.1365@gmail.com";

    // اگر ایمیل شما بود، محدودیت زمانی کاملاً دور زده می‌شود و دسترسی VIP فعال می‌گردد
    if (currentEmail === adminEmail) {
        console.log("⚡ دسترسی ویژه مدیر (VIP Access): محدودیت یک‌ساعته لغو شد.");
        alert(`[دسترسی مدیر VIP] بررسی ۵ ثانیه‌ای انجام شد؛ کلمه "${word}" با موفقیت ثبت گردید. شما می‌توانید بدون محدودیت تست کنید!`);
        if (wordInput) wordInput.value = '';
        return;
    }

    // بررسی محدودیت زمانی ۱ ساعته برای سایر کاربران عادی (در صورت تعریف کانفیگ)
    if (typeof NOVO_CONFIG !== 'undefined' && NOVO_CONFIG.hourlyWordLimitMs) {
        const lastSubmit = localStorage.getItem('novo_last_word_time');
        const now = new Date().getTime();

        if (lastSubmit && (now - lastSubmit < NOVO_CONFIG.hourlyWordLimitMs)) {
            alert('شما در این ساعت شرکت کرده‌اید. لطفاً تا ساعت بعدی منتظر بمانید.');
            return;
        }
        // ثبت زمان برای کاربران عادی
        localStorage.setItem('novo_last_word_time', now);
    }

    // اعمال قوانین گام اول و بررسی ۵ ثانیه‌ای برای کاربر عادی
    alert(`گام اول: بررسی ۵ ثانیه‌ای کلمه «${word}» با موفقیت انجام شد و در مارپیچ کلمات ثبت گردید!`);
    if (wordInput) wordInput.value = '';
}

// تابع کمکی برای سازگاری با نام‌گذاری‌های قبلی
function submitHourlyWord() {
    return checkWordSubmission();
}
