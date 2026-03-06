/**
 * Dr. Eliyar — Chat Form & Booking Form
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // CHAT FORM (on index.html hero)
    // ==========================================
    const chatBody = document.getElementById('chatBody');
    const chatInputArea = document.getElementById('chatInputArea');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');

    if (!chatBody) return; // Only runs on pages with chat

    const fearMode = () => document.body.classList.contains('fear-mode');

    // Chat scenario steps
    const steps = [
        {
            bot: 'Здравствуйте! 👋 Я помогу вам записаться. Что вас беспокоит?',
            options: ['Болит зуб', 'Хочу виниры', 'Имплантация', 'Чистка зубов', 'Другое']
        },
        {
            bot: 'Отлично! Когда вам удобно прийти?',
            options: ['Ближайшие дни', 'На этой неделе', 'На следующей неделе', 'Свой вариант']
        },
        {
            bot: 'Скажите, вы боитесь стоматолога? Это абсолютно нормально — мы готовы к этому.',
            options: ['Да, немного боюсь', 'Нет, всё ок']
        },
        {
            bot: 'Последний шаг! Как вас зовут?',
            input: true,
            placeholder: 'Ваше имя'
        },
        {
            bot: 'И ваш номер телефона — мы перезвоним:',
            input: true,
            placeholder: '+7 (___) ___-__-__'
        }
    ];

    let currentStep = 0;
    const userAnswers = [];

    function addMessage(text, type) {
        const msg = document.createElement('div');
        msg.className = `chat__msg chat__msg--${type}`;
        msg.textContent = text;
        chatBody.appendChild(msg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function addOptions(options) {
        const wrap = document.createElement('div');
        wrap.className = 'chat__options';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'chat__option-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => {
                selectOption(opt);
                wrap.remove();
            });
            wrap.appendChild(btn);
        });
        chatBody.appendChild(wrap);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function selectOption(value) {
        addMessage(value, 'user');
        userAnswers.push(value);
        currentStep++;
        setTimeout(() => showStep(), 500);
    }

    function showStep() {
        if (currentStep >= steps.length) {
            finishChat();
            return;
        }

        const step = steps[currentStep];
        let botText = step.bot;

        // Fear mode extra text for fear question
        if (currentStep === 2 && fearMode()) {
            botText += '\n💚 Не переживайте — у нас есть специальный подход для тревожных пациентов.';
        }

        addMessage(botText, 'bot');

        if (step.options) {
            setTimeout(() => addOptions(step.options), 300);
        }

        if (step.input) {
            chatInputArea.style.display = 'flex';
            chatInput.placeholder = step.placeholder || 'Введите ответ...';
            chatInput.value = '';
            chatInput.focus();
        } else {
            chatInputArea.style.display = 'none';
        }
    }

    function handleInputSend() {
        const val = chatInput.value.trim();
        if (!val) return;
        chatInputArea.style.display = 'none';
        selectOption(val);
    }

    function finishChat() {
        chatInputArea.style.display = 'none';
        let finalText = '✅ Спасибо! Мы получили вашу заявку. Администратор свяжется с вами в ближайшее время.';
        if (fearMode()) {
            finalText += '\n💚 Мы обязательно предупредим врача, чтобы он уделил вам особое внимание.';
        }
        addMessage(finalText, 'bot');
    }

    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', handleInputSend);
    }
    if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleInputSend();
        });
    }

    // Start chat
    setTimeout(() => showStep(), 600);

    // ==========================================
    // BOOKING FORM (on contacts.html)
    // ==========================================
    window.handleBookingSubmit = function (e) {
        e.preventDefault();
        const form = document.getElementById('bookingForm');
        const success = document.getElementById('bookingSuccess');

        // Simple validation
        const name = document.getElementById('bName');
        const phone = document.getElementById('bPhone');
        let valid = true;

        [name, phone].forEach(field => {
            field.classList.remove('form-control--error');
            const err = field.parentElement.querySelector('.form-error');
            if (err) err.remove();
        });

        if (!name.value.trim()) {
            name.classList.add('form-control--error');
            const err = document.createElement('div');
            err.className = 'form-error';
            err.textContent = 'Введите ваше имя';
            name.parentElement.appendChild(err);
            valid = false;
        }

        if (!phone.value.trim() || phone.value.trim().length < 6) {
            phone.classList.add('form-control--error');
            const err = document.createElement('div');
            err.className = 'form-error';
            err.textContent = 'Введите корректный номер телефона';
            phone.parentElement.appendChild(err);
            valid = false;
        }

        if (!valid) return false;

        // "Submit"
        form.style.display = 'none';
        success.style.display = 'block';
        return false;
    };
});
