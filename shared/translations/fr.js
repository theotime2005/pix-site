export default {
  'locale-switcher': {
    button: {
      'main-label': 'Choix de la langue',
      'international-label': 'Liste des sites internationaux',
    },
    locales: {
      international: 'International',
    },
  },
  'contact-digital-mediation': {
    'page-title': "Demande d'information",
    'form-id': '24665',
  },
  'higher-education-establishment-registration': {
    'page-title': 'Demande d’espace Pix Orga',
    'form-id': '22367',
  },
  'pix-certification-application': {
    'page-title': "Demande d'agrément comme centre de certification Pix",
    'form-id': '23331',
  },
  'pix-orga-registration': {
    'page-title': "Demande d'information",
    'form-id': '22370',
  },
  'pix-orga-higher-school-registration': {
    'page-title': "Finalisez votre demande d'espace Pix Orga",
    'form-id': '22797',
  },
  'news-page-prefix': 'actualites',
  'news-page-title': 'Actualités',
  'news-page-title-level-two': 'Liste des actualités',
  'news-page-no-news': "Il n’y a pas encore d'actualités",
  announcement: 'Annonce',
  engineering: 'Ingénierie',
  event: 'Événement',
  feature: 'Nouveauté',
  society: 'Société',
  'page-titles': {
    'contact-digital-mediation': "Demande d'information | Pix",
    'higher-education-establishment-registration': "Demande d'espace | Pix Orga sup",
    news: 'Actualités | Pix',
    'pix-certification-application': "Demande d'agrément comme centre de certification | Pix",
    'pix-orga-higher-school-registration': "Finaliser la demande d'espace | Pix Orga sup",
    'pix-orga-registration': "Demande d'information | Pix pro",
  },
  form: {
    'not-supported':
      "Votre navigateur ne supporte pas les iframes. Le formulaire de contact ne peut pas être affiché. Merci d'utiliser une autre méthode de contact (téléphone, fax, etc.)",
  },
  'preview-page-load': 'Chargement de la page de prévisualisation...',
  'home-page-url': `${process.env.DOMAIN_ORG}/fr/`,
  'error-content': `
    <p>Oups ! Un problème est survenu, mais pas de panix !</p>
    <p>Vous pouvez revenir sur la
    <a href="${process.env.DOMAIN_FR}/fr">page d'accueil</a>.
    <br/>Si vous avez besoin d’aide, vous pouvez consulter le
    <a href="https://support.pix.org/fr/support/home">support</a>.
    </p>`,
  'locale-suggestion-banner-text': 'Vous semblez ne pas être en France. Voulez-vous accéder au <a href="{domainOrgUrl}">site Pix international</a> ?',
  'skip-link': 'Aller au contenu',
  'burger-menu': {
    name: 'Navigation principale',
    open: 'Ouvrir le menu',
    close: 'Fermer le menu',
    'open-category': 'Ouvrir la catégorie',
    'close-category': 'Fermer la catégorie',
    'open-locale-switcher': 'Ouvrir le changement de langue',
    'close-locale-switcher': 'Fermer le changement de langue',
    'change-locale-switcher': 'Changer la langue',
    'change-locale-switcher-button': 'Changer',
  },
  back: 'Retour',
  support: {
    form: {
      'required-info': "Tous les champs marqués d'une <span>*</span> sont obligatoires",
    },
    faq: {
      'contact-title': 'Vous ne trouvez pas la réponse à votre question ?',
      'contact-cta': 'Contacter le support',
      'search-placeholder': 'Rechercher parmi les titres des articles',
      'no-result': 'Aucun résultat trouvé pour « {searchInput} »',
      'results-count': '{count} résultats',
    },
    meta: {
      title: 'Centre d’aide et contact',
      description:
        'Une question ? Besoin d’aide ? Trouvez votre réponse en consultant notre FAQ ou contactez le support via le formulaire adapté à votre situation.',
    },
  },
};
