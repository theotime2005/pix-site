import { render, screen } from '@testing-library/vue';

import SupportHeader from '../../../../../shared/components/Support/SupportHeader.vue';

describe('SupportHeader', () => {
  describe('#backLink prop', () => {
    test('if not defined, do not display a link to previous page', () => {
      // when
      render(SupportHeader);

      // then
      expect(screen.queryByRole('link')).toBeFalsy();
    });

    test('if defined, displays a link to previous page', () => {
      // when
      render(SupportHeader, { props: { backLinkUrl: '/previous' } });

      // then
      expect(screen.getByRole('link').href).toContain('/previous');
    });
  });

  describe('required #icon prop', () => {
    test('displays a persona icon', () => {
      // when
      render(SupportHeader, { props: { icon: 'icon.svg' } });

      // then
      expect(screen.getByRole('img').src).toContain('icon.svg');
    });
  });

  describe('required #title prop', () => {
    test('displays a title', () => {
      // when
      render(SupportHeader, { props: { title: 'Persona title' } });

      // then
      expect(screen.getByRole('heading', { level: 1, name: 'Persona title' })).toBeTruthy();
    });
  });

  describe('#withSearch prop', () => {
    test('if not defined, do not display a search input', () => {
      // when
      render(SupportHeader);

      // then
      expect(screen.queryByRole('textbox')).toBeFalsy();
    });

    test('if defined, displays a search input', () => {
      // when
      render(SupportHeader, { props: { withSearch: true } });

      // then
      expect(screen.getByRole('textbox')).toBeTruthy();
    });
  });
});
