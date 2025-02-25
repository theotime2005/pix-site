<template>
  <div class="faq-persona">
    <support-header
      :title="data.currentPersona.faq_page_title[0].text"
      :icon="data.currentPersona.icon.url"
      :back-link-url="backLink"
      :with-search="true"
      @handle-search="handleSearch"
    />
    <div class="faq-persona__content-wrapper">
      <section v-if="displayPopularPosts" class="faq-persona__popular-posts">
        <h2 class="faq-persona-popular-posts__title">
          {{ data.currentPersona.popular_posts_title[0]?.text }}
        </h2>
        <ul class="faq-persona-popular-posts-list">
          <li v-for="popularPost in data.currentPersona.popular_posts" :key="popularPost.post.slug">
            <nuxt-link :to="`${route.path}/${popularPost.post.uid}`">
              {{ getPostTitle(popularPost.post.uid) }}
            </nuxt-link>
          </li>
        </ul>
      </section>
      <section v-if="data.currentPersona.body" class="faq-persona__posts">
        <p v-if="searchInput.length" aria-live="polite">
          <template v-if="filteredPostsCount === 0">
            {{ t('support.faq.no-result', { searchInput }) }}
          </template>
          <template v-else>
            {{ t('support.faq.results-count', { count: filteredPostsCount, searchInput }) }}
          </template>
        </p>
        <ul class="faq-persona-posts__primary-list">
          <template v-for="category in data.currentPersona.body" :key="category.id">
            <li ref="categoriesRef">
              <details :open="searchInput?.length">
                <summary>
                  <h3 class="title">
                    {{ category.primary.category_name[0].text }}
                  </h3>
                  <p class="description">
                    {{ category.primary.category_description[0].text }}
                  </p>
                </summary>
                <ul class="faq-persona-posts__secondary-list">
                  <template v-for="post in category.items" :key="post.post.id">
                    <li v-if="displayPost(post)">
                      <h4 v-if="post.sub_category && !searchInput?.length" class="sub-category">
                        {{ post.sub_category }}
                      </h4>
                      <nuxt-link :to="`${route.path}/${post.post.uid}`">
                        {{ getPostTitle(post.post.uid) }}
                      </nuxt-link>
                    </li>
                  </template>
                </ul>
              </details>
            </li>
          </template>
        </ul>
      </section>
      <support-contact v-if="data.contactForm && !searchInput.length" :contact-form-id="data.contactForm.uid" />
    </div>
  </div>
</template>

<script setup>
const { client } = usePrismic();
const { locale: i18nLocale, t } = useI18n();
const route = useRoute();

const categoriesRef = ref([]);
const searchInput = ref('');
const filteredPostsCount = ref(0);

/* I18n Routes */
defineI18nRoute({
  paths: {
    en: '/support/[parent_persona]/[current_persona]',
    fr: '/support/[parent_persona]/[current_persona]',
    'fr-fr': '/support/[parent_persona]/[current_persona]',
    'fr-be': '/support/[parent_persona]/[current_persona]',
    'nl-be': '/support/[parent_persona]/[current_persona]',
  },
});

const backLink = computed(() => {
  const localeUrl = i18nLocale.value !== 'fr-fr' ? `/${i18nLocale.value}` : '';
  return `${localeUrl}/support/${route.params.parent_persona}`;
});

/* Fetch persona data */
const { data } = await useAsyncData(async () => {
  try {
    const queryPersona = await client.getByUID('support__persona_faq', route.params.current_persona, {
      lang: i18nLocale.value,
    });

    const queryPosts = await client.getAllByType('support__faq_post', { lang: i18nLocale.value });

    const contactForm = queryPersona.data.contact_form_link.id
      ? await client.getByID(queryPersona.data.contact_form_link.id, { lang: i18nLocale.value })
      : null;

    return {
      currentPersona: {
        uid: queryPersona.uid,
        ...queryPersona.data,
      },
      personaPosts: queryPosts,
      contactForm,
    };
  } catch (err) {
    console.error(err);
    error({ statusCode: 404, message: 'Page not found' });
  }
});

