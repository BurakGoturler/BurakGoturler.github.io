// Uçuşan kalpler animasyonu
document.addEventListener('DOMContentLoaded', () => {
    const heartsBg = document.querySelector('.hearts-bg');
    if (!heartsBg) return;

    // Çeşitli kalp, yıldız ve çiçek emojileri
    const heartEmojis = [
        '💖','💗','💓','💞','💝','💘','❤️','🩷','🧡','💜','💙','💚','💛',
        '✨','🌸','🌺','🌷','⭐','🦋','🌼','🌻','🌟'
    ];
    // Farklı renkler (kalplerin rengi için)
    const heartColors = [
        '#e75480', '#ff69b4', '#ffb6b9', '#fbb1b1', '#f9c6d1', '#a14a76', '#ffb347', '#b19cd9', '#f7cac9', '#f6e3e3'
    ];
    const maxHearts = 18;

    function randomBetween(a, b) {
        return a + Math.random() * (b - a);
    }

    function createHeart() {
        const heart = document.createElement('span');
        heart.className = 'heart-anim';
        heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = randomBetween(2, 98) + 'vw';
        heart.style.fontSize = randomBetween(18, 32) + 'px';
        heart.style.animationDuration = randomBetween(4, 8) + 's';
        heart.style.opacity = randomBetween(0.7, 0.95);
        heart.style.setProperty('--heart-rotate', randomBetween(-20, 20) + 'deg');
        // Renk çeşitliliği için
        heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
        heartsBg.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    // Kalp üretimini başlat
    setInterval(() => {
        if (document.querySelectorAll('.heart-anim').length < maxHearts) {
            createHeart();
        }
    }, 600);
});

// Kedi Kalp Toplama Oyunu
class CatHeartGame {
    constructor() {
        this.gameArea = document.getElementById('gameArea');
        this.catPlayer = document.getElementById('catPlayer');
        this.startBtn = document.getElementById('startBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.scoreValue = document.querySelector('.score-value');
        this.timeValue = document.querySelector('.time-value');
        
        this.gameRunning = false;
        this.score = 0;
        this.timeLeft = 30;
        this.catPosition = { x: 200, y: 150 };
        this.hearts = [];
        this.gameInterval = null;
        this.timeInterval = null;
        
        this.init();
    }
    
    init() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.restartBtn.addEventListener('click', () => this.restartGame());
        this.setupKeyboardControls();
        this.setupTouchControls();
        this.positionCat();
    }
    
    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning) return;
            
            const step = 20;
            switch(e.key.toLowerCase()) {
                case 'arrowleft':
                case 'a':
                    this.moveCat(-step, 0);
                    break;
                case 'arrowright':
                case 'd':
                    this.moveCat(step, 0);
                    break;
                case 'arrowup':
                case 'w':
                    this.moveCat(0, -step);
                    break;
                case 'arrowdown':
                case 's':
                    this.moveCat(0, step);
                    break;
            }
        });
    }
    
    setupTouchControls() {
        // Butonları bul
        const upBtn = document.getElementById('upBtn');
        const downBtn = document.getElementById('downBtn');
        const leftBtn = document.getElementById('leftBtn');
        const rightBtn = document.getElementById('rightBtn');
        
        // Butonların var olduğunu kontrol et
        if (!upBtn || !downBtn || !leftBtn || !rightBtn) {
            console.log('Dokunmatik kontrol butonları bulunamadı');
            return;
        }
        
        const step = 20;
        
        // Touch event'ler için fonksiyon
        const handleTouch = (direction) => {
            return (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Touch event:', direction);
                if (this.gameRunning) {
                    switch(direction) {
                        case 'up': this.moveCat(0, -step); break;
                        case 'down': this.moveCat(0, step); break;
                        case 'left': this.moveCat(-step, 0); break;
                        case 'right': this.moveCat(step, 0); break;
                    }
                }
            };
        };
        
        // Click event'ler için fonksiyon
        const handleClick = (direction) => {
            return (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Click event:', direction);
                if (this.gameRunning) {
                    switch(direction) {
                        case 'up': this.moveCat(0, -step); break;
                        case 'down': this.moveCat(0, step); break;
                        case 'left': this.moveCat(-step, 0); break;
                        case 'right': this.moveCat(step, 0); break;
                    }
                }
            };
        };
        
        // Touch event'leri ekle
        upBtn.addEventListener('touchstart', handleTouch('up'), { passive: false });
        downBtn.addEventListener('touchstart', handleTouch('down'), { passive: false });
        leftBtn.addEventListener('touchstart', handleTouch('left'), { passive: false });
        rightBtn.addEventListener('touchstart', handleTouch('right'), { passive: false });
        
        // Click event'leri ekle (tablet ve desktop için)
        upBtn.addEventListener('click', handleClick('up'));
        downBtn.addEventListener('click', handleClick('down'));
        leftBtn.addEventListener('click', handleClick('left'));
        rightBtn.addEventListener('click', handleClick('right'));
        
        console.log('Dokunmatik kontroller başarıyla kuruldu');
        
        // Test için butonlara tıklama efekti ekle
        [upBtn, downBtn, leftBtn, rightBtn].forEach(btn => {
            btn.addEventListener('touchstart', () => {
                btn.style.transform = 'scale(0.9)';
            });
            btn.addEventListener('touchend', () => {
                btn.style.transform = 'scale(1)';
            });
        });
    }
    
    startGame() {
        this.gameRunning = true;
        this.score = 0;
        this.timeLeft = 30;
        this.hearts = [];
        
        this.startBtn.style.display = 'none';
        this.restartBtn.style.display = 'inline-block';
        
        this.updateScore();
        this.updateTime();
        
        // Kalp üretimi
        this.gameInterval = setInterval(() => {
            this.createHeart();
        }, 1500);
        
        // Zaman sayacı
        this.timeInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTime();
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
        
        // İlk kalp
        setTimeout(() => this.createHeart(), 500);
    }
    
    restartGame() {
        this.endGame();
        // Oyun bitti mesajını temizle
        const gameOverDiv = this.gameArea.querySelector('.game-over');
        if (gameOverDiv) {
            gameOverDiv.remove();
        }
        this.startGame();
    }
    
    endGame() {
        this.gameRunning = false;
        clearInterval(this.gameInterval);
        clearInterval(this.timeInterval);
        
        // Tüm kalpleri temizle
        document.querySelectorAll('.heart-item').forEach(heart => heart.remove());
        
        // Önceki oyun bitti mesajını temizle
        const existingGameOver = this.gameArea.querySelector('.game-over');
        if (existingGameOver) {
            existingGameOver.remove();
        }
        
        // Oyun bitti mesajı
        this.showGameOver();
    }
    
    showGameOver() {
        const gameOverDiv = document.createElement('div');
        gameOverDiv.className = 'game-over';
        gameOverDiv.innerHTML = `
            <h3>hll</h3>
            <p>Toplam Skor: <strong>${this.score}</strong></p>
            <p>${this.getScoreMessage()}</p>
        `;
        
        this.gameArea.appendChild(gameOverDiv);
        
        setTimeout(() => {
            gameOverDiv.remove();
        }, 3000);
    }
    
    getScoreMessage() {
        if (this.score >= 20) return "hll";
        if (this.score >= 15) return "güzel";
        if (this.score >= 10) return "bence daha iyisini yapabilirsin";
        if (this.score >= 5) return "ehh";
        return "Tekrar dene";
    }
    
    createHeart() {
        if (!this.gameRunning) return;
        
        const heart = document.createElement('div');
        heart.className = 'heart-item';
        heart.innerHTML = ['💖', '💗','💞', '💝', '💘', '❤️', '🩷'][Math.floor(Math.random() * 8)];
        
        const x = Math.random() * (this.gameArea.offsetWidth - 40);
        const y = Math.random() * (this.gameArea.offsetHeight - 40);
        
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        
        this.gameArea.appendChild(heart);
        
        // Kalp ile kedi arasındaki mesafeyi kontrol et
        const checkCollision = () => {
            if (!this.gameRunning) return;
            
            const heartRect = heart.getBoundingClientRect();
            const catRect = this.catPlayer.getBoundingClientRect();
            
            if (this.checkCollision(heartRect, catRect)) {
                this.collectHeart(heart);
            } else {
                requestAnimationFrame(checkCollision);
            }
        };
        
        checkCollision();
        
        // Kalp 3 saniye sonra kaybolur
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, 3000);
    }
    
    checkCollision(rect1, rect2) {
        return rect1.left < rect2.right &&
               rect1.right > rect2.left &&
               rect1.top < rect2.bottom &&
               rect1.bottom > rect2.top;
    }
    
    collectHeart(heart) {
        heart.remove();
        this.score++;
        this.updateScore();
        
        // Toplama efekti
        this.catPlayer.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.catPlayer.style.transform = 'scale(1)';
        }, 150);
    }
    
    moveCat(dx, dy) {
        const newX = Math.max(0, Math.min(this.gameArea.offsetWidth - 40, this.catPosition.x + dx));
        const newY = Math.max(0, Math.min(this.gameArea.offsetHeight - 40, this.catPosition.y + dy));
        
        this.catPosition.x = newX;
        this.catPosition.y = newY;
        
        this.catPlayer.style.left = newX + 'px';
        this.catPlayer.style.top = newY + 'px';
    }
    
    positionCat() {
        this.catPlayer.style.left = this.catPosition.x + 'px';
        this.catPlayer.style.top = this.catPosition.y + 'px';
    }
    
    updateScore() {
        this.scoreValue.textContent = this.score;
    }
    
    updateTime() {
        this.timeValue.textContent = this.timeLeft;
    }
}

// Oyunu başlat
document.addEventListener('DOMContentLoaded', () => {
    new CatHeartGame();

});
