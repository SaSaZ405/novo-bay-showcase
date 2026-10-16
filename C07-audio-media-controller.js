function changeLanguage(lang) {
    const root = document.getElementById('htmlRoot');
    if (lang === 'fa') {
        root.setAttribute('lang', 'fa');
        root.setAttribute('dir', 'rtl');
    } else {
        root.setAttribute('lang', lang);
        root.setAttribute('dir', 'ltr');
    }
}
