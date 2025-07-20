'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Lightbulb, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const apiData = [
  {
    title: "Clarifai AI",
    url: "https://clarifai.com/",
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
    steps: [
        "Login: Cloudflare account.",
        "Find API Key: Dashboard -> Profile -> API Tokens -> Create new token (use 'Workers AI' template).",
        "Copy Account ID + API Token.",
        "Run cURL: Use their pre-formatted sample in ReqBin.",
    ],
    notes: "10,000 req/day. Supports model deployment at edge locations."
  },
  {
    title: "GPT4All (Telegram-based)",
    url: "https://gpt4all.io",
    steps: [
        "Setup: Join their Telegram bot -> Generate Token -> View usage stats.",
        "Use Key: Insert into curl command for testing models like GPT4-mini.",
    ],
    notes: "Good mobile option. Lightweight image + chat generation."
  },
  {
    title: "OpenRouter",
    url: "https://openrouter.ai",
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
    steps: [
        "Dashboard -> See API Key (auto-created).",
        "Playground -> Test models like DeepSeek R1, Metal LLaMA, Flux.1, Exeoni."
    ],
    notes: "Unlimited usage. Best for long-term deployment or multi-model switching. Strong support for DeepSeek."
  },
  {
    title: "GitHub Models",
    url: "https://github.com/",
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
    steps: [
        "Access: No signup or key needed.",
        "Use: Just enter prompt in the URL or UI.",
        "Models: GPT-4 MiniT, TTS audio, image gen.",
    ],
    notes: "Pure anonymous access. No logging. Great for stealth testing."
  }
];

const ApiCard = ({ api }: { api: any }) => (
  <Card className="bg-card/50 backdrop-blur-sm border-white/10 h-full flex flex-col">
    <CardHeader>
      <div className="flex justify-between items-start">
        <CardTitle className="font-headline text-3xl tracking-wide">{api.title}</CardTitle>
        <Button variant="ghost" size="icon" asChild>
          <Link href={api.url} target="_blank">
            <ExternalLink className="h-5 w-5 text-accent" />
          </Link>
        </Button>
      </div>
    </CardHeader>
    <CardContent className="flex-grow flex flex-col">
      <div className="space-y-2">
        <h4 className="font-semibold text-lg text-primary">Access Steps:</h4>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          {api.steps.map((step: string, index: number) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
        {api.quotas && (
          <>
            <h4 className="font-semibold text-lg text-primary pt-2">Daily Quotas:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {api.quotas.map((quota: string, index: number) => (
                <li key={index}>{quota}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="mt-auto pt-4">
        <Badge variant="secondary" className="whitespace-normal text-left py-2 px-3">
          <Lightbulb className="h-4 w-4 mr-2 shrink-0"/>
          {api.notes}
        </Badge>
      </div>
    </CardContent>
  </Card>
);

export default function FreeApisPage() {
  return (
    <div className="space-y-12">
      <div className="text-center pt-16 pb-8">
        <h1 
          className="font-headline text-5xl font-bold tracking-tight sm:text-7xl"
          style={{
            textShadow: '0 0 5px hsl(var(--accent)), 0 0 10px hsl(var(--accent)), 0 0 15px hsl(var(--accent))',
          }}
          >
          Free API Access Guide
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-300">
          A step-by-step guide to claiming free AI keys from top platforms, verified and updated based on the latest info.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {apiData.map(api => (
          <ApiCard key={api.title} api={api} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-3xl tracking-wide">
                    <CheckCircle className="h-8 w-8 text-primary"/>
                    DeepSeek Access
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground">DeepSeek shows up on <span className="font-bold text-primary">multiple platforms</span>. Here's the best way to get it:</p>
                <div className="p-4 rounded-md border border-secondary bg-black/20">
                    <h4 className="font-bold text-xl text-white">Together AI</h4>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Offers <span className="font-semibold">DeepSeek R1</span> and other variants.</li>
                        <li><span className="font-semibold text-green-400">Unlimited free access</span> on this platform.</li>
                        <li>Works well for: chat, code generation, and vision tasks.</li>
                    </ul>
                    <Button size="sm" asChild className="mt-4">
                        <Link href="https://platform.together.xyz" target="_blank">Go to Together AI <ExternalLink /></Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-accent/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-3xl tracking-wide">
                    <Lightbulb className="h-8 w-8 text-accent"/>
                    Eli’s Notes
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-lg">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Start with <span className="font-semibold text-white">Together AI</span> or <span className="font-semibold text-white">Cloudflare</span> if you need volume.</li>
                    <li>Use <span className="font-semibold text-white">Pollinations</span> or <span className="font-semibold text-white">OpenRouter</span> for instant prototyping.</li>
                    <li>Don’t sleep on <span className="font-semibold text-white">Cerebras</span> — fastest response of the bunch.</li>
                    <li>For DeepSeek: <span className="font-semibold text-white">Together AI</span> gives the best experience. <span className="font-semibold text-white">OpenRouter</span> is a good backup.</li>
                </ul>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
