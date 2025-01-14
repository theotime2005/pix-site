import { resolve } from 'path';
import { filterNuxtPages } from './services/filter-nuxt-pages';

const config = {
  app: {
    head: {
      script: [],
    },
  },
  image: {
    provider: process.env.IS_BUILTIN_IMAGES_ENABLED ? undefined : 'prismic',
  },
  appConfig: {
    domainFr: process.env.DOMAIN_FR,
    domainOrg: process.env.DOMAIN_ORG,
    site: process.env.SITE,
  },
  alias: {
    '@shared': resolve(__dirname, '../shared'),
  },
  components: ['@/components', '@shared/components'],
  css: ['@shared/assets/scss/shared.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@shared/assets/scss/globals.scss";',
        },
      },
    },
  },
  devtools: { enabled: true },
  hooks: {
    'pages:extend': filterNuxtPages,
  },
  modules: ['@nuxt/test-utils/module'],
  prismic: {
    clientConfig: {
      accessToken: process.env.PRISMIC_API_TOKEN,
    },
    endpoint: 'pix-site',
    linkResolver: '../shared/services/link-resolver.js',
  },
  runtimeConfig: {
    public: {
      easiwareScriptUrl: process.env.EASIWARE_SCRIPT_URL,
      matomo: {
        containerUrl: process.env.MATOMO_CONTAINER,
        debug: process.env.MATOMO_DEBUG || false,
      },
    },
  },
};

if (config.runtimeConfig.public.matomo.containerUrl) {
  config.app.head.script.push(
    {
      type: 'text/javascript',
      src: config.runtimeConfig.public.matomo.containerUrl,
      async: true,
      defer: true,
    },
    {
      type: 'text/javascript',
      src: '/scripts/start-matomo-event.js',
      'data-matomo-debug-mode': config.runtimeConfig.public.matomo.debug,
    },
  );
}
export default config;
