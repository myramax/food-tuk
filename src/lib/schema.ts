type FaqItem = {
  question: string;
  answerHtml: string;
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
