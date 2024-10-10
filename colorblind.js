/**
 * Applies the saved color blind mode to the document body.
 * This function retrieves the saved mode from localStorage and sets the appropriate class on the body.
 */
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
    /**
     * Sets the color blind mode for the application.
     * This function updates the body class, saves the mode to localStorage, and closes the color blind mode list.
     * @param {string} mode - The color blind mode to set.
     */
    function setColorBlindMode(mode) {
        document.body.className = 'color-blind-' + mode;
        localStorage.setItem('colorBlindMode', mode);
        toggleColorBlindList(); // Close the list after selection
    }

    /**
     * Toggles the visibility of the color blind mode selection list.
     * This function shows or hides the list and updates the aria-expanded attribute of the toggle button.
     */
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