
'use client';

import { useContent } from '@/context/content-context';

export default function AITaggerPage() {
  const { content } = useContent();
  const pageContent = content.aiTaggerContent;

  return (
    <div className="text-center">
      <h1
        className="font-headline text-5xl font-bold tracking-tight text-white sm:text-7xl"
        data-cms-id="aiTaggerContent.title"
      >
        {pageContent.title}
      </h1>
      <p
        className="mt-4 max-w-2xl mx-auto text-lg text-gray-300"
        data-cms-id="aiTaggerContent.description"
      >
        {pageContent.description}
      </p>
    </div>
  );
}
