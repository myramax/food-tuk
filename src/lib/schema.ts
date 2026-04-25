type FaqItem = {
  question: string;
  answerHtml: string;
};

type SiteIdentity = {
  siteUrl: string;
  siteName: string;
  description: string;
  email: string;
  phoneHref: string;
  sameAs: readonly string[];
  logo: string;
  image: string;
};

export function buildFaqSchema(items: readonly FaqItem[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: htmlToPlainText(item.answerHtml),
      },
    })),
  });
}

export function buildHomeSchema(identity: SiteIdentity, faqItems: readonly FaqItem[]): string {
  const siteUrl = identity.siteUrl.replace(/\/$/, '');
  const telephone = identity.phoneHref.replace(/^tel:/, '');

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: identity.siteName,
        inLanguage: 'nl-NL',
        publisher: { '@id': `${siteUrl}/#business` },
      },
      {
        '@type': ['LocalBusiness', 'FoodEstablishment'],
        '@id': `${siteUrl}/#business`,
        name: identity.siteName,
        url: siteUrl,
        logo: new URL(identity.logo, siteUrl).href,
        image: new URL(identity.image, siteUrl).href,
        description: identity.description,
        email: identity.email,
        telephone,
        priceRange: '€€',
        servesCuisine: ['Indonesisch', 'Saté'],
        areaServed: {
          '@type': 'Country',
          name: 'Nederland',
        },
        sameAs: identity.sameAs,
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: htmlToPlainText(item.answerHtml),
          },
        })),
      },
    ],
  });
}

function htmlToPlainText(html: string): string {
  return html
    .replaceAll(/<li>/g, '')
    .replaceAll(/<\/li>/g, '\n')
    .replaceAll(/<\/p>/g, '\n')
    .replaceAll(/<br\s*\/?>/g, '\n')
    .replaceAll(/<[^>]+>/g, '')
    .replaceAll(/&#8211;/g, '–')
    .replaceAll(/&#8217;/g, '\'')
    .replaceAll(/&nbsp;/g, ' ')
    .replaceAll(/\n{3,}/g, '\n\n')
    .trim();
}
