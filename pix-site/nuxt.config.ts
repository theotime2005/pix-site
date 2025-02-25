import { getRoutesToGenerate } from './services/get-routes-to-generate';
import i18nConfig, { reachableLocales, reachableLocaleNames } from './i18n.config';

export default async () => {
  const routes = process.env.NODE_ENV !== 'test' ? await getRoutesToGenerate({ locales: i18nConfig.locales }) : [];

  return defineNuxtConfig({
    extends: ['../shared'],
    devServer: {
      port: Number(process.env.PORT) || 6001,
    },
    modules: ['@nuxtjs/prismic', '@nuxtjs/i18n', '@vueuse/nuxt', 'nuxt-image-prismic-fix'],
    image: {
      domains: [
        'pix-site.cdn.prismic.io',
        'storage.gra.cloud.ovh.net',
        'prismic-io.s3.amazonaws.com',
        'images.prismic.io',
      ],
    },
    runtimeConfig: {
      public: {
        site: 'https://pix.',
        siteDomain: process.env.SITE_DOMAIN,
        formKeysToMap: process.env.FORM_KEYS_TO_MAP || null,
        availableLocales: reachableLocales,
        availableLocaleNames: reachableLocaleNames,
      },
    },
    nitro: {
      prerender: {
        crawlLinks: false,
        routes,
      },
      devProxy: {
        '/geolocate': {
          target: `https://${process.env.GEOAPI_HOST}/me`,
          changeOrigin: true,
        },
      },
    },
    i18n: i18nConfig,
  });
};

if (!process.env.SITE) {
  throw new Error('Missing SITE environment variable');
}
if (!process.env.SITE_DOMAIN) {
  throw new Error('Missing SITE_DOMAIN environment variable');
}
