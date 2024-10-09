function applyColorBlindMode() {
    const savedMode = localStorage.getItem('colorBlindMode');
    if (savedMode) {
        document.body.className = 'color-blind-' + savedMode;
    }
}

// Apply color blind mode when the DOM is loaded
document.addEventListener('DOMContentLoaded', applyColorBlindMode);

// Only add these functions if we're on the index page
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    function setColorBlindMode(mode) {
        document.body.className = 'color-blind-' + mode;
        localStorage.setItem('colorBlindMode', mode);
        toggleColorBlindList(); // Close the list after selection
    }

    function toggleColorBlindList() {
        const list = document.getElementById('colorBlindList');
        const toggle = document.getElementById('colorBlindToggle');
        if (list.style.display === 'none') {
            list.style.display = 'block';
            toggle.setAttribute('aria-expanded', 'true');
        } else {
            list.style.display = 'none';
            toggle.setAttribute('aria-expanded', 'false');
        }
    }
}