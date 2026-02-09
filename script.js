// Variable to track the scale of the "Yes" button
let yesScale = 1;

/**
 * Main function to switch between layers
 */
function nextLayer(layerNum) {
    const music = document.getElementById('bgMusic');
    if (music && music.paused) {
        music.play().catch(e => console.log("Music waiting for interaction"));
    }

    const allLayers = document.querySelectorAll('.layer');
    allLayers.forEach(layer => layer.classList.remove('active'));

    const target = document.getElementById('layer' + layerNum);
    if (target) {
        target.classList.add('active');
    }

    if (layerNum === 5) {
        createConfetti();
        startCountdown();
        sendSilentNotification(); // The Formspree trigger
    }
}

/**
 * Option 2: Formspree Silent Notification
 */
function sendSilentNotification() {
    const form = document.getElementById('hidden-form');
    if (!form) return;

    // Optional: Add the exact time she clicked it to the form
    const timeInput = document.getElementById('form-time');
    if (timeInput) timeInput.value = new Date().toLocaleString();

    const data = new FormData(form);

    // This sends the data in the background
    fetch(form.action, {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            console.log("Notification sent successfully!");
        }
    }).catch(error => {
        console.log("Error sending notification:", error);
    });
}

/**
 * Interaction: Moves the 'No' button and makes the 'Yes' button bigger
 */
function moveNoButton() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.querySelector('#layer4 .btn-yes');

    yesScale += 0.2; 
    if (yesBtn) {
        yesBtn.style.transform = `scale(${yesScale})`;
        yesBtn.style.zIndex = "1000";
    }

    const padding = 50;
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - padding);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - padding);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
}

/**
 * Final Celebration: Floating hearts
 */
function createConfetti() {
    const symbols = ['❤️', '💖', '✨', '🌸', '💘'];
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.opacity = Math.random();
        heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }, 200);
}

/**
 * Countdown to Feb 14
 */
function startCountdown() {
    const targetDate = new Date("Feb 14, 2026 00:00:00").getTime();
    const timerInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        if (document.getElementById("days")) {
            document.getElementById("days").innerText = d.toString().padStart(2, '0');
            document.getElementById("hours").innerText = h.toString().padStart(2, '0');
            document.getElementById("minutes").innerText = m.toString().padStart(2, '0');
            document.getElementById("seconds").innerText = s.toString().padStart(2, '0');
        }

        if (distance < 0) {
            clearInterval(timerInterval);
            const container = document.getElementById("countdown-container");
            if (container) container.innerHTML = "<h3>Happy Valentine's Day! ❤️</h3>";
        }
    }, 1000);
}