<template>
  <div class="navigation">
    <nuxt-link
      v-for="(item, index) in mainNavItems"
      :key="item.id"
      :to="item.primary.link"
      :class="[
        'text',
        'text-xs',
        'text-left',
        'regular',
        { 'text-black': index < mainNavItems.length - 1 },
        { 'link-separator-left': index === mainNavItems.length - 3 },
        { 'button btn-nav': index === mainNavItems.length - 1 },
      ]"
    >
      {{ $prismic.asText(item.primary.title) }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'NavPrincipal',
  props: {
    mainNavItems: {
      type: Array,
      default: null,
    },
  },
};
</script>

<style>
.btn-nav {
  transition: all ease-in 0.2s;
}
</style>
