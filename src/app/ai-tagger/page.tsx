import { aiTaggerContent } from '@/lib/content-structure';

export default function AITaggerPage() {
  const content = aiTaggerContent;
  return (
    <div className="text-center">
      <h1
        className="font-headline text-5xl font-bold tracking-tight text-white sm:text-7xl"
        data-cms-id="aiTagger.title"
      >
        {content.title}
      </h1>
      <p
        className="mt-4 max-w-2xl mx-auto text-lg text-gray-300"
        data-cms-id="aiTagger.description"
      >
        {content.description}
      </p>
    </div>
  );
}
