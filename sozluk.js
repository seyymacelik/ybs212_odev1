// Terimleri tanımla
const terms = {
        "Alley-Oop": "Hücum oyuncusunun topu potaya yakın bir noktaya atması ve bir diğer hücum oyuncusunun havadayken topu yere sektirmeden smaçla sayı yapmasına alley-oop denir.",
        "Asist": "Hücum oyuncusunun, takım arkadaşına verdiği ve arkadaşının sayı atmasıyla sonuçlanan pastır.",
        "Back Court": "Arka saha olarak çevrilen back court, takımın savunma yaptığı yarı sahaya denir. Hücum eden takımın, rakip yarı sahaya geçtikten sonra kendi yarı sahasına geri dönmesi ise top kaybına sebep olan 'Back Court Violation' olarak adlandırılır.",
        "Bench": "Yedek oyuncuların oturduğu banka, bench denir. Yedek oyuncuların maça girdikten sonra bulduğu sayılar için de 'benchen gelen sayı' ifadesi kullanılır.",
        "Boxout": "Rakip oyuncu ile pota arasında, vücut kullanılarak pozisyon alınmaya denir. Bu sayede rakibin ribaunt alması engellenir.",
        "Boyalı Alan": "Basketbol sahasında yer alan ve kendisine ait bazı kuralları olan bir yer, boyalı alan. Serbest atış çizgisi, pota ve yan şerit çizgileri arasında, genellikle renkli olarak belirtilen alandır. Savunma ve hücum oyuncusunun burada 3 saniyeden fazla kalamama kuralı sebebiyle buraya 3 Saniye Koridoru da deniyor.",
        "Blok": "Savunma oyuncusunun, hücum oyuncusunun şutunu engellemesidir.",
        "Buzzer": "Hücum süresi dolması, periyot & maç başlaması ve bitmesi anlarında çalan uyarı sesidir. Uyarı çalmadan hemen önce topun potaya gönderilmesi ve uyarı esnasında sayı olması durumuna ise 'Buzzer Beater' denir.",
        "Charging": "Hücum eden takımdan bir oyuncunun savunma oyuncusuna faul yapması durumuna verilen isimdir. Hücum faul olarak çevrilmektedir.",
        "Crossover": "Elinde top olan hücum oyuncusunun bacak arası, önden, arkadan gibi çeşitli yöntemlerle el değiştirmesi ve savunma oyuncusundan topu saklamasıdır.",
        "Double-Double": "Bir oyuncunun istatistiklerdeki metriklerin ikisinde 10'un üzerine çıkması durumudur. Asist, sayı, top çalma, ribaunt, blok istatistiklerinden ikisinin çift haneli olmasıdır. İstatistiklerde 3 metrikte çift haneli sayılara ulaşmaya 'Tripple-Double', 4 metriktekine 'Quadruple-Double', hepsinde 10'un üstüne çıkmaya 'Quintuple-Double' denir.",
        "Double Dribble": "Topu çift elle sektirmek veya top sürdükten sonra topu tutup tekrar sürmeye başlamakla oluşan kural hatasıdır.",
        "Double-Team": "Rakip oyuncuya ikili savunma yaparak baskı oluşturma.",
        "Dribbling": "Sektirerek top sürme hareketidir.",
        "Fadeaway": "Hücum oyuncusunun sıçradıktan sonra geriye çekilerek şut atmasına denir.",
        "Fastbreak": "Hücum takımının hızlı bir şekilde hücuma kalkıp savunma takımını hazırlıksız yakalanmasıdır.",
        "Jump Shot": "Hücum oyuncusunun zıplayarak kullandığı şut türüdür.",
        "Panya": "'Backboard' olarak da geçen, pota çemberinin arkasında yer alan kare alan. Bu kareye çarptırılarak giren atışlara 'panyalı şut' denmektedir.",
        "Penetration": "Hücum oyuncusunun hızlı bir şekilde potaya doğru hareketlenmesi, 'penetre etmesi'.",
        "Pick&Roll": "Hücum takımında bir oyuncunun, topu tutan takım arkadaşının yanına gelip perdeleme yaptıktan sonra potaya doğru hareketlenip pası alıp sayı yapmasına denir.",
        "Ribaunt": "Potadan veya çemberden seken topun savunma veya hücum oyuncusu tarafından kontrol edilmesidir. Hücum eden takım topu alırsa hücum ribaunt, savunma yapan takım topu alırsa savunma ribauntu olur.",
        "Screen": "Perdeleme olarak Türkçe'ye geçen 'screen' hücumdayken rakip oyuncuyu engelleyerek takım arkadaşına pozisyon yaratma ve savunma oyuncusundan kurtulma hareketidir.",
        "Serbest Atış": "Bir puan değerinde olan ve faul sonrasında ortaya çıkan atış türüdür. 'Serbest atış çizgisi' denilen yerden atılır.",
        "Smaç": "Hücum oyuncusunun sıçrayarak doğrudan potaya tutunup topun potaya bırakmasıdır.",
        "Time Out": "Maç içerisinde mola almaktır.",
        "Turnike": "Hücum oyuncusunun topu sürdükten sonra tutup iki adım attıktan sonra sayı yapmasıdır.",
        "Turnover": "Kurallara aykırı hareket etme (3 saniye - 9 saniye gibi), topu dışarı çıkarma veya rakibe kaptırmaya 'turnover' yani 'top kaybı' denir."
};

// DOM yüklendiğinde çalışacak fonksiyon
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResult = document.getElementById('searchResult');
    const termsContainer = document.getElementById('terms');

    // terimleri sayfaya ekle
    for (let [term, definition] of Object.entries(terms)) {
        termsContainer.innerHTML += `
            <div class="term" id="${term.toLowerCase().replace(/\s/g, '-')}">
                <h3>${term}</h3>
                <p>${definition}</p>
            </div>
        `;
    }

    // arama fonksiyonu
    function searchTerm() {
        const searchText = searchInput.value.toLowerCase();
        let found = false;

        for (let [term, definition] of Object.entries(terms)) {
            if (term.toLowerCase().includes(searchText) || 
                definition.toLowerCase().includes(searchText)) {
                found = true;
                const element = document.getElementById(term.toLowerCase().replace(/\s/g, '-'));
                element.scrollIntoView({ behavior: 'smooth' });
                break;
            }
        }

        searchResult.style.display = found || searchText === '' ? 'none' : 'block';
    }

    // ara butonuna tıklama olayı
    searchButton.addEventListener('click', searchTerm);

    // enter tuşuna basılınca arama yapma
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchTerm();
        }
    });
});