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

ALLOWED_HOSTS = ['*']


# Application definition

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'livereload.middleware.LiveReloadScript',
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

### Django compressor (mp-visualize/base.html)
COMPRESS_ENABLED = True
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

STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    # 'django.contrib.staticfiles.finders.DefaultStorageFinder',
    'compressor.finders.CompressorFinder',
]

### Note: This MUST be set before importing project_settings, even though
#       INSTALLED_APPS is the first thing project_settings sets.
#       Because... django? ¯\_(?)_/¯
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.sessions',
    'django.contrib.messages',
    'livereload',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'django.contrib.contenttypes',
    ### ADD DJANGO APPS ###
    'django.contrib.gis',
    ### END ADD APPS ###
    'marineplanner',
    'core',
    'compressor',
    ### BEGIN INSERTED INSTALLED APPS ###
    "hnfp",
    "features",
    "manipulators",
    "accounts",
    "data_manager",
    "visualize",
    "nursery",
    "drawing",
    "rpc4django",
    ### END INSERTED INSTALLED APPS ###
    ### BEGIN MISSING APPS ###
    "captcha",
    "import_export",
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

RECAPTCHA_PUBLIC_KEY = '6Lc30ScUAAAAAE64HuxC_zXrUlEuZxIlZy-WFYf-'
RECAPTCHA_PRIVATE_KEY = '6Lc30ScUAAAAAFq-pBBz161BKPMrRPvDajNuJu3G'

# This seems to help with some backward compatibility
import django
django.setup()
