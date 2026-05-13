// Код для установки PWA приложения
// Включает регистрацию service worker, обработку события beforeinstallprompt,
// показ подсказки установки и логику установки.

// Регистрация service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

// Переменная для отложенного промпта установки
let deferredInstallPrompt = null;

// Обработчик события beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    showInstallHint();
});

// Обработчик события appinstalled
window.addEventListener('appinstalled', () => {
    localStorage.setItem('appInstalled', '1');
    const installHint = document.getElementById('installHint');
    if (installHint) {
        installHint.classList.add('hidden');
    }
});

// Функция для проверки, запущено ли приложение в standalone режиме
function isStandaloneMode() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true ||
           document.referrer.startsWith('android-app://');
}

// Флаг, показана ли подсказка установки
let installHintShown = false;

// Функция для показа подсказки установки
function showInstallHint() {
    if (localStorage.getItem("appInstalled") === "1") return;
    if (installHintShown) return;
    if (isStandaloneMode()) return;

    installHintShown = true;
    const installHint = document.getElementById('installHint');
    if (installHint) {
        installHint.classList.remove('hidden');
    }
}

// Функция для начала установки
function startInstall() {
    const button = document.getElementById("installBtn");
    const progressRow = document.getElementById("installProgress");
    const bar = document.querySelector("#installProgress .bar");
    const status = document.getElementById("installStatus");

    button.disabled = true;

    if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        deferredInstallPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                status.innerText = "Приложение установлено! 🎉";
                localStorage.setItem("appInstalled", "1");
                setTimeout(() => {
                    document.getElementById("installHint").classList.add("hidden");
                }, 800);
            } else {
                status.innerText = "Установка отменена";
                button.disabled = false;
            }
            deferredInstallPrompt = null;
        });
    } else {
        progressRow.style.display = "block";
        status.innerText = "Установка...";

        let value = 0;
        const timer = setInterval(() => {
            value += Math.floor(Math.random() * 12) + 7;
            if (value > 100) value = 100;
            bar.style.width = value + "%";

            if (value >= 100) {
                clearInterval(timer);
                status.innerText = "Установлено! 🎉";
                localStorage.setItem("appInstalled", "1");
                setTimeout(() => {
                    document.getElementById("installHint").classList.add("hidden");
                }, 800);
            }
        }, 350);
    }
}

// HTML элементы для подсказки установки (добавьте в ваш HTML):
/*
<div id="installHint" class="hidden">
    <div class="hint-row">
        <div class="hint-text">
            <strong>Установить приложение?</strong><br>
            Добавьте на главный экран для быстрого доступа
        </div>
        <button id="installBtn" onclick="startInstall()">Установить</button>
    </div>
    <div id="installProgress" style="display: none;">
        <div class="bar"></div>
    </div>
    <div id="installStatus"></div>
</div>
*/

// CSS стили для подсказки установки (добавьте в ваш CSS):
/*
#installHint {
    position: fixed;
    left: 50%;
    bottom: 96px;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.82);
    padding: 16px 18px;
    border-radius: 22px;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
    color: white;
    z-index: 10005;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 92%;
    width: fit-content;
    min-width: 280px;
}

#installHint.hidden {
    display: none;
}

.hint-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.hint-text {
    font-size: 15px;
    line-height: 1.35;
    text-align: left;
}

#installProgress {
    display: none;
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.12);
    border-radius: 999px;
    overflow: hidden;
}

#installProgress .bar {
    width: 0;
    height: 100%;
    background: linear-gradient(135deg, #ff6b9d 0%, #ff4f81 100%);
    transition: width 0.25s ease;
}

#installBtn {
    padding: 11px 18px;
    border-radius: 16px;
    border: none;
    background: linear-gradient(135deg, #ff6b9d 0%, #ff4f81 100%);
    color: white;
    font-weight: 700;
    cursor: pointer;
    min-width: 108px;
}

#installBtn:active {
    opacity: 0.9;
}
*/

// Manifest.json должен содержать:
/*
{
  "name": "Ваше приложение",
  "short_name": "Короткое имя",
  "start_url": "index.html",
  "display": "standalone",
  "background_color": "#цвет фона",
  "theme_color": "#цвет темы",
  "icons": [
    {
      "src": "путь/к/иконке.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "путь/к/иконке.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
*/

// Service Worker (sw.js) должен содержать базовую регистрацию и кэширование</content>
<parameter name="filePath">d:\MA\marifat\marifatv7\pwa-install.js