/* Computed */
const displayPopularPosts = computed(() => {
  return !searchInput.value?.length && data.value.currentPersona.popular_posts.length;
});

/* Methods */
const getPostTitle = (uid) => {
  const post = data.value.personaPosts?.find((post) => {
    return post.uid === uid;
  });
  return post?.data.title[0].text;
};

const displayPost = ({ post }) => {
  if (!searchInput.value || !getPostTitle(post.uid)) return true;

  const simplifyString = (string) => {
    return string
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove accents
      .replace(/\s/g, '') // remove spaces
      .replace(/[^\w\s]/gi, '') // remove special characters
      .toLowerCase();
  };

  return simplifyString(getPostTitle(post.uid)).includes(simplifyString(searchInput.value));
};

const handleSearch = async (inputValue) => {
  searchInput.value = inputValue;

  await nextTick();

  let postsCount = 0;

  categoriesRef.value.forEach((categoryElement) => {
    if (categoryElement.querySelectorAll('li').length === 0) {
      categoryElement.style.display = 'none';
    } else {
      postsCount += categoryElement.querySelectorAll('li').length;
      categoryElement.style.display = 'block';
    }
  });

  filteredPostsCount.value = postsCount;
};
</script>

<style lang="scss">
.faq-persona {
  font-family: $font-roboto;
  background: $grey-10;
}

.faq-persona__content-wrapper {
  max-width: 50rem;
  padding: 2rem 1rem 3rem;
  margin: 0 auto;
  color: $grey-90;

  ul,
  ol {
    list-style-type: none;
  }

  li {
    padding: 0;
  }

  li::before {
    content: none;
  }
}

// Popular posts
.faq-persona-popular-posts__title {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.3;
}

.faq-persona-popular-posts-list {
  margin: 1rem 0 2rem;
  padding-left: 0;

  li + li {
    margin-top: 0.5rem;
  }

  a {
    display: block;
    padding: 0.125em 0;
    font-size: 1.125rem;
    color: $blue;

    &:hover {
      text-decoration: underline;
    }
  }
}

// Posts
.faq-persona-posts__primary-list {
  margin: 0;
  padding-left: 0;

  & > li + li {
    margin-top: 0.75rem;
  }

  details {
    border: 1px solid $grey-22;
    border-radius: 0.5rem;
    overflow: hidden;
  }

  summary {
    position: relative;
    padding: 1rem 3rem 1rem 1rem;
    background: white;
    cursor: pointer;

    &:hover {
      cursor: pointer;
      background: $grey-10;
    }

    &::marker {
      content: none;
    }

    &::after {
      position: absolute;
      top: calc(50% - 0.25rem);
      right: 1.25rem;
      width: 0.5rem;
      height: 0.5rem;
      border-left: 2px solid currentColor;
      border-top: 2px solid currentColor;
      transform: rotate(-135deg);
      content: '';
    }

    .title {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 700;
      line-height: 1.3;
      color: $grey-80;
    }

    .description {
      margin: 0;
      font-size: 0.875rem;
      color: $grey-50;
    }
  }

  details[open] summary::after {
    top: 50%;
    transform: rotate(45deg);
  }
}

.faq-persona-posts__secondary-list {
  margin: 0;
  padding: 1.5rem 0;
  background: white;
  border-top: 1px solid $grey-22;

  .sub-category {
    padding: 0 1rem;
    color: $grey-50;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    text-transform: uppercase;
  }

  li:not(:first-child) .sub-category {
    margin-top: 1rem;
  }

  a {
    display: block;
    padding: 0.375rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: $communication-dark;

    &:hover {
      color: $grey-90;
      background: #b0d3f4;
    }
  }
}
</style>
