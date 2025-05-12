const grid = document.getElementById('grid');
const timerElement = document.getElementById('timer');
const messageElement = document.getElementById('message');
const replayButton = document.getElementById('replayButton');

let firstCard = null;
let secondCard = null;
let locked = false;
let timeLeft = 60;
let timerId = null;
let startTime = null;
let matchedPairs = 0;

// Fotoğraf çiftleri için dizi
const photos = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8yQhW1_vi_uKTXeCSijKfYqyPuRwopK5yEpwKvE_uy-ZOoV21Inl73VwkD_1ZKCz8fKg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI1Lx1w8kOqKf1GCpfo3BP-kVrTdz4H3xfjA&s',
    'https://thumbs.dreamstime.com/b/denver-nuggets-logo-vector-basketball-team-280530792.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyK6Ha5AVQBBVW-tckbrMNGDG8tJ3636Rfzg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8sO5hp0PecCefWA1EJrmduug7hYW1MAfnI7rJRRhtctUfxZesN0L-ZjjHH4oX0ItaYGI&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG__V0VqA3EB9J9keuaFHwX35QenbM-cweGg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdmXA01-LIcJC4hu8tV3z6FxgPakHy29vLNw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRnQ_LtAeHysFpgJxvO3QFYEDkXqU_dWv8MA&s'
];

// Timer fonksiyonu
function startTimer() {
    startTime = Date.now();
    timeLeft = 60;
    timerId = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Süre: ${timeLeft}`;
        
        if (timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

// Oyunu bitir
function endGame(won) {
    clearInterval(timerId);
    locked = true;
    
    if (won) {
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        messageElement.textContent = `Tebrikler! ${timeTaken} saniyede bitirdiniz!`;
    } else {
        messageElement.textContent = 'Süre doldu!';
    }
    messageElement.style.display = 'block';
}

// Kartları karıştır ve çiftleri oluştur
function createCards() {
    const pairs = [...photos, ...photos];
    return pairs.sort(() => Math.random() - 0.5);
}

// Kart elementi oluştur
function createCardElement(photo, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;
    
    const frontImg = document.createElement('img');
    frontImg.src = 'favicon.png';
    frontImg.dataset.photo = photo;
    
    card.appendChild(frontImg);
    return card;
}

// Kartı çevir
function flipCard(card) {
    if (locked || card === firstCard || card.classList.contains('matched')) return;
    
    const img = card.querySelector('img');
    img.src = img.dataset.photo;
    
    if (!firstCard) {
        firstCard = card;
        return;
    }
    
    secondCard = card;
    checkMatch();
}

// Eşleşme kontrolü
function checkMatch() {
    locked = true;
    const img1 = firstCard.querySelector('img');
    const img2 = secondCard.querySelector('img');
    
    if (img1.dataset.photo === img2.dataset.photo) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;
        
        if (matchedPairs === 8) {
            endGame(true);
        }
        resetCards();
    } else {
        setTimeout(() => {
            img1.src = '../favicon.png';
            img2.src = '../favicon.png';
            resetCards();
        }, 1000);
    }
}

// Kartları sıfırla
function resetCards() {
    firstCard = null;
    secondCard = null;
    locked = false;
}

// Oyunu sıfırla
function resetGame() {
    clearInterval(timerId);
    grid.innerHTML = '';
    messageElement.style.display = 'none';
    firstCard = null;
    secondCard = null;
    locked = false;
    matchedPairs = 0;
    initGame();
}

// Oyunu başlat
function initGame() {
    const cards = createCards();
    cards.forEach((photo, index) => {
        const card = createCardElement(photo, index);
        card.addEventListener('click', () => flipCard(card));
        grid.appendChild(card);
    });
    startTimer();
}

// Tekrar oyna butonuna tıklama
replayButton.addEventListener('click', resetGame);

// Oyunu başlat
initGame();
