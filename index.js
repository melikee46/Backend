
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// EJS Ayarları
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 5 Felsefi Akım için Öneriler
const recommendations = {
    'nihilizm': {
        books: [
            { 
                title: 'Ecce Homo', 
                author: 'Friedrich Nietzsche', 
                description: 'Nietzsche\'nin kendi felsefesini özetlediği otobiyografik eser',
                
            }
        ],
        movies: [
            { 
                title: 'Fight Club', 
                year: 1999, 
                director: 'David Fincher', 
                description: 'Modern toplumun anlamsızlığına dair sert bir eleştiri',
                
            }
        ]
    },
    'stoacılık': {
        books: [
            { 
                title: 'Meditasyonlar', 
                author: 'Marcus Aurelius', 
                description: 'Roma İmparatoru\'nun stoacı felsefe notları',
                
            }
        ],
        movies: [
            { 
                title: 'Gladyatör', 
                year: 2000, 
                director: 'Ridley Scott', 
                description: 'Stoacı erdemlerin sinemadaki en iyi temsillerinden',
                
            }
        ]
    },
    'varoluşçuluk': {
        books: [
            { 
                title: 'Bulantı', 
                author: 'Jean-Paul Sartre', 
                description: 'Varoluşun absürtlüğü üzerine temel eser',
                
            }
        ],
        movies: [
            { 
                title: 'Yeraltı', 
                year: 1995, 
                director: 'Emir Kusturica', 
                description: 'Varoluşsal bunalımın epik anlatımı',
            
            }
        ]
    },
    'realizm': {
        books: [
            { 
                title: 'Madame Bovary', 
                author: 'Gustave Flaubert', 
                description: 'Gerçekçi edebiyatın başyapıtlarından',
                
            }
        ],
        movies: [
            { 
                title: 'Bisiklet Hırsızları', 
                year: 1948, 
                director: 'Vittorio De Sica', 
                description: 'İtalyan Yeni Gerçekçilik akımının şaheseri',
                
            }
        ]
        
    },
    'feminizm': {
        books: [
            { 
                title: 'Kendi Odanız', 
                author: 'Virginia Woolf', 
                description: 'Kadın yazarların toplumsal konumuna dair manifesto',
                
            }
        ],
        movies: [
            { 
                title: 'Kız Çocuğu', 
                year: 2016, 
                director: 'Maren Ade', 
                description: 'Modern feminizmin sinemadaki en güçlü temsillerinden',
                
            }
        ]
    }
};

// Ana sayfa
app.get('/', (req, res) => {
    res.render('index', { 
        recommendations: null, 
        philosophy: '', 
        error: null,
        allPhilosophies: Object.keys(recommendations) // Tüm akımları gönder
    });
});

// Öneri isteği
app.post('/recommend', (req, res) => {
    const input = req.body.philosophy.toLowerCase();
    const philosophy = Object.keys(recommendations).find(key => 
        key.toLowerCase() === input
    );
    
    if (philosophy) {
        res.render('index', {
            recommendations: recommendations[philosophy],
            philosophy: philosophy.charAt(0).toUpperCase() + philosophy.slice(1),
            error: null,
            allPhilosophies: Object.keys(recommendations)
        });
    } else {
        res.render('index', {
            recommendations: null,
            philosophy: input,
            error: 'Bu akım için öneri bulunamadı. Deneyebileceğiniz akımlar: ' + 
                   Object.keys(recommendations).join(', '),
            allPhilosophies: Object.keys(recommendations)
        });
    }
});

// Sunucu
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
