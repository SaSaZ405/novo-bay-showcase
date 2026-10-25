// C14-challenge-group3-proposals.js - Proposals and Business Plan Management (Merged)

function checkProposalSubmission() {
    const proposal = document.getElementById('user-proposal-input').value;
    if(!proposal) { 
        alert("لطفاً پروپوزال یا بیزینس پلن خود را وارد کنید."); 
        return; 
    }
    alert(`گام سوم: بیزینس پلن برای کمیته ارزیابی ارسال شد.`);
}

function joinTender() {
    alert('اتصال به گروه سوم: بررسی ایده‌ها توسط سرمایه‌گذاران و اعلام آمادگی تندر.');
}
