function nextLayer(layerNum) {
    // START MUSIC on the first transition
    const music = document.getElementById('bgMusic');
    if (music && music.paused) {
        music.play().catch(error => {
            console.log("Autoplay was prevented. Click again to play music!");
        });
    }

    const allLayers = document.querySelectorAll('.layer');
    allLayers.forEach(layer => layer.classList.remove('active'));

    const target = document.getElementById('layer' + layerNum);
    if (target) {
        target.classList.add('active');
    }

    if (layerNum === 5) {
        createConfetti();
    }
}
function moveNoButton() {
    const btn = document.getElementById('noBtn');
    const padding = 50;
    const x = Math.random() * (window.innerWidth - btn.offsetWidth - padding);
    const y = Math.random() * (window.innerHeight - btn.offsetHeight - padding);
    
    btn.style.position = 'fixed';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
}

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