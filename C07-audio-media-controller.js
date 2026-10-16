let isAudioPlaying = false;
function toggleAudio() {
    isAudioPlaying = !isAudioPlaying;
    const statusText = document.getElementById('audioStatus');
    if (isAudioPlaying) {
        statusText.innerText = "موسیقی: در حال پخش";
    } else {
        statusText.innerText = "موسیقی: خاموش";
    }
}
