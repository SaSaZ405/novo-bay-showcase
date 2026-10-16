
function handleInitialEntry() {
    const name = document.getElementById('userNameInput').value.trim();
    const email = document.getElementById('userEmailInput').value.trim();
    const terms = document.getElementById('termsCheck').checked;

    if (!name || !email) {
        alert('لطفاً نام و آدرس ایمیل خود را وارد کنید.');
        return;
    }
    if (!terms) {
        alert('لطفاً شرایط و قوانین چالش را تایید فرمایید.');
        return;
    }

    // ثبت در مخزن دیتا (شبیه‌سازی ارسال به ایمیل)
    console.log(`[DATA REPO]: Form submitted for ${name} (${email}) -> Sent to ${NOVO_CONFIG.databaseEmailTarget}`);
    
    // شروع نشست ۷ روزه کاربر
    if (typeof startUserSession === 'function') {
        startUserSession();
    }

    document.getElementById('introModal').classList.add('opacity-0', 'pointer-events-none');
}
