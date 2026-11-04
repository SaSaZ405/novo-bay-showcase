// C19: Live Socket Sync & Chat Room
function sendChatMessage() {
    const input = document.getElementById('chatInput');
    if (input && input.value.trim() !== '') {
        const msgBox = document.getElementById('chatMessages');
        if (msgBox) {
            const p = document.createElement('p');
            const time = new Date().toLocaleTimeString();
            p.textContent = `[${time}] @Me: ${input.value}`;
            msgBox.appendChild(p);
            input.value = '';
            msgBox.scrollTop = msgBox.scrollHeight;
        }
    }
}
