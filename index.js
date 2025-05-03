const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware ayarları
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Sabit veriler (sadece realizm için)
const recommendations = {
    'realizm': {
        'books': [
            { title: 'Madame Bovary', author: 'Gustave Flaubert', description: 'Gerçekçi edebiyatin başyapıtlarından biri olan bu roman, burjuva yaşamının yüzeyselliğini eleştirir.' },
            { title: 'Savaş ve Barış', author: 'Lev Tolstoy', description: 'Tarihsel gerçekçiliğin en önemli örneklerinden biri, Napolyon dönemi Rusyasını anlatır.' },
            { title: 'Kırmızı ve Siyah', author: 'Stendhal', description: 'Toplumsal yükseliş ve aşk üzerine gerçekçi bir roman.' }
        ],
        'movies': [
            { title: 'Bicycle Thieves (Bisiklet Hırsızları)', year: 1948, director: 'Vittorio De Sica', description: 'İtalyan Yeni Gerçekçilik akımının en önemli filmlerinden biri.' },
            { title: 'The Grapes of Wrath (Gazap Üzümleri)', year: 1940, director: 'John Ford', description: 'Büyük Buhran döneminde bir ailenin yaşadıklarını anlatır.' },
            { title: 'Tokyo Story (Tokyo Hikayesi)', year: 1953, director: 'Yasujirō Ozu', description: 'Japon aile yapısındaki değişimi gerçekçi bir şekilde ele alır.' }
        ],
        'series': [
            { title: 'The Wire', year: '2002-2008', creator: 'David Simon', description: 'Baltimore\'daki uyuşturucu ticareti, liman işçileri, siyaset ve eğitim sistemini gerçekçi bir şekilde ele alır.' },
            { title: 'Mad Men', year: '2007-2015', creator: 'Matthew Weiner', description: '1960\'ların reklam dünyasını ve toplumsal değişimleri anlatır.' },
            { title: 'The Crown', year: '2016-', creator: 'Peter Morgan', description: 'Kraliçe II. Elizabeth\'in saltanatının tarihsel gerçeklere dayalı dramatizasyonu.' }
        ]
    }
};

// Ana sayfa
app.get('/', (req, res) => {
    res.render('index', { recommendations: null, philosophy: '' });
});

// Öneri isteği
app.post('/recommend', (req, res) => {
    const philosophy = req.body.philosophy.toLowerCase();
    
    if (philosophy === 'realizm' || philosophy === 'realizim') {
        res.render('index', { 
            recommendations: recommendations['realizm'], 
            philosophy: 'Realizm' 
        });
    } else {
        res.render('index', { 
            recommendations: null, 
            philosophy: philosophy,
            error: 'Üzgünüz, sadece "Realizm" için önerilerimiz bulunmaktadır.' 
        });
    }
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});