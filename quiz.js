// Quiz soruları
const questions = [
    {
        question: "Allen Iverson NBA'de hangi takım tarafından 1. sıradan draft edilmiştir?",
        options: ["Denver Nuggets", "Detroit Pistons", "Philadelphia 76ers", "Memphis Grizzlies"],
        correct: 2
    },
    {
        question: "Allen Iverson'ın NBA'de en çok konuşulan hareketlerinden biri olan crossover'ı hangi efsane oyuncuya karşı yapmıştır?",
        options: ["Kobe Bryant", "Michael Jordan", "LeBron James", "Shaquille O'Neal"],
        correct: 1
    },
    {
        question: "Iverson'ın 'Ankle Breaker' lakabını almasının sebebi nedir?",
        options: ["Çok fazla üçlük atması", "Rakiplerini sık sık crossover ile geçmesi", "Smaçlarıyla ünlü olması", "Savunmasıyla öne çıkması"],
        correct: 1
    },
    {
        question: "Iverson, NBA'de çaylak sezonunda hangi ödülü kazanmıştır?",
        options: ["En Değerli Oyuncu (MVP)", "Yılın Savunmacısı", "Yılın Çaylağı", "En Çok Gelişen Oyuncu"],
        correct: 2
    },
    {
        question: "Allen Iverson, Philadelphia 76ers'tan sonra hangi takıma takas edilmiştir?",
        options: ["Beşiktaş", "Denver Nuggets", "Detroit Pistons", "Memphis Grizzlies"],
        correct: 1
    },
    {
        question: "Allen Iverson'ın kariyerinde en yüksek sayı ortalamasına ulaştığı sezon hangi yıldır?",
        options: ["1996-1997", "2004-2005", "2007-2008", "2009-2010"],
        correct: 1
    },
    {
        question: "Allen Iverson, Türkiye'de hangi takımda kısa süre forma giymiştir?",
        options: ["Fenerbahçe", "Anadolu Efes", "Beşiktaş", "Galatasaray"],
        correct: 2
    },
    {
        question: "Allen Iverson'ın Beşiktaş'tan ayrılmasının nedeni nedir?",
        options: ["Sözleşme feshi", "Sakatlanıp ameliyat için ABD'ye dönmesi", "Takımda anlaşmazlık yaşaması", "Başka takıma transfer olması"],
        correct: 1
    },
    {
        question: "Allen Iverson'ın NBA'de ilk sezonunda en çok dikkat çeken özelliği hangisiydi?",
        options: ["Üçlük yüzdesi", "Crossover hareketleri", "Savunma blokları", "Takım liderliği"],
        correct: 1
    },
    {
        question: "Allen Iverson NBA kariyerini kaç yaşında sonlandırmıştır?",
        options: ["30", "33", "35", "38"],
        correct: 3
    }
];

let currentQuestion = 0; // acilacak olan ilk sorunun indeksi
let answers = new Array(questions.length).fill(-1); //baslangicta isaretli soru yok yani -1
let wrongAnswers = [];

// quiz'i baslat
function initializeQuiz() {
    const questionsContainer = document.getElementById('questions');
    const navContainer = document.querySelector('.quiz-nav');

    // soruları olustur
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = `question ${index === 0 ? 'active' : ''}`;
        questionDiv.id = `question-${index}`;

        questionDiv.innerHTML = `
            <h3>Soru ${index + 1}:</h3>
            <p>${q.question}</p>
            <div class="options">
                ${q.options.map((option, i) => `
                    <div class="option">
                        <input type="radio" name="q${index}" value="${i}" id="q${index}o${i}">
                        <label for="q${index}o${i}">${option}</label>
                    </div>
                `).join('')}
            </div>
            <div class="correct-answer" style="display: none; color: green; margin-top: 10px;">
                Doğru cevap: ${q.options[q.correct]}
            </div>
        `;
        questionsContainer.appendChild(questionDiv);

        // Soru numaralarını oluştur
        const numberBtn = document.createElement('span');
        numberBtn.className = 'question-number';
        numberBtn.textContent = index + 1;
        numberBtn.onclick = () => showQuestion(index);
        navContainer.appendChild(numberBtn);
    });

    updateNavigation();
}

// Soruyu göster
function showQuestion(index) {
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
    document.getElementById(`question-${index}`).classList.add('active');
    currentQuestion = index;
    updateNavigation();
}

// Sonraki soruya geç
function nextQuestion() {
    const currentAnswer = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    
    if (currentAnswer) {
        answers[currentQuestion] = parseInt(currentAnswer.value);
        
        if (currentQuestion === questions.length - 1) {
            finishQuiz();
        } else {
            showQuestion(currentQuestion + 1);
        }
    } else {
        alert('Lütfen bir cevap seçin!');
    }
}

// Önceki soruya dön
function previousQuestion() {
    if (currentQuestion > 0) {
        showQuestion(currentQuestion - 1);
    }
}

// nav butonlarını guncelle
function updateNavigation() {
    document.getElementById('prevBtn').style.display = currentQuestion > 0 ? 'block' : 'none';
    document.getElementById('nextBtn').textContent = 
        currentQuestion === questions.length - 1 ? 'Testi Bitir' : 'İlerle';

    document.querySelectorAll('.question-number').forEach((num, index) => {
        num.classList.toggle('current', index === currentQuestion);
    });
}

function finishQuiz() {
    wrongAnswers = answers.map((answer, index) => 
        answer !== questions[index].correct ? index + 1 : null
    ).filter(num => num !== null);

    document.querySelectorAll('.question-number').forEach((num, index) => {
        if (wrongAnswers.includes(index + 1)) {
            num.classList.add('wrong');
            document.querySelector(`#question-${index} .correct-answer`).style.display = 'block';
        }
    });

    const correctCount = questions.length - wrongAnswers.length;
    const totalScore = correctCount * 10;

    // Sonuçları göster
    document.getElementById('total-score').textContent = totalScore;
    document.getElementById('correct-count').textContent = correctCount;
    document.getElementById('wrong-count').textContent = wrongAnswers.length;
    document.getElementById('score-container').style.display = 'block';

    // Butonu devre dışı bırak
    document.getElementById('nextBtn').disabled = true;

   // alert(`Test bitti!\nToplam Puan: ${totalScore}/100\nDoğru sayısı: ${correctCount}\nYanlış sayısı: ${wrongAnswers.length}`);
}

// Sayfa yüklendiğinde quiz'i başlat
document.addEventListener('DOMContentLoaded', initializeQuiz);