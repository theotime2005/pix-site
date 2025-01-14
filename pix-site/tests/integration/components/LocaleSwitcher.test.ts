import { render, screen, fireEvent } from '@testing-library/vue';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';

import LocaleSwitcher from '~/components/LocaleSwitcher.vue';

const localeProperties = { code: 'fr-fr', name: 'Français', icon: 'fr' };
const availableLocales = [
  {
    code: 'en',
    iso: 'en',
    file: 'en.js',
    name: 'English',
    icon: 'globe-europe.svg',
    domain: 'https://example.org/',
  },
  {
    code: 'fr',
    iso: 'fr',
    file: 'fr.js',
    name: 'Français',
    icon: 'globe-europe.svg',
    domain: 'https://example.org/',
  },
  {
    code: 'fr-fr',
    iso: 'fr-fr',
    file: 'fr-fr.js',
    name: 'France',
    icon: 'flag-fr.svg',
    domain: 'https://example.fr/',
  },
  {
    code: 'fr-be',
    iso: 'fr-be',
    file: 'fr-be.js',
    name: 'Belgique (Français)',
    icon: 'flag-be.svg',
    domain: 'https://example.org/',
  },
  {
    code: 'nl-be',
    iso: 'nl-be',
    file: 'nl-be.js',
    name: 'België (Nederlands)',
    icon: 'flag-be.svg',
    domain: 'https://example.org/',
  },
];
mockNuxtImport('useI18n', () => {
  return () => {
    return { localeProperties, t: str => str };
  };
});
mockNuxtImport('useAppConfig', () => {
  return () => ({
    domainFr: 'https://example.fr',
    domainOrg: 'https://example.org',
  });
});
mockNuxtImport('useRuntimeConfig', () => {
  return () => ({
    public: {
      siteDomain: 'ORG',
      availableLocales,
    },
  });
});

describe('LocaleSwitcher', () => {
  beforeEach(() => {
    render(LocaleSwitcher);
  });

  test('displays as a button', () => {
    // then
    const localesMenuButton = screen.getByRole('button', { name: 'locale-switcher.button.main-label' });
    expect(localesMenuButton).toBeTruthy();
  });

  describe('locales menu button', () => {
    test('is a clickable button which displays a menu', async () => {
      // given
      const localesMenuButton = screen.getByRole('button', { name: 'locale-switcher.button.main-label' });

      // when
      await fireEvent.click(localesMenuButton);

      // then
      const internationalLanguagesButton = screen.getByRole('button', {
        name: 'locale-switcher.button.international-label',
      });
      expect(internationalLanguagesButton).toBeTruthy();

      const frFrLink = screen.getByRole('link', { name: 'France' });
      expect(frFrLink).toBeTruthy();

      const frBeLink = screen.getByRole('link', { name: 'Belgique (Français)' });
      expect(frBeLink).toBeTruthy();

      const frNlLink = screen.getByRole('link', { name: 'België (Nederlands)' });
      expect(frNlLink).toBeTruthy();
    });
  });

  describe('international locales menu button', () => {
    test('is a clickable button which displays a sub-menu', async () => {
      // given
      const localesMenuButton = screen.getByRole('button', { name: 'locale-switcher.button.main-label' });
      await fireEvent.click(localesMenuButton);
      const internationalLanguagesButton = screen.getByRole('button', {
        name: 'locale-switcher.button.international-label',
      });

      // when
      await fireEvent.click(internationalLanguagesButton);

      // then
      const frLink = screen.getByRole('link', { name: 'Français' });
      expect(frLink).toBeTruthy();

      const enLink = screen.getByRole('link', { name: 'English' });
      expect(enLink).toBeTruthy();
    });
  });
});
