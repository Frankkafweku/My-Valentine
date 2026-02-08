// Variable to track the scale of the "Yes" button
let yesScale = 1;

/**
 * Main function to switch between layers
 */
function nextLayer(layerNum) {
    // 1. START MUSIC on the first transition (Layer 2)
    const music = document.getElementById('bgMusic');
    if (music && music.paused) {
        music.play().catch(error => {
            console.log("Autoplay blocked. It will play on the next click!");
        });
    }

    // 2. Switch Layers
    const allLayers = document.querySelectorAll('.layer');
    allLayers.forEach(layer => layer.classList.remove('active'));

    const target = document.getElementById('layer' + layerNum);
    if (target) {
        target.classList.add('active');
    }

    // 3. Trigger Final Animations and Countdown
    if (layerNum === 5) {
        createConfetti();
        startCountdown();
    }
}

/**
 * Interaction: Moves the 'No' button and makes the 'Yes' button bigger
 */
function moveNoButton() {
    const noBtn = document.getElementById('noBtn');
    
    // Select the "Yes" button inside the CURRENT active layer (Layer 4)
    const yesBtn = document.querySelector('#layer4 .btn-yes');

    // Make the Yes button grow bigger every time they try to hit 'No'
    yesScale += 0.2; 
    if (yesBtn) {
        yesBtn.style.transform = `scale(${yesScale})`;
        yesBtn.style.zIndex = "1000"; // Ensure it stays on top
    }

    // Move the No button to a random spot
    const padding = 50;
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - padding);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - padding);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
}

/**
 * Final Celebration: Floating hearts and sparkles
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
 * Countdown Logic: Calculates time until Valentine's Day
 */
function startCountdown() {
    // Target: Midnight on Feb 14, 2026
    const targetDate = new Date("Feb 14, 2026 00:00:00").getTime();

    const timerInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Calculations for days, hours, minutes, and seconds
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        // Update HTML elements
        if (document.getElementById("days")) {
            document.getElementById("days").innerText = d.toString().padStart(2, '0');
            document.getElementById("hours").innerText = h.toString().padStart(2, '0');
            document.getElementById("minutes").innerText = m.toString().padStart(2, '0');
            document.getElementById("seconds").innerText = s.toString().padStart(2, '0');
        }

        // If it's officially Valentine's Day
        if (distance < 0) {
            clearInterval(timerInterval);
            const container = document.getElementById("countdown-container");
            if (container) container.innerHTML = "<h3>Happy Valentine's Day! ❤️</h3>";
        }
    }, 1000);
}