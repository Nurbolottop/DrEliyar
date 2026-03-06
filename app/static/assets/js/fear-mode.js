/**
 * Dr. Eliyar — Fear Mode ("Я боюсь стоматологов" toggle)
 * Stores state in localStorage, toggles body class and calm-text visibility
 */

document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('fearModeCheckbox');
    if (!checkbox) return;

    const STORAGE_KEY = 'dreliyar-fear-mode';

    // Restore state
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'true') {
        enableFearMode(true);
    }

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            enableFearMode(true);
        } else {
            enableFearMode(false);
        }
    });

    function enableFearMode(on) {
        checkbox.checked = on;
        document.body.classList.toggle('fear-mode', on);
        localStorage.setItem(STORAGE_KEY, on ? 'true' : 'false');

        // Show/hide calm texts
        document.querySelectorAll('.calm-text, [data-calm]').forEach(el => {
            if (on) {
                el.style.display = 'block';
            } else {
                el.style.display = 'none';
            }
        });

        // Fear mode checkbox on contacts form
        const fearGroup = document.querySelector('.form-group.calm-text');
        if (fearGroup) {
            fearGroup.style.display = on ? 'block' : 'none';
        }
    }
});
