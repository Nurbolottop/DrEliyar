/**
 * Dr. Eliyar — 360° Tour Location Switcher
 */

const tourScenes = {
    entrance: {
        icon: '🚪',
        title: 'Вход и ресепшн',
        desc: 'Просторный холл с удобной зоной ожидания. Наш администратор встретит вас с улыбкой.'
    },
    waiting: {
        icon: '🛋️',
        title: 'Зона ожидания',
        desc: 'Уютная зона с мягкими креслами, кофемашиной и телевизором. Ожидание в комфорте.'
    },
    cabinet1: {
        icon: '🪑',
        title: 'Кабинет №1',
        desc: 'Основной кабинет с современным оборудованием, микроскопом и системой седации.'
    },
    cabinet2: {
        icon: '🪑',
        title: 'Кабинет №2',
        desc: 'Хирургический кабинет для имплантации и сложных операций. Стерильная зона.'
    },
    xray: {
        icon: '🖥️',
        title: 'Рентген-кабинет',
        desc: 'Цифровой 3D-томограф и панорамный рентген. Мгновенные снимки с минимальной дозой.'
    },
    sterilization: {
        icon: '🔬',
        title: 'Стерилизация',
        desc: 'Автоклавы европейского класса. Полный цикл стерилизации для вашей безопасности.'
    }
};

function switchTourScene(btn) {
    const scene = btn.getAttribute('data-scene');
    const data = tourScenes[scene];
    if (!data) return;

    // Update active btn
    document.querySelectorAll('.tour__nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Update content
    const icon = document.getElementById('tourIcon');
    const title = document.getElementById('tourTitle');
    const desc = document.getElementById('tourDesc');

    if (icon) icon.textContent = data.icon;
    if (title) title.textContent = data.title;
    if (desc) desc.textContent = data.desc;
}
