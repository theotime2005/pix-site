// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
import i18nConfig from "../shared/i18n.config";

export default defineNuxtConfig({
  devServer: {
    port: 7001,
  },
  alias: {
    "@shared": resolve(__dirname, "../shared"),
  },
  runtimeConfig: {
    public: {
      site: "https://pro.pix.",
    },
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/prismic", "@nuxtjs/i18n", "@vueuse/nuxt", "@nuxt/image"],
  i18n: i18nConfig,
  components: ["@/components", "@shared/components"],
  /* SCSS global imports */
  css: ["@shared/assets/scss/shared.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/globals.scss";',
        },
      },
    },
  },
  /* Prismic */
  prismic: {
    endpoint: "pix-site",
  },
});
