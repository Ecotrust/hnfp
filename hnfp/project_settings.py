"""
Django settings for marineplanner project.

Generated by 'django-admin startproject' using Django 1.10.5.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.10/ref/settings/
"""


import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ASSETS_DIR = os.path.realpath(os.path.join(BASE_DIR, '..', 'assets'))
STYLES_DIR = os.path.realpath(os.path.join(ASSETS_DIR, 'styles'))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.10/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '-u*-d*&7j=c7a7&k5u6e61b4-t=d8ce^2k=jhox#cn8iy8m_%d'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['localhost', '*.hoonahstewards.net', 'hoonahstewards.net', '52.35.10.181', '172.31.2.211', 'www.hoonahstewards.net']

# Application definition

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    ## remove for production
    # 'livereload.middleware.LiveReloadScript'
]

ROOT_URLCONF = 'marineplanner.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.template.context_processors.media',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'marineplanner.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.10/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        # 'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        'NAME': 'marineplanner',
        'USER': 'postgres',
    }
}

# Password validation
# https://docs.djangoproject.com/en/1.10/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.10/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/Los_Angeles'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.10/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

STATICFILES_DIRS = (
    STYLES_DIR,
    ASSETS_DIR,
)

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

### Caches
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': '/env/bin/django_cache',
    }
}

### Django compressor (mp-visualize/base.html)
COMPRESS_ENABLED = False
COMPRESS_URL = STATIC_URL
COMPRESS_ROOT = STATIC_ROOT
COMPRESS_OUTPUT_DIR = 'CACHE'
COMPRESS_STORAGE = 'compressor.storage.CompressorFileStorage'
COMPRESS_VERBOSE = False
COMPRESS_PARSER = 'compressor.parser.AutoSelectParser'
COMPRESS_DEBUG_TOGGLE = 'None'

COMPRESS_JS_COMPRESSOR = 'compressor.js.JsCompressor'
COMPRESS_JS_FILTERS = ['compressor.filters.jsmin.JSMinFilter']

COMPRESS_CSS_COMPRESSOR = 'compressor.css.CssCompressor'
COMPRESS_CSS_FILTERS = [
    'compressor.filters.css_default.CssAbsoluteFilter'
]
COMPRESS_CSS_HASHING_METHOD = 'mtime'
COMPRESS_MTIME_DELAY = 10

COMPRESS_PRECOMPILERS = (
    ('text/x-scss', 'django_libsass.SassCompiler'),
    ('text/x-sass', 'django_libsass.SassCompiler'),
    ('text/less', 'lessc {infile} {outfile}'),
)
COMPRESS_CACHEABLE_PRECOMPILERS = ()

COMPRESS_CACHE_KEY_FUNCTION = 'compressor.cache.simple_cachekey'
COMPRESS_CACHE_BACKEND = 'default'

COMPRESS_OFFLINE = True
COMPRESS_OFFLINE_CONTEXT = {}
COMPRESS_OFFLINE_MANIFEST = 'manifest.json'
COMPRESS_REBUILD_TIMEOUT = 60000
COMPRESS_MINT_DELAY = 40

STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'django.contrib.staticfiles.finders.DefaultStorageFinder',
    'compressor.finders.CompressorFinder',
]

KML_SIMPLIFY_TOLERANCE = 20 #meters
KML_SIMPLIFY_TOLERANCE_DEGREES = 0.0002 # very roughly ~ 20 meters
KML_EXTRUDER_HEIGHT = 100
KML_ALTITUDEMODE_DEFAULT = 'absolute'

### Note: This MUST be set before importing project_settings, even though
#       INSTALLED_APPS is the first thing project_settings sets.
#       Because... django? ¯\_(?)_/¯
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'django.contrib.contenttypes',

    ### ADD DJANGO APPS ###
    'django.contrib.gis',
    ### END ADD DJANGO APPS ###

    ### REMOVE for production apps ##
    # 'livereload',
    ### END remove for prod ###

    ### ADD APPS ###
    'marineplanner',
    'core',
    'compressor',
    'import_export',
    'django_comments_xtd',
    'django_comments',
    ### END ADD APPS ###

    ### BEGIN INSERTED INSTALLED APPS ###
    'hnfp',
    'features',
    'manipulators',
    'accounts',
    'data_manager',
    'visualize',
    'nursery',
    'drawing',
    # 'scenarios',
    # 'analysistools',
    'rpc4django',
    'ckeditor',
    ### END INSERTED INSTALLED APPS ###

    ### BEGIN MISSING APPS ###
    'captcha',
    'social.apps.django_app.default',
    'social_django',
    ### END MISSING APPS ###
]

try:
    ### START MODULE SETTINGS IMPORT ###
    from features.settings import *
    from accounts.settings import *
    from data_manager.settings import *
    from drawing.settings import *
    ### END MODULE SETTINGS IMPORT ###
except ImportError:
    pass

try:
    from marineplanner.local_settings import *
except ImportError:
    pass

# registration
REGISTRATION_FORM_FIELDS = {
    'first_and_last': True,
    'preferred_name': False,
    'username': True,
    'email': True,
    'password': True,
    'confirm_password': True,
    'captcha': False,
}

LOG_IN_WITH_EMAIL = True

ADMIN_URL = "/admin/"

# authentication


SOCIAL_AUTH_LOGIN_OPTIONS = [
    # 'Twitter',
    # 'Facebook',
    # 'Google',
]


