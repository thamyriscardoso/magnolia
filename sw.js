
const CACHE_NAME = 'magnolia-cache';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll([
                '/magnolia/',
                '/magnolia/index.html',
                '/magnolia/cursos.html',
                '/magnolia/professores.html',
                '/magnolia/producao.html',
                '/magnolia/matricula.html',
                '/magnolia/matricula_google.html',
                '/magnolia/sobre.html',
                '/magnolia/contato.html',
                'magnolia/img/mag-logo.png',
                'magnolia/img/cinema.jpg',
                'magnolia/img/educacao.jpeg',
                'magnolia/img/humilde.png',
                'magnolia/img/icon.png',
                'magnolia/img/literatura.jgg',
                'magnolia/img/livia.jpg',
                'magnolia/img/music.jpg',
                'magnolia/img/pagano.jpg',
                'magnolia/img/pintura.jpg',
                'magnolia/img/producao.jpg',
                'magnolia/img/sad.png',
                'magnolia/img/teatro.jpg',
                'magnolia/img/thalis.jpg',
                'magnolia/css/style.css',
                'magnolia/sw.js',
                'magnolia/service.js'
            ])
        })
    )
});

self.addEventListener('install', function (event) {
    var offlinePage = new Request('offline.html');
    event.waitUntil(
        fetch(offlinePage).then(function (response) {
            return caches.open('pwabuilder-offline').then(function (cache) {
                console.log('[PWA Builder] Cached offline page during Install' + response.url);
                return cache.put(offlinePage, response);
            });
        }));
});


self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request).catch(function (error) {
            console.error('[PWA Builder] Network request Failed. Serving offline page ' + error);
            return caches.open('pwabuilder-offline').then(function (cache) {
                return cache.match('offline.html');
            });
        }));
});

self.addEventListener('refreshOffline', function (response) {
    return caches.open('pwabuilder-offline').then(function (cache) {
        console.log('[PWA Builder] Offline page updated from refreshOffline event: ' + response.url);
        return cache.put(offlinePage, response);
    });
});
