/* js/main.js */

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
}

function updateThemeIcon(theme) {
    const btn = document.querySelector('.theme-toggle');
    btn.textContent = theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
}

// Score Management
function loadScore(activity) {
    return parseInt(localStorage.getItem(`score_${activity}`) || '0');
}

function saveScore(activity, score) {
    localStorage.setItem(`score_${activity}`, score);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    // Add theme toggle listener if button exists
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleTheme);
    }

    // Add fade-in animation to content
    const main = document.querySelector('.container');
    if (main) main.classList.add('fade-in');
});