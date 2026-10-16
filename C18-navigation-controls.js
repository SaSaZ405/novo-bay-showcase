function resetToIntro() {
    document.getElementById('introModal').classList.remove('opacity-0', 'pointer-events-none');
}

function togglePanel(panelId) {
    const panel = document.getElementById(panelId);
    if (panel) {
        panel.classList.toggle('hidden');
    }
}
