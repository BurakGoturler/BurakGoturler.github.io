const questions = [
    "askim benim için leylek kostümü giyip sokakta gezer miydin???",
    "askim solucan olsam beni sever miydin?????",
    "askim ilkokulda sınıf başkanlığı için oyunu bana verir miydin???",
    "askim ağzımdan çıkardığım sakızı çiğner miydin?",
    "askim hamam böceği olsam beni eline alıp sever miydin??",
    "askim eğer ben her gün solan bir çiçek olsam beni koklamak için hergün yeniden alır mıydın?????",
    "askim bir dondurma olsam beni yalarken dilin donar mıydı?",
    "askim bir hamburger olsam seni doyurabilir miydim yoksa sadece mideni mi bulandırırdım???",
    "askim evde kalmak yerine yağmurlu bir günde ben istiyorum diye benimle dışarıda çamurlara batıp eğlenir miydin??",
];

document.getElementById("questionButton").addEventListener("click", displayRandomQuestion);

function displayRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];
    document.getElementById("questionDisplay").textContent = randomQuestion;
}

function displayRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];

    const emojiList = ["🍰", "🍭", "🍬", "🎂", "🍦", "🍪", "🍫", "🧁"]; // Soruyla ilişkili emoji listesi
    const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)]; // Rastgele emoji seçme

    const questionDisplay = document.getElementById("questionDisplay");
    questionDisplay.innerHTML = `<span style="font-size: 30px;">${randomEmoji}</span> ${randomQuestion} <span style="font-size: 30px;">${randomEmoji}</span>`;

    // Rastgele renk oluştur
    const randomColor = generateRandomColor();
    questionDisplay.style.color = randomColor;

    // Puanlama yıldızlarını ekle
    const starContainer = document.createElement("div");
    starContainer.classList.add("starContainer");
    for (let i = 1; i <= 10; i++) {
        const star = document.createElement("span");
        star.textContent = "★";
        star.classList.add("star");
        star.dataset.rating = i;
        star.addEventListener("click", () => {
            const rating = parseInt(star.dataset.rating);
            highlightStars(rating);
            showNotification(`askim tarafından "${randomQuestion}" sorusuna gelen cevaba puanım ${rating}.`);
        });
        starContainer.appendChild(star);
    }

    // Eğer daha önce yıldız konteyneri eklenmişse kaldır
    const existingStarContainer = document.querySelector(".starContainer");
    if (existingStarContainer) {
        existingStarContainer.remove();
    }

    questionDisplay.appendChild(starContainer);
}

function highlightStars(rating) {
    const stars = document.querySelectorAll(".star");
    stars.forEach(star => {
        if (parseInt(star.dataset.rating) <= rating) {
            star.classList.add("filled");
        } else {
            star.classList.remove("filled");
        }
    });
}

function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("notification", "show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

// Rastgele renk üretme fonksiyonu
function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Paylaşma butonuna tıklama olayını dinle
document.getElementById("shareButton").addEventListener("click", () => {
    // Puanlama sonucunu al
    const notificationText = document.getElementById("notification").textContent;
    // Bildirimden metni al ve paylaşma metnini oluştur
    const shareText = notificationText.split('"')[1].trim();
    // Paylaşma linkini oluştur
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    
    // Twitter'da paylaşma
    window.open(shareUrl, "_blank");
});


// Paylaşma butonuna tıklama olayını dinle
document.getElementById("shareButton2").addEventListener("click", () => {
    // Puanlama sonucunu al
    const notificationText = document.getElementById("notification").textContent;
    // Bildirimden metni al ve paylaşma metnini oluştur
    const shareText = notificationText.split('"')[1].trim();
    // Paylaşma linkini oluştur (WhatsApp)
    const whatsappShareUrl = `whatsapp://send?text=${encodeURIComponent(shareText)}`;

    // WhatsApp'ta paylaşma
    window.open(whatsappShareUrl);
});

