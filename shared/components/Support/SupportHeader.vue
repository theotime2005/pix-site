<template>
  <section class="persona__header">
    <div class="persona-header__wrapper">
      <a v-if="backLinkUrl" :href="backLinkUrl" class="persona-header__back-button">
        <span>{{ t('back') }}</span>
      </a>
      <nuxt-img v-if="icon" class="persona-header__icon" :src="icon" alt="" />
      <h1 class="persona-header__title">
        {{ title }}
      </h1>
      <input
        v-if="withSearch"
        class="persona-header__search-input"
        type="text"
        :placeholder="t('support.faq.search-placeholder')"
        @keyup="$emit('handleSearch', $event.target.value)"
      />
    </div>
  </section>
</template>

<script setup>
const { t } = useNuxtApp().$i18n;

defineEmits(['handleSearch']);

defineProps({
  backLinkUrl: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  withSearch: {
    type: Boolean,
    default: false,
  },
});

const searchInput = ref('');
provide('searchInput', searchInput);
</script>

<style lang="scss" scoped>
.persona__header {
  background-color: #613fdd;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.persona-header__wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem 1rem 2.5rem 1rem;
  color: white;
}

.persona-header__title {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
}

.persona-header__icon {
  filter: brightness(0) invert(1);
  margin-bottom: 1rem;
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.persona-header__back-button {
  display: flex;
  align-items: center;
  align-self: flex-start;
  color: white;
  font-family: $font-roboto;
  margin-bottom: 0.25rem;

  &:hover span {
    text-decoration: underline;
  }

  &::before {
    display: inline-block;
    content: '←';
    font-family: monospace;
    font-size: 1.5rem;
    line-height: 0.3em;
    margin-right: 0.5rem;
  }
}

.persona-header__search-input {
  width: min(100%, 25em);
  margin-top: 1.5em;
  padding: 1em 1.5em 1em 3em;
  font-size: 1rem;
  border: 1px solid transparent;
  border-radius: 2em;
  background-image: url('/images/search-icon.svg');
  background-size: auto calc(100% - 1.5em);
  background-repeat: no-repeat;
  background-position: 1em center;

  &:hover {
    border-color: $grey-60;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  }
  &:focus {
    border-color: $grey-200;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.4);
  }
}
</style>
