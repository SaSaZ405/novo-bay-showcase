
function startUserSession() {
    const sessionData = {
        startTime: new Date().getTime(),
        expiresAt: new Date().getTime() + (NOVO_CONFIG.challengeDurationDays * 24 * 60 * 60 * 1000),
        active: true
    };
    localStorage.setItem('novo_user_session', JSON.stringify(sessionData));
}

function checkUserSession() {
    const raw = localStorage.getItem('novo_user_session');
    if (!raw) return false;
    const session = JSON.parse(raw);
    return session.active && (new Date().getTime() < session.expiresAt);
}
