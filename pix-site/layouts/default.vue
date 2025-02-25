<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <div id="app" class="app-viewport">
      <skip-link />
      <hot-news-banner />
      <locale-suggestion-banner
        :is-open="showBanner"
        :domain-org="domainOrg"
        @handle-close-banner="closeLocaleSuggestionBanner"
      />
      <navigation-slice-zone />
      <main id="main" role="main" tabindex="-1">
        <slot />
      </main>
      <shared-footer-slice-zone />
    </div>
  </Html>
</template>

<script setup>
import { ref } from 'vue';

const showBanner = ref(false);
const { origin } = useRequestURL();

const config = useAppConfig();
const domainOrg = config.domainOrg;

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Pix` : 'Pix';
  },
});

const head = useLocaleHead({
  addDirAttribute: true,
  addSeoAttributes: true,
});

onMounted(async () => {
  const { showOutOfFranceBanner } = useShowOutOfFranceBanner();
  showBanner.value = await showOutOfFranceBanner(origin, $fetch);
});

const closeLocaleSuggestionBanner = () => {
  showBanner.value = false;
};
</script>

<style lang="scss">
html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: $white;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

body {
  line-height: 1.5;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: $font-open-sans;
  line-height: 1.2;
}

p,
div {
  word-wrap: break-word;
}

.app-viewport {
  .app-brand {
    height: 66px;
    background-color: #ffffff;
    border: 1px solid #e5e5e5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    padding: 12px 10px;
    transition: top 0.3s ease-in-out;
  }
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
