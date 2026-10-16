
function submitHourlyWord() {
    const wordInput = document.getElementById('hourlyWordInput');
    const word = wordInput.value.trim();

    if (!word) {
        alert('لطفاً کلمه یا ایده خود را وارد کنید.');
        return;
    }

    // بررسی محدودیت زمانی ۱ ساعته
    const lastSubmit = localStorage.getItem('novo_last_word_time');
    const now = new Date().getTime();

    if (lastSubmit && (now - lastSubmit < NOVO_CONFIG.hourlyWordLimitMs)) {
        alert('شما در این ساعت شرکت کرده‌اید. لطفاً تا ساعت بعدی منتظر بمانید.');
        return;
    }

    localStorage.setItem('novo_last_word_time', now);
    alert(`کلمه "${word}" با موفقیت و به صورت غیرقابل ویرایش در سیستم ثبت شد!`);
    wordInput.value = '';
}
