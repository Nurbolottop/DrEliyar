/**
 * Dr. Eliyar — Tooth Map Interactivity
 * SVG tooth diagram: hover highlighting and click-to-scroll to service
 */

document.addEventListener('DOMContentLoaded', () => {
    const toothMap = document.getElementById('toothMap');
    if (!toothMap) return;

    const teeth = toothMap.querySelectorAll('.tooth');
    const serviceItems = document.querySelectorAll('.service-item');

    // Service colors
    const serviceColors = {
        implants: '#1669B8',
        veneers: '#8B5CF6',
        therapy: '#16A34A',
        surgery: '#DC2626',
        hygiene: '#0EA5E9',
        ortho: '#F59E0B'
    };

    const defaultFill = '#1F2933';
    const hoverFill = '#0F4C81';

    teeth.forEach(tooth => {
        const service = tooth.getAttribute('data-service');

        // Hover
        tooth.addEventListener('mouseenter', () => {
            tooth.setAttribute('fill', serviceColors[service] || hoverFill);
            tooth.setAttribute('stroke', '#fff');
            tooth.style.cursor = 'pointer';
            tooth.style.transition = 'fill 0.2s ease, stroke 0.2s ease';

            // Highlight matching service
            serviceItems.forEach(item => {
                if (item.id === service) {
                    item.classList.add('highlighted');
                }
            });
        });

        tooth.addEventListener('mouseleave', () => {
            tooth.setAttribute('fill', defaultFill);
            tooth.setAttribute('stroke', '#374151');

            serviceItems.forEach(item => {
                item.classList.remove('highlighted');
            });
        });

        // Click — scroll to service
        tooth.addEventListener('click', () => {
            const target = document.getElementById(service);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Flash highlight
                target.classList.add('highlighted');
                setTimeout(() => target.classList.remove('highlighted'), 2000);
            }
        });
    });
});
