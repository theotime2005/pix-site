import { transports } from 'winston'
import routes from './services/get-routes-to-generate'
import isSeoIndexingEnabled from './services/is-seo-indexing-enabled'
import { language } from './config/language'
import { config } from './config/environment'
import { SITES_PRISMIC_TAGS } from './services/available-sites'

const nuxtConfig = {
  generate: {
    routes,
    dir: `dist/${config.siteDomain}`,
    fallback: '404.html',
    crawler: false,
  },
  target: 'static',
  publicRuntimeConfig: {
    formKeysToMap: process.env.FORM_KEYS_TO_MAP || {},
  },
  server: {
    port: process.env.PORT || 5000,
  },
  env: {
    // Nuxt env are required to be usable client-side (e.g.: PixLink)
    SITE: process.env.SITE,
    DOMAIN_ORG: process.env.DOMAIN_ORG,
    DOMAIN_FR: process.env.DOMAIN_FR,
    FT_DISABLE_PIX_PRO_LANGUAGE_SWITCHER:
      process.env.FT_DISABLE_PIX_PRO_LANGUAGE_SWITCHER,
    SITE_DOMAIN: process.env.SITE_DOMAIN,
  },
  dir: {
    pages: `pages/${process.env.SITE}`,
  },
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'fr',
    },
    title: 'Pix - Cultivez vos compétences numériques',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Pix est le service public en ligne pour évaluer, développer et certifier ses compétences numériques tout au long de la vie.',
      },
      isSeoIndexingEnabled() ? {} : { name: 'robots', content: 'noindex' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Shared CSS
   */
  css: ['assets/scss/shared.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/components.js',
    '~/plugins/meta.js',
    { src: '~plugins/slide-menu', ssr: false },
    '~plugins/vue-js-modal',
    { src: '~/plugins/prismicLinks', ssr: false },
  ],
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    ['@nuxtjs/eslint-module', { fix: true }],
    '~/modules/propagate-fetch-error-during-generation',
    '@nuxtjs/i18n',
    '@nuxtjs/prismic',
    '@nuxt/image',
  ],

  image: {
    provider: 'static',
    domains: [
      'images.prismic.io',
      'pix-site.cdn.prismic.io',
      'storage.gra.cloud.ovh.net',
      'prismic-io.s3.amazonaws.com',
    ],
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/moment',
    '@nuxtjs/robots',
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: [
              'faAngleDown',
              'faAngleUp',
              'faAngleRight',
              'faArrowRight',
              'faCalendar',
              'faCheck',
              'faCircle',
              'faCog',
              'faExclamationTriangle',
              'faHome',
              'faPlayCircle',
            ],
          },
        ],
      },
    ],
    [
      'nuxt-winston-log',
      {
        loggerOptions: {
          level: 'debug',
          transports: [new transports.Console()],
        },
      },
    ],
  ],
  moment: {
    locales: ['fr'],
  },
  styleResources: {
    scss: ['assets/scss/globals.scss'],
  },
  i18n: {
    detectBrowserLanguage: false,
    defaultLocale: config.isFrenchDomain ? 'fr-fr' : 'fr',
    strategy: config.isFrenchDomain ? 'prefix_except_default' : 'prefix',
    locales: language.locales,
    lazy: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: config.isFrenchDomain ? 'fr-fr' : 'fr',
    },
  },
  prismic: {
    endpoint: config.prismic.apiEndpoint,
    modern: true,
  },
  router: {
    middleware: 'current-page-path',
    linkExactActiveClass: 'current-active-link',
  },
  robots: () => {
    return {
      UserAgent: '*',
      Disallow: isSeoIndexingEnabled() ? '' : '/',
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
    },
    postcss: {
      plugins: {
        'postcss-url': false,
      },
      preset: {
        autoprefixer: {
          grid: 'autoplace',
        },
        browsers: ['last 2 versions', 'ie 11'],
      },
    },
  },
}

if (process.env.DOMAIN_ORG === undefined) {
  throw new Error(`The DOMAIN_ORG environment variable must be provided`)
}

if (process.env.DOMAIN_FR === undefined) {
  throw new Error(`The DOMAIN_FR environment variable must be provided`)
}

const availableSiteDomains = ['pix.fr', 'pix.org']
if (!availableSiteDomains.includes(process.env.SITE_DOMAIN)) {
  throw new Error(
    `The SITE_DOMAIN environment variable must have one of these values (${availableSiteDomains})`
  )
}

const availableSites = Object.values(SITES_PRISMIC_TAGS)
if (!availableSites.includes(process.env.SITE)) {
  throw new Error(
    `The SITE environment variable must have one of these values: (${availableSites})`
  )
}

if (config.matomo.containerUrl) {
  nuxtConfig.head.script.push(
    {
      type: 'text/javascript',
      src: config.matomo.containerUrl,
      async: true,
      defer: true,
    },
    {
      type: 'text/javascript',
      src: '/scripts/start-matomo-event.js',
      'data-matomo-debug-mode': config.matomo.debug,
    }
  )
}

export default nuxtConfig
