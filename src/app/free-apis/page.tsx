
import { generateWorkflowImage } from '@/ai/flows/generate-workflow-image';
import { FreeApisClient, type ApiData } from './free-apis-client';

const initialApiData: Omit<ApiData, 'imageUrl'>[] = [
  {
    title: "Clarifai AI",
    url: "https://clarifai.com/",
    imageHint: "Clarifai logo",
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
    imageHint: "Google AI logo",
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
    imageHint: "Cerebras logo",
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
    imageHint: "Mistral AI logo",
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
    imageHint: "Cloudflare logo",
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
    imageHint: "GPT4All logo",
    steps: [
        "Setup: Join their Telegram bot -> Generate Token -> View usage stats.",
        "Use Key: Insert into curl command for testing models like GPT4-mini.",
    ],
    notes: "Good mobile option. Lightweight image + chat generation."
  },
  {
    title: "OpenRouter",
    url: "https://openrouter.ai",
    imageHint: "OpenRouter logo",
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
    imageHint: "Together AI logo",
    steps: [
        "Dashboard -> See API Key (auto-created).",
        "Playground -> Test models like DeepSeek R1, Metal LLaMA, Flux.1, Exeoni."
    ],
    notes: "Unlimited usage. Best for long-term deployment or multi-model switching. Strong support for DeepSeek."
  },
  {
    title: "GitHub Models",
    url: "https://github.com/",
    imageHint: "GitHub logo",
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
    imageHint: "Pollinations AI logo",
    steps: [
        "Access: No signup or key needed.",
        "Use: Just enter prompt in the URL or UI.",
        "Models: GPT-4 MiniT, TTS audio, image gen.",
    ],
    notes: "Pure anonymous access. No logging. Great for stealth testing."
  }
];

export default async function FreeApisPage() {
  const apiDataWithImages = await Promise.all(
    initialApiData.map(async (api) => {
      const imageUrl = await generateWorkflowImage({
        name: api.title,
        category: 'API',
        complexity: 'Beginner', 
      });
      return {
        ...api,
        imageUrl,
      };
    })
  );

  return <FreeApisClient apiData={apiDataWithImages} />;
}
