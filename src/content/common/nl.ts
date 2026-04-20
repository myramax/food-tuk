export const common = {
  siteName: 'FoodTuk Skewers',
  phoneDisplay: '06 48 18 58 48',
  phoneHref: 'tel:+31648185848',
  email: 'info@food-tuk.nl',
  header: {
    nav: [
      { label: 'Wat wij doen', href: '#wat-wij-doen' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Reviews', href: '#reviews' },
      { label: 'Offerte & contact', href: '#offerte-contact' },
    ],
    menuOpen: 'Open menu',
    menuClose: 'Sluit menu',
    logoAlt: 'FoodTuk Skewers',
  },
  footer: {
    socialsHeading: 'Socials',
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/foodtukskewers/', icon: 'instagram' },
      { label: 'Facebook', url: 'https://www.facebook.com/foodtukskewers/?locale=nl_NL', icon: 'facebook' },
      { label: 'Tiktok', url: 'https://www.tiktok.com/@foodtuknl', icon: 'tiktok' },
    ],
    contactHeading: 'Contact',
    contacts: [
      { label: '0648185848', href: 'tel:+31648185848', icon: 'phone' },
      { label: 'info@food-tuk.nl', href: 'mailto:info@food-tuk.nl', icon: 'email' },
    ],
    businessHeading: 'Bedrijfsgegevens',
    businessLines: ['KVK: 93211929', 'BTW: NL001176266B65'],
    credit: {
      label: 'Website gerealiseerd door We Network',
      url: 'https://wenetwork.nl',
    },
  },
} as const;
