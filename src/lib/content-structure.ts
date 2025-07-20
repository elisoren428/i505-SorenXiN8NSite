export interface PageContent {
  backgroundText: string;
  main: {
    title: {
      highlight: string;
      rest: string;
    };
    subtitle: {
      part1: string;
      part2: string;
    };
  };
  hero: {
    brandName: string;
    title: string;
    description: string;
    button: {
      text: string;
      href: string;
    };
    animatedOrb: {
      colors: {
        stop1: string;
        stop2: string;
        stop3: string;
      }
    }
  };
}

export const homepageContent: PageContent = {
  backgroundText: "SORENXI",
  main: {
    title: {
      highlight: "AUTOMATION",
      rest: "SUITE",
    },
    subtitle: {
      part1: "Powered by N8N",
      part2: "With SorenXi",
    },
  },
  hero: {
    brandName: "SorenXi",
    title: "N8N",
    description: "n8n work flow directory with hundreds of collected n8n workflows from many developers around the globe. why reinvent the wheel when you can just modify it.",
    button: {
      text: "Explore",
      href: "/workflows",
    },
    animatedOrb: {
      colors: {
        stop1: 'rgba(59, 130, 246, 0.8)',
        stop2: 'rgba(37, 99, 235, 0.4)',
        stop3: 'rgba(30, 64, 175, 0.1)',
      }
    }
  },
};

export interface NavItem {
  href: string;
  label: string;
}

export interface HeaderContent {
  title: string;
  navItems: NavItem[];
}

export const headerContent: HeaderContent = {
  title: 'SORENXI N8N DIRECTORY',
  navItems: [
    { href: '/', label: 'Home' },
    { href: '/workflows', label: 'Explore' },
    { href: '/ai-tagger', label: 'AI Tagger' },
    { href: '/free-apis', label: 'Free APIs' },
  ],
};
