/**
 * Profile and projects configuration
 */

export const profile = {
  name: 'René',
  username: 'renetec',
  location: 'Québec, Canada',
  tagline: {
    en: 'Full-Stack Developer',
    fr: 'Développeur Full-Stack'
  },
  bio: {
    en: 'Passionate developer building modern web applications.',
    fr: 'Développeur passionné créant des applications web modernes.'
  }
};

export const projects = [
  {
    id: 'portfolio-os',
    name: 'Portfolio OS',
    year: 2024,
    featured: true,
    status: 'development',
    tagline: {
      en: 'Browser-based desktop OS portfolio',
      fr: 'Portfolio en forme de système d\'exploitation dans le navigateur'
    },
    description: {
      en: 'A portfolio website designed as a browser-based desktop operating system.',
      fr: 'Un site portfolio conçu comme un système d\'exploitation de bureau dans le navigateur.'
    },
    tech: ['SvelteKit', 'TypeScript', 'CSS'],
    features: {
      en: ['Desktop-like window management', 'Terminal emulator'],
      fr: ['Gestion de fenêtres style bureau', 'Émulateur de terminal']
    },
    links: {
      github: 'https://github.com/renetec/renetec.github.io',
      live: 'https://renetec.github.io'
    }
  }
];
