module.exports = {
    'globDirectory': 'marineplanner-core/',
    'globPatterns': [
        '**/*.{html,css,js}'
    ],
    'globIgnores': [
        'apps/hnfp/hnfp/templates/hnfp/survey/**',
        'apps/hnfp/hnfp/data_catalog/**',
        'apps/mp-visualize/**',
        'apps/mp-drawing/**',
        'apps/mp-accounts/**',
        'apps/madrona-analysistools/**',
        'apps/madrona-features/**',
        'apps/madrona-manipulators/**',
        'apps/madrona-scenarios/**',
        'assets/**',
        'bower_components/**',
        'env/**',
        'marineplanner/**',
    ],
    'templatedUrls': {
        '/dashboard': [
            'apps/hnfp/hnfp/templates/base.html',
            'apps/hnfp/hnfp/templates/hnfp/index.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/extra_css.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/extra_head.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/extra_js.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/navbar.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/logos.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/footer.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/observation_icons.html',
            'apps/hnfp/hnfp/templates/hnfp/dashboard/alerts.html',
            'apps/hnfp/hnfp/templates/hnfp/dashboard/blog.html',
            'apps/hnfp/hnfp/templates/hnfp/dashboard/events.html',
            'apps/hnfp/hnfp/templates/hnfp/dashboard/observation.html',
            'apps/hnfp/hnfp/templates/hnfp/dashboard/open_positions.html',
            'apps/hnfp/hnfp/templates/hnfp/dashboard/weather.html',
        ],
        '/observation': [
            'apps/hnfp/hnfp/templates/base.html',
            'apps/hnfp/hnfp/templates/hnfp/index.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/extra_css.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/extra_head.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/extra_js.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/navbar.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/logos.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/footer.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/observation_icons.html',
            'apps/hnfp/hnfp/templates/hnfp/observation.html',
            'apps/hnfp/hnfp/templates/hnfp/observation_update.html',
            'apps/hnfp/hnfp/templates/hnfp/observation_confirm_delete.html',
            'apps/hnfp/hnfp/templates/hnfp/new_observation.html',
        ],
        '/observation/new/': [
            'apps/hnfp/hnfp/templates/base.html',
            'apps/hnfp/hnfp/templates/hnfp/index.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/extra_css.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/extra_head.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/extra_js.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/observation_icons.html',
            'apps/hnfp/hnfp/templates/hnfp/observation.html',
            'apps/hnfp/hnfp/templates/hnfp/new_observation.html',
        ],
        '/alert': [
            'apps/hnfp/hnfp/templates/base.html',
            'apps/hnfp/hnfp/templates/hnfp/index.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/extra_css.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/extra_head.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/extra_js.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/navbar.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/logos.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/footer.html',
            'apps/hnfp/hnfp/templates/hnfp/alert.html',
            'apps/hnfp/hnfp/templates/hnfp/new_alert.html',
            'apps/hnfp/hnfp/templates/hnfp/alert_update.html',
            'apps/hnfp/hnfp/templates/hnfp/alert_confirm_delete.html',
        ],
        '/alert/new/': [
            'apps/hnfp/hnfp/templates/base.html',
            'apps/hnfp/hnfp/templates/hnfp/index.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/extra_css.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/extra_head.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/extra_js.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/observation_icons.html',
            'apps/hnfp/hnfp/templates/hnfp/alert.html',
            'apps/hnfp/hnfp/templates/hnfp/new_alert.html',
        ],
        '/forum': [
            'apps/hnfp/hnfp/templates/base.html',
            'apps/hnfp/hnfp/templates/hnfp/index.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/extra_css.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/extra_head.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/extra_js.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/navbar.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/logos.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/footer.html',
            'apps/hnfp/hnfp/templates/hnfp/post_detail.html',
            'apps/hnfp/hnfp/templates/hnfp/post_list.html',
        ],
        '/forum': [
            'apps/hnfp/hnfp/templates/base.html',
            'apps/hnfp/hnfp/templates/hnfp/index.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/extra_css.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/extra_head.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/extra_js.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/navbar.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/logos.html',
            'apps/hnfp/hnfp/templates/hnfp/blocks/footer.html',
            'apps/hnfp/hnfp/templates/hnfp/post_detail.html',
            'apps/hnfp/hnfp/templates/hnfp/post_list.html',
        ]
    },
    'maximumFileSizeToCacheInBytes': 10 * 1024 * 1024, // 10mb max size
    'swDest': 'marineplanner-core/apps/hnfp/hnfp/static/sw.min.js',
    'swSrc': 'marineplanner-core/apps/hnfp/hnfp/static/sw.js',
};