SOCIAL_AUTH_NEW_USER_URL = '/account/?new=true&login=django'
SOCIAL_AUTH_FACBEOOK_NEW_USER_URL = '/account/?new=true&login=facebook'
SOCIAL_AUTH_GOOGLE_PLUS_NEW_USER_URL = '/account/?new=true&login=gplus'
SOCIAL_AUTH_TWITTER_NEW_USER_URL = '/account/?new=true&login=twitter'

SOCIAL_AUTH_LOGIN_REDIRECT_URL = '/account/?login=django'
SOCIAL_AUTH_GOOGLE_PLUS_LOGIN_REDIRECT_URL = '/account/?login=gplus'
SOCIAL_AUTH_FACEBOOK_LOGIN_REDIRECT_URL = '/account/?login=facebook'
SOCIAL_AUTH_TWITTER_LOGIN_REDIRECT_URL = '/account/?login=twitter'

# SOCIAL_AUTH_GOOGLE_PLUS_KEY = ''
# SOCIAL_AUTH_GOOGLE_PLUS_SECRET = ''
# SOCIAL_AUTH_GOOGLE_PLUS_SCOPES = (
#     'https://www.googleapis.com/auth/plus.login', # Minimum needed to login
#     'https://www.googleapis.com/auth/plus.profile.emails.read', # emails
# )

SOCIAL_AUTH_FACEBOOK_KEY = ''
SOCIAL_AUTH_FACEBOOK_SECRET = ''
SOCIAL_AUTH_FACEBOOK_SCOPE = ['public_profile,email']

SOCIAL_AUTH_TWITTER_KEY = ''
SOCIAL_AUTH_TWITTER_SECRET = ''

# SOCIAL_AUTH_EMAIL_FORCE_EMAIL_VALIDATION = True
SOCIAL_AUTH_EMAIL_VALIDATION_FUNCTION = 'accounts.pipeline.send_validation_email'
SOCIAL_AUTH_EMAIL_VALIDATION_URL = '/account/validate'

SOCIAL_AUTH_DISCONNECT_REDIRECT_URL = '/'

# Our authentication pipeline
SOCIAL_AUTH_PIPELINE = (
    'accounts.pipeline.clean_session',

    # Get the information we can about the user and return it in a simple
    # format to create the user instance later. On some cases the details are
    # already part of the auth response from the provider, but sometimes this
    # could hit a provider API.
    'social.pipeline.social_auth.social_details',

    # Get the social uid from whichever service we're authing thru. The uid is
    # the unique identifier of the given user in the provider.
    'social.pipeline.social_auth.social_uid',

    # Verifies that the current auth process is valid within the current
    # project, this is were emails and domains whitelists are applied (if
    # defined).
    'social.pipeline.social_auth.auth_allowed',

    # Checks if the current social-account is already associated in the site.
    'social.pipeline.social_auth.social_user',

    # Make up a username for this person, appends a random string at the end if
    # there's any collision.
    'social.pipeline.user.get_username',

    # Confirm with the user that they really want to make an account, also
    # make them enter an email address if they somehow didn't
    'accounts.pipeline.confirm_account',

    # Send a validation email to the user to verify its email address.
    'social.pipeline.mail.mail_validation',

    # Create a user account if we haven't found one yet.
    'social.pipeline.user.create_user',

    # Create the record that associated the social account with this user.
    'social.pipeline.social_auth.associate_user',

    # Populate the extra_data field in the social record with the values
    # specified by settings (and the default ones like access_token, etc).
    'social.pipeline.social_auth.load_extra_data',

    # Update the user record with any changed info from the auth service.
    'social.pipeline.user.user_details',

    # Set up default django permission groups for new users.
    'accounts.pipeline.set_user_permissions',

    # Grab relevant information from the social provider (avatar)
    'accounts.pipeline.get_social_details',

    # 'social.pipeline.debug.debug',
    'accounts.pipeline.clean_session',
)

RECAPTCHA_PUBLIC_KEY = '6Lc30ScUAAAAAE64HuxC_zXrUlEuZxIlZy-WFYf-'
RECAPTCHA_PRIVATE_KEY = '6Lc30ScUAAAAAFq-pBBz161BKPMrRPvDajNuJu3G'

COMMENTS_APP = 'django_comments_xtd'
COMMENTS_XTD_MAX_THREAD_LEVEL = 2
COMMENTS_XTD_CONFIRM_EMAIL = False
COMMENTS_XTD_SALT = '&HK$OYRVG0h5gt073h6gH4p25GS2g5AQ25hTm256yGt134tMP5TgCX'


CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': 'Full',
    },
    'custom': {
        'toolbar': 'Custom',
        'toolbar_Custom': [
            ['Format', 'FontSize'],
            ['Bold', 'Italic', 'Underline','Strike','Subscript','Superscript'],
            ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            ['Link', 'Unlink'],
            ['Image','Table','HorizontalRule','SpecialChar'],
            [ 'TextColor','BGColor' ],
            ['Undo','Redo'],
            ['RemoveFormat', 'Source']
        ]
    }
}

DEFAULT_FROM_EMAIL = "noreply@hoonahstewards.net"
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

try:
    from marineplanner.local_settings import *
except Exception as e:
    pass

# gis
GEOMETRY_DB_SRID = 3857

# This seems to help with some backward compatibility
import django
django.setup()
