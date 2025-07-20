
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
  buttons: {
    signIn: string;
    signUp: string;
  }
}

export const headerContent: HeaderContent = {
  title: 'SORENXI N8N DIRECTORY',
  navItems: [
    { href: '/', label: 'Home' },
    { href: '/workflows', label: 'Explore' },
    { href: '/ai-tagger', label: 'AI Tagger' },
    { href: '/free-apis', label: 'Free APIs' },
  ],
  buttons: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
  }
};

interface ApiInfo {
  title: string;
  url: string;
  imageUrl?: string;
  steps: string[];
  notes: string;
  quotas?: string[];
}

export interface FreeApisContent {
  title: string;
  description: string;
  apis: ApiInfo[];
  deepSeek: {
    title: string;
    description: string;
    platform: {
      title: string;
      features: string[];
      button: {
        text: string;
        href: string;
      };
    };
  };
  notes: {
    title: string;
    points: string[];
  }
}

export const freeApisContent: FreeApisContent = {
  title: "Free API Access Guide",
  description: "A step-by-step guide to claiming free AI keys from top platforms, verified and updated based on the latest info.",
  apis: [
    {
      title: "Clarifai AI",
      url: "https://clarifai.com/",
      imageUrl: "https://placehold.co/100x100/1E88E5/FFFFFF.png?text=C",
      steps: [
        "Signup: Use Google login.",
        "Create Profile: Set type to 'AR Projects', role to 'Educator/Student', and use-case to 'Pre-trained models'.",
        "API Key: Go to Playground -> API Keys tab -> Generate Key."
      ],
      notes: "1,000 requests/month. Over 21 models. Great for CV + media projects."
    },
    {
      title: "Google AI Studio",
      url: "https://makersuite.google.com/app",
      imageUrl: "https://placehold.co/100x100/4285F4/FFFFFF.png?text=G",
      steps: [
          "Login: Use Google account.",
          "Explore Models: Gemini 2.0, 2.5 Pro, Gemma, Flashlight, and V2.",
          "API Keys: Automatically managed within the platform. No manual key export.",
      ],
      quotas: [
          "Gemini 2.0: 1,500/day",
          "Gemini 2.5: 500/day",
          "Gemma: 1,440/day",
      ],
      notes: "Supports multimodal output — video, voice, text."
    },
    {
      title: "Cerebras AI",
      url: "https://cerebras.net/",
      imageUrl: "https://placehold.co/100x100/F57C00/FFFFFF.png?text=Cb",
      steps: [
          "Signup: Use Google login.",
          "Profile Info: Choose 'student' as use-case.",
          "API Key: After signup, it is generated automatically. Copy it from dashboard.",
          "Test Models: LLaMA 4 Scout 17B16E, etc.",
      ],
      notes: "14,400 requests/day. Blazing-fast inference. Ideal for live chatbots."
    },
    {
      title: "Mistral AI",
      url: "https://mistral.ai/",
      imageUrl: "https://placehold.co/100x100/FFCA28/333333.png?text=M",
      steps: [
          "Login: Google account.",
          "API Key: Go to API Key tab -> Generate -> Paste into Playground.",
          "Test Model: Try Mistral Medium or GPT-4.1-mini in curl.",
      ],
      notes: "150 chat/day + 30 image gen/day."
    },
    {
      title: "Cloudflare AI",
      url: "https://developers.cloudflare.com/workers-ai/",
      imageUrl: "https://placehold.co/100x100/F38020/FFFFFF.png?text=CF",
      steps: [
          "Login: Cloudflare account.",
          "Find API Key: Dashboard -> Profile -> API Tokens -> Create new token (use 'Workers AI' template).",
          "Copy Account ID + API Token.",
          "Run cURL: Use their pre-formatted sample in ReqBin.",
      ],
      notes: "10,000 req/day. Supports model deployment at edge locations."
    },
    {
      title: "GPT4All",
      url: "https://gpt4all.io",
      imageUrl: "https://placehold.co/100x100/4CAF50/FFFFFF.png?text=G4A",
      steps: [
          "Setup: Join their Telegram bot -> Generate Token -> View usage stats.",
          "Use Key: Insert into curl command for testing models like GPT4-mini.",
      ],
      notes: "Good mobile option. Lightweight image + chat generation."
    },
    {
      title: "OpenRouter",
      url: "https://openrouter.ai",
      imageUrl: "https://placehold.co/100x100/8155F4/FFFFFF.png?text=OR",
      steps: [
          "Filter for Free: Set Prompt Pricing slider to 'FREE'.",
          "Signup: Email or GitHub.",
          "Key: Dashboard -> API Key -> Generate.",
          "Use: One key grants access to 67+ models, including DeepSeek R1.",
      ],
      notes: "Supports Claude occasionally when in free promo mode."
    },
    {
      title: "Together AI",
      url: "https://platform.together.xyz",
      imageUrl: "https://placehold.co/100x100/29D3A5/FFFFFF.png?text=T",
      steps: [
          "Dashboard -> See API Key (auto-created).",
          "Playground -> Test models like DeepSeek R1, Metal LLaMA, Flux.1, Exeoni."
      ],
      notes: "Unlimited usage. Best for long-term deployment or multi-model switching. Strong support for DeepSeek."
    },
    {
      title: "GitHub Models",
      url: "https://github.com/",
      imageUrl: "https://placehold.co/100x100/333333/FFFFFF.png?text=GH",
      steps: [
          "Explore: Search 'Copilot models' or visit Marketplace -> Models tab.",
          "Try It: Select model -> 'Use this model' -> Launch playground.",
          "API: Some models provide direct keys or integrations.",
      ],
      notes: "Great for code, Whisper (audio), LLaMA 4, DeepSeek, etc."
    },
    {
      title: "Pollinations AI",
      url: "https://pollinations.ai/",
      imageUrl: "https://placehold.co/100x100/E91E63/FFFFFF.png?text=P",
      steps: [
          "Access: No signup or key needed.",
          "Use: Just enter prompt in the URL or UI.",
          "Models: GPT-4 MiniT, TTS audio, image gen.",
      ],
      notes: "Pure anonymous access. No logging. Great for stealth testing."
    }
  ],
  deepSeek: {
    title: "DeepSeek Access",
    description: "DeepSeek shows up on multiple platforms. Here's the best way to get it:",
    platform: {
      title: "Together AI",
      features: [
        "Offers <span class=\"font-semibold\">DeepSeek R1</span> and other variants.",
        "<span class=\"font-semibold text-green-400\">Unlimited free access</span> on this platform.",
        "Works well for: chat, code generation, and vision tasks."
      ],
      button: {
        text: "Go to Together AI",
        href: "https://platform.together.xyz"
      }
    }
  },
  notes: {
    title: "Eli’s Notes",
    points: [
      "Start with <span class=\"font-semibold text-white\">Together AI</span> or <span class=\"font-semibold text-white\">Cloudflare</span> if you need volume.",
      "Use <span class=\"font-semibold text-white\">Pollinations</span> or <span class=\"font-semibold text-white\">OpenRouter</span> for instant prototyping.",
      "Don’t sleep on <span class=\"font-semibold text-white\">Cerebras</span> — fastest response of the bunch.",
      "For DeepSeek: <span class=\"font-semibold text-white\">Together AI</span> gives the best experience. <span class=\"font-semibold text-white\">OpenRouter</span> is a good backup."
    ]
  }
};


export interface AITaggerContent {
  title: string;
  description: string;
}

export const aiTaggerContent: AITaggerContent = {
  title: 'AI Tagger',
  description: 'Functionality for the AI Tagger will be implemented here.',
};
