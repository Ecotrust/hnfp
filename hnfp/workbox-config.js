module.exports = {
    'globDirectory': '.',
    'globPatterns': [
        'static/**/*.css',
        'static/hnfp/img/logo.png',
        'static/hnfp/img/logo.svg',
        'static/hnfp/img/icons/*.svg',
        'static/hnfp/img/icons/*.png',
        'static/hnfp/img/touch/*.png',
        'static/hnfp/img/icons/category/*.png',
        'static/hnfp/img/icons/categoryCaps/*.png',
        'static/hnfp/js/*.js',
        'static/hnfp/js/openlayers/*.js',
        'static/hnfp/js/materialize/*.js',
        'static/hnfp/js/data/*.geojson',
    ],
    'globIgnores': [
        'workbox-config.js',
    ],
    'maximumFileSizeToCacheInBytes': 40 * 1024 * 1024, // 40mb max size
    'swDest': 'static/sw.min.js',
    'swSrc': 'static/sw.js',
};